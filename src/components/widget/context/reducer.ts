import { IChat } from '@/types'

export default function ChatReducer(
  state: IChat,
  {
    type,
    payload,
  }: {
    type: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any
  }
) {
  switch (type) {
    case 'update_status': {
      return { ...state, status: payload }
    }
    case 'send_message': {
      const messages = state.messages
      messages.push(payload)
      return { ...state, messages }
    }
    case 'set_agent': {
      return { ...state, agent: payload }
    }
    case 'set_ticket': {
      return {
        ...state,
        title: payload.title,
        description: payload.description,
      }
    }

    default:
      return state
  }
}
