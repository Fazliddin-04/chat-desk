'use client'

import { createContext } from 'react'
import { IMessage, IUser } from '../../../types'
import { useChatwoot } from '../../../hooks/useChatwoot'
import Widget from '..'

interface IContext {
  ticket: {
    title: string
    description: string
    status: 'open' | 'resolved' | 'pending'
  }
  connectionStatus:
    | 'disconnected'
    | 'connecting'
    | 'connected'
    | 'error'
    | 'unsupported'
  agent: IUser | null
  customer: IUser | null
  messages: IMessage[]
  resetChat: () => void
  sendMessage: (content: string) => Promise<boolean>
  sendCSAT: (rating: number, message: string) => Promise<boolean>
}

export const ChatContext = createContext<IContext>({
  ticket: { title: '', description: '', status: 'open' },
  agent: null,
  customer: null,
  messages: [],
  connectionStatus: 'disconnected',
  sendMessage: () => Promise.resolve(false),
  resetChat: () => {},
  sendCSAT: () => Promise.resolve(false),
})

const ChatProvider = ({
  user,
  inboxIdentifier,
  children,
}: {
  user?: IUser
  inboxIdentifier?: string
  children: React.ReactNode
}) => {
  const {
    agent,
    customer,
    messages,
    connectionStatus,
    ticketStatus,
    sendMessage,
    sendCSAT,
    resetChat,
  } = useChatwoot({ user, inboxIdentifier })

  return (
    <ChatContext.Provider
      value={{
        ticket: { title: '', description: '', status: ticketStatus },
        agent,
        customer,
        messages,
        connectionStatus,
        sendMessage,
        sendCSAT,
        resetChat,
      }}
    >
      {children}
      <Widget />
    </ChatContext.Provider>
  )
}

export default ChatProvider
