'use client'

import { createContext } from 'react'
import { IMessage, IUser } from '@/types'
import { useChatwoot } from '@/hooks/useChatwoot'

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
  sendMessage: (content: string) => void
}

export const ChatContext = createContext<IContext>({
  ticket: { title: '', description: '', status: 'open' },
  agent: null,
  customer: null,
  messages: [],
  connectionStatus: 'disconnected',
  sendMessage: () => {},
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
  } = useChatwoot({ user, inboxIdentifier })
  // useAgent(state, dispatch)

  return (
    <ChatContext.Provider
      value={{
        ticket: { title: '', description: '', status: ticketStatus },
        agent,
        customer,
        messages,
        connectionStatus,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
