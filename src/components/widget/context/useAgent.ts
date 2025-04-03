import { IChat } from '@/types'
import { useEffect } from 'react'

export default function useAgent(
  state: IChat,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (action: { type: string; payload: any }) => void
) {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    const handleAgentConnection = async () => {
      if (state?.messages?.length === 2) {
        await delay(1000)
        dispatch({
          type: 'send_message',
          payload: {
            text: 'Got you! Please, wait for connecting with agent at kirridesk.',
            user: { name: 'Hazell', isBot: true },
          },
        })

        await delay(1000)
        dispatch({ type: 'update_status', payload: 'open' })

        await delay(2000)
        dispatch({
          type: 'set_agent',
          payload: { name: 'John Doe', isAgent: true },
        })
        dispatch({
          type: 'send_message',
          payload: {
            text: '',
            user: { name: 'John Doe', isAgent: true },
            hasAgentConnected: true,
          },
        })
        dispatch({
          type: 'set_ticket',
          payload: {
            title: '#TC-192',
            description: 'Help, I order wrong product',
          },
        })

        await delay(2000)
        dispatch({
          type: 'send_message',
          payload: {
            text: `Hi ${
              state?.customer?.name || 'User'
            }! Can I help you with your problem?`,
            user: { name: 'John Doe', isAgent: true },
          },
        })
      }
    }

    handleAgentConnection()
  }, [state?.messages?.length, dispatch])
}
