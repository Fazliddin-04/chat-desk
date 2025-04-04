'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client'
import { IMessage, IUser } from '../types'

interface ChatwootConfig {
  user?: IUser
  inboxIdentifier?: string
  apiUrl?: string
  websocketUrl?: string
  cookieExpiryDays?: number
}

interface ChatwootRef {
  inboxIdentifier: string
  chatwootAPIUrl: string
  contactIdentifier: string | null
  contactPubsubToken: string | null
  contactConversation: string | null
}

interface ChatwootResponse {
  pubsub_token?: string
  source_id?: string
  name: string
  phone_number: string
  id?: string
}

interface ITicket {
  uuid?: string
  status: TicketStatus
}

type ConnectionStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error'
  | 'unsupported'

type TicketStatus = 'open' | 'resolved' | 'pending'

export const useChatwoot = (config: ChatwootConfig = {}) => {
  const {
    user = {
      name: 'Saidakbar',
      phone_number: '+998902660011',
      identifier: 'user_124',
    },
    inboxIdentifier = 'YmvFTNLN4oy2z7hbuUYcsAae',
    apiUrl = 'https://app.chatwoot.com/public/api/v1/',
    websocketUrl = 'ws://app.chatwoot.com/cable',
    cookieExpiryDays = 7,
  } = config

  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('disconnected')
  const [messages, setMessages] = useState<IMessage[]>([])
  const [agent, setAgent] = useState<IUser | null>(null)
  const [customer, setCustomer] = useState<IUser | null>(null)
  const [ticket, setTicket] = useState<ITicket>({
    status: 'open',
  })

  const hasAgentRef = useRef(false)
  const socketRef = useRef<WebSocket | null>(null)
  const chatwootRef = useRef<ChatwootRef>({
    inboxIdentifier,
    chatwootAPIUrl: apiUrl,
    contactIdentifier: null,
    contactPubsubToken: null,
    contactConversation: null,
  })

  // Handle WebSocket messages
  const handleWebSocketMessage = useCallback(
    (event: MessageEvent): void => {
      try {
        const json = JSON.parse(event.data)

        if (
          json.type === 'welcome' ||
          json.type === 'ping' ||
          json.type === 'confirm_subscription'
        ) {
          // Ignore these message types
          return
        } else if (json.message?.event === 'message.created') {
          console.log('Message received:', json)

          if (!hasAgentRef.current) {
            const isAgent = json.message?.data?.meta?.sender?.type === 'user'
            if (isAgent) {
              console.log('Agent connected:', json.message?.data?.meta?.sender)
              // Update agent state using the current data, not dependent on previous state
              setAgent(json.message?.data?.meta?.sender)

              hasAgentRef.current = true // Mark that we've set an agent
            }
          }
          if (json.message.data.content) {
            setMessages((prevMessages) => [...prevMessages, json.message.data])
          }
        } else if (json.message?.event === 'conversation.updated') {
          if (!hasAgentRef.current) {
            const isAgent = json.message?.data?.meta?.sender?.type === 'user'
            if (isAgent) {
              console.log('Agent connected:', json.message?.data?.meta?.sender)
              setAgent(json.message?.data?.meta?.sender)

              hasAgentRef.current = true // Mark that we've set an agent
            }
          }
        } else if (json.message?.event === 'conversation.typing_on') {
          if (!hasAgentRef.current) {
            const isAgent = json.message?.data?.performer?.type === 'user'
            if (isAgent) {
              console.log('Agent connected:', json.message?.data?.performer)
              setAgent(json.message?.data?.performer)

              hasAgentRef.current = true // Mark that we've set an agent
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  id: 999,
                  hasAgentConnected: true,
                  content: '',
                  sender: json.message?.data?.performer,
                },
              ])
            }
          }
        } else {
          console.log('Unhandled message type:', json)
        }
      } catch (error) {
        console.error('Invalid JSON:', event.data, error)
      }
    },
    [] // Remove agent from the dependency array
  )

  // Connect to WebSocket
  useEffect(() => {
    // Check browser support for WebSocket
    if (typeof window !== 'undefined' && !window.WebSocket) {
      setConnectionStatus('unsupported')
      console.error("Browser doesn't support WebSockets")
      return
    }

    // Initialize connection
    const connectWebSocket = async (): Promise<void> => {
      try {
        setConnectionStatus('connecting')
        await setupContact()
        await setupConversation()

        socketRef.current = new WebSocket(websocketUrl)

        socketRef.current.onopen = () => {
          setConnectionStatus('connected')
          // Subscribe to chatwoot webhooks
          if (socketRef.current && chatwootRef.current.contactPubsubToken) {
            socketRef.current.send(
              JSON.stringify({
                command: 'subscribe',
                identifier: `{"channel":"RoomChannel","pubsub_token":"${chatwootRef.current.contactPubsubToken}"}`,
              })
            )
          }
        }

        socketRef.current.onerror = (error) => {
          console.error('WebSocket error:', error)
          setConnectionStatus('error')
        }

        socketRef.current.onmessage = handleWebSocketMessage

        socketRef.current.onclose = () => {
          setConnectionStatus('disconnected')
        }
      } catch (error) {
        console.error('Failed to connect:', error)
        setConnectionStatus('error')
      }
    }

    connectWebSocket()

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [apiUrl, inboxIdentifier, websocketUrl])

  // Setup health check interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (socketRef.current && socketRef.current.readyState !== 1) {
        setConnectionStatus('error')
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Setup contact
  const setupContact = async (): Promise<void> => {
    const savedIdentifier = getCookie('contactIdentifier')
    const savedToken = getCookie('contactPubsubToken')

    if (savedIdentifier && savedToken) {
      chatwootRef.current.contactIdentifier = savedIdentifier
      chatwootRef.current.contactPubsubToken = savedToken
    } else {
      try {
        const response = await axios.post<
          IUser & { pubsub_token: string; source_id: string }
        >(
          `${chatwootRef.current.chatwootAPIUrl}inboxes/${chatwootRef.current.inboxIdentifier}/contacts`,
          user
        )

        const { pubsub_token, source_id } = response.data
        setCustomer(response.data)

        if (pubsub_token && source_id) {
          chatwootRef.current.contactIdentifier = source_id
          chatwootRef.current.contactPubsubToken = pubsub_token

          const date = new Date()
          date.setDate(date.getDate() + cookieExpiryDays)

          setCookie('contactIdentifier', source_id, {
            expires: date,
          })
          setCookie('contactPubsubToken', pubsub_token, {
            expires: date,
          })
        } else {
          throw new Error('Missing required data in response')
        }
      } catch (error) {
        console.error('Failed to set up contact:', error)
        throw error
      }
    }
  }

  // Setup conversation
  const setupConversation = async (): Promise<void> => {
    const savedConversation = getCookie('contactConversation')

    if (savedConversation) {
      chatwootRef.current.contactConversation = savedConversation

      try {
        const response = await axios.get(
          `${chatwootRef.current.chatwootAPIUrl}inboxes/${chatwootRef.current.inboxIdentifier}/contacts/${chatwootRef.current.contactIdentifier}/conversations/${savedConversation}`
        )

        setTicket({ uuid: response.data?.uuid, status: response.data?.status })
        setMessages(response.data?.messages)

        const agentMsg = response.data?.messages?.find(
          (item: IMessage) => item?.sender?.type === 'user'
        )
        const contactMsg = response.data?.messages?.find(
          (item: IMessage) => item?.sender?.type === 'contact'
        )
        if (agentMsg.sender) {
          setAgent(agentMsg.sender)
          hasAgentRef.current = true // Mark that we've set an agent
        }
        if (contactMsg.sender) setCustomer(contactMsg.sender)
      } catch (error) {
        console.error('Failed to set up conversation:', error)
        throw error
      }
    } else {
      try {
        if (!chatwootRef.current.contactIdentifier) {
          throw new Error('Contact identifier not set')
        }

        const response = await axios.post<ChatwootResponse>(
          `${chatwootRef.current.chatwootAPIUrl}inboxes/${chatwootRef.current.inboxIdentifier}/contacts/${chatwootRef.current.contactIdentifier}/conversations`
        )

        const conversationId = response.data.id

        if (conversationId) {
          const date = new Date()
          date.setDate(date.getDate() + cookieExpiryDays)

          chatwootRef.current.contactConversation = conversationId
          setCookie('contactConversation', conversationId, {
            expires: date,
          })
        } else {
          throw new Error('Missing conversation ID in response')
        }
      } catch (error) {
        console.error('Failed to set up conversation:', error)
        throw error
      }
    }
  }

  // Send message
  const sendMessage = async (content: string): Promise<boolean> => {
    if (!content || connectionStatus !== 'connected') {
      return false
    }

    try {
      if (
        !chatwootRef.current.contactIdentifier ||
        !chatwootRef.current.contactConversation
      ) {
        throw new Error('Contact or conversation not initialized')
      }

      await axios.post(
        `${chatwootRef.current.chatwootAPIUrl}inboxes/${chatwootRef.current.inboxIdentifier}/contacts/${chatwootRef.current.contactIdentifier}/conversations/${chatwootRef.current.contactConversation}/messages`,
        { content },
        { headers: { 'Content-Type': 'application/json' } }
      )

      return true
    } catch (error) {
      console.error('Failed to send message:', error)
      return false
    }
  }

  const sendCSAT = async (
    rating: number,
    message: string
  ): Promise<boolean> => {
    if (!rating || connectionStatus !== 'connected') {
      return false
    }

    try {
      if (!chatwootRef.current.contactConversation || !ticket.uuid) {
        throw new Error('Conversation not initialized or completed')
      }

      await axios.put(
        `${chatwootRef.current.chatwootAPIUrl}csat_survey/${ticket.uuid}`,
        {
          message: {
            submitted_values: {
              csat_survey_response: {
                rating,
                feedback_message: message,
              },
            },
          },
        },
        { headers: { 'Content-Type': 'application/json' } }
      )

      return true
    } catch (error) {
      console.error('Failed to send message:', error)
      return false
    }
  }

  // Reset cookies and state
  const resetChat = (): void => {
    deleteCookie('contactIdentifier')
    deleteCookie('contactPubsubToken')
    deleteCookie('contactConversation')

    if (socketRef.current) {
      socketRef.current.close()
    }

    setMessages([])
    setConnectionStatus('disconnected')

    // Reinitialize the connection
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return {
    agent,
    customer,
    connectionStatus,
    ticketStatus: ticket.status,
    messages,
    sendMessage,
    resetChat,
    sendCSAT,
  }
}
