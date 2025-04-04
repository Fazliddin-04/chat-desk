import { Center } from '@chakra-ui/react'
import ChatProvider from '../components/widget/context'

export default function Home() {
  return (
    <ChatProvider>
      <Center minH="svh" bg="gray.200"></Center>
    </ChatProvider>
  )
}
