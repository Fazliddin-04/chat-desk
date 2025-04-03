import { Badge, Center, For, Stack } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef } from 'react'
import Message from './Message'
import { IMessage } from '@/types'
import { ChatContext } from '../context'

const messages: IMessage[] = [
  {
    text: "Hey! I'm Hazell Chat Bot! Ask me anytion or share your feedback or select an option below.",
    actions: [
      {
        text: 'Get free training',
      },
      { text: 'Get started for free' },
      { text: 'Chat with the sales team' },
    ],
    user: { name: 'Hazell', isBot: true },
  },
]

export default function MessageList() {
  const { state, dispatch } = useContext(ChatContext)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container?.current) {
      container.current
        .querySelector('#bottom')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [state?.messages.length, state?.status])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!state?.messages?.length) {
        dispatch({ type: 'send_message', payload: messages[0] })
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [state?.messages.length, dispatch])

  return (
    <Stack px={3} pb={5} flex={1} overflow="auto" ref={container}>
      <For each={state?.messages}>
        {(item, index) => (
          <Message
            key={index}
            data={item}
            onActionClick={(e) =>
              dispatch({ type: 'send_message', payload: e })
            }
          />
        )}
      </For>
      <Center id="bottom" mt={3}>
        {state?.status === 'closed' && (
          <Badge variant="surface" size="lg" rounded="lg">
            Chat Closed
          </Badge>
        )}
      </Center>
    </Stack>
  )
}
