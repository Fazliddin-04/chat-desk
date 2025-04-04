import {
  Avatar,
  Box,
  Button,
  DataList,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { FormEvent, useContext, useState } from 'react'
import { FaPaperclip, FaSmile } from 'react-icons/fa'
import Connecting from './Connecting'
import { ChatContext } from '../context'
import Feedback from './Feedback'
import { MdTimer } from 'react-icons/md'

export default function MessageInput() {
  const [message, setMessage] = useState('')
  const { agent, messages, ticket, sendMessage } = useContext(ChatContext)

  const onSendMessage = async (e: FormEvent) => {
    e.preventDefault()

    setMessage('')
    sendMessage(message)
  }

  const sendFeedback = async (e: FormEvent) => {
    e.preventDefault()

    setMessage('')
  }

  if (ticket?.status === 'resolved') {
    return (
      <Box
        as="form"
        px={3}
        pb={4}
        onSubmit={sendFeedback}
        data-state="open"
        _open={{
          animationName: 'fade-in',
          animationDuration: '300ms',
          animationFillMode: 'forwards',
        }}
      >
        <Stack border="1px solid" borderColor="border" p={3} rounded="md">
          <Text fontWeight={500} color="gray.600">
            Summary talk with agent
          </Text>
          <DataList.Root fontWeight={500} flexDir="row" gap={16}>
            {agent && (
              <DataList.Item>
                <DataList.ItemLabel color="gray.500">
                  Chat with
                </DataList.ItemLabel>
                <DataList.ItemValue>
                  <HStack>
                    <Avatar.Root size="2xs" colorPalette="orange">
                      <Avatar.Fallback name={agent?.name} />
                      <Avatar.Image />
                    </Avatar.Root>
                    <span>{agent?.name}</span>
                  </HStack>
                </DataList.ItemValue>
              </DataList.Item>
            )}
            <DataList.Item>
              <DataList.ItemLabel color="gray.500">
                Chat duration
              </DataList.ItemLabel>
              <DataList.ItemValue>
                <HStack>
                  <Avatar.Root size="2xs">
                    <Avatar.Fallback>
                      <MdTimer size="14px" color="#555" />
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <span>12 mins 43 sec</span>
                </HStack>
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </Stack>
        <Feedback />
      </Box>
    )
  }
  return (
    <Box as="form" px={3} pb={4} onSubmit={onSendMessage}>
      {messages?.length > 1 && (
        <Connecting
          open={
            ticket?.status === 'open' && !agent ? 'open' : agent ? 'closed' : ''
          }
        />
      )}
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
          <Button type="submit">Send</Button>
        </HStack>
      </Stack>
    </Box>
  )
}
