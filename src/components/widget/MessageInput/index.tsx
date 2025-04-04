import {
  Alert,
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/react'
import React, { FormEvent, useContext, useState } from 'react'
import { FaPaperclip, FaSmile } from 'react-icons/fa'
import Connecting from './Connecting'
import { ChatContext } from '../context'
import Feedback from './Feedback'

export default function MessageInput() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { connectionStatus, ticket, sendMessage } = useContext(ChatContext)

  const onSendMessage = async (e: FormEvent) => {
    if (loading) return
    setLoading(true)

    try {
      e.preventDefault()
      setMessage('')

      await sendMessage(message)
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  if (ticket?.status === 'resolved') {
    return (
      <Box
        px={3}
        pb={4}
        data-state="open"
        _open={{
          animationName: 'fade-in',
          animationDuration: '300ms',
          animationFillMode: 'forwards',
        }}
      >
        <Feedback />
      </Box>
    )
  } else if (connectionStatus === 'error') {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Something went wrong</Alert.Title>
          <Alert.Description>
            The connection is poor with Chatwoot.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <Box as="form" px={3} pb={4} onSubmit={onSendMessage}>
      <Connecting open={connectionStatus == 'connecting' ? 'open' : 'closed'} />
      <Stack pt={1} pb={3} gap={0} bgColor="gray.100" rounded="lg">
        <Input
          value={message}
          border="none"
          focusRing="none"
          fontWeight={500}
          placeholder="Type message"
          onChange={(e) => setMessage(e.target.value)}
        />

        <HStack justify="space-between" px={3}>
          <HStack>
            <IconButton
              h="auto"
              minW="auto"
              px={0}
              variant="subtle"
              rounded="full"
              color="gray.400"
            >
              <FaSmile />
            </IconButton>
            <IconButton
              h="auto"
              minW="auto"
              px={0}
              variant="subtle"
              rounded="full"
              color="gray.400"
            >
              <FaPaperclip />
            </IconButton>
          </HStack>
          <Button
            type="submit"
            rounded="md"
            loading={loading}
            disabled={!message}
          >
            Send
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}
