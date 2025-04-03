import { createContext, useReducer } from 'react'
import ChatReducer from './reducer'
import { IChat } from '@/types'
import useAgent from './useAgent'

export const ChatContext = createContext<{
  state: IChat
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (action: { type: string; payload: any }) => void
}>({
  state: {
    title: '',
    description: '',
    status: 'new',
    messages: [],
    agent: null,
    customer: null,
  },
  dispatch: () => {},
})

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const initialData: IChat = {
    title: '',
    description: '',
    status: 'new',
    messages: [],
    agent: null,
    customer: { name: 'Saidakbar' },
  }

  const [state, dispatch] = useReducer(ChatReducer, initialData)

  useAgent(state, dispatch)

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
