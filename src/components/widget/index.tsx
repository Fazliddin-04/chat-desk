'use client'

import { Stack, VStack } from '@chakra-ui/react'
import Header from './Header'
import MessageList from './MessageList/index'
import MessageInput from './MessageInput/index'

const Widget = () => {
  // const [quotedMessage, setQuotedMessage] = useState()
  return (
    <VStack>
      <Stack
        w="420px"
        height="600px"
        bg="white"
        rounded="md"
        gap={0}
        position="relative"
      >
        <Header />
        <MessageList />
        <MessageInput />
      </Stack>
    </VStack>
  )
}

export default Widget
