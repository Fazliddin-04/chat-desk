import { useContext } from 'react'
import { ChatContext } from '.'

export default function useChat() {
  return useContext(ChatContext)
}
