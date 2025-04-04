import { Badge, Center, For, Stack } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef } from 'react'
import Message from './Message'
import { ChatContext } from '../context'
import Summary from './Summary'

// const messages: IMessage[] = [
//   {
//     content:
//       "Hey! I'm Hazell Chat Bot! Ask me anytion or share your feedback or select an option below.",
//     actions: [
//       {
//         text: 'Get free training',
//       },
//       { text: 'Get started for free' },
//       { text: 'Chat with the sales team' },
//     ],
//     author: { name: 'Hazell', isBot: true },
//     timestamp: '',
//   },
// ]

export default function MessageList() {
  const { messages, ticket, sendMessage } = useContext(ChatContext)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container?.current) {
      container.current
        .querySelector('#bottom')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages.length, ticket?.status])

  return (
    <Stack px={3} pb={3} flex={1} overflow="auto" ref={container}>
      <For each={messages}>
        {(item, index) => (
          <Message
            key={index}
            data={item}
            onActionClick={(e) => sendMessage(e)}
          />
        )}
      </For>
      <Center id="bottom" my={3}>
        {ticket?.status === 'resolved' && (
          <Badge variant="surface" size="lg" rounded="lg">
            Chat Closed
          </Badge>
        )}
      </Center>
      <Summary />
    </Stack>
  )
}
