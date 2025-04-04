import React, { FormEvent, useContext, useState } from 'react'
import {
  Button,
  EmptyState,
  Field,
  HStack,
  Icon,
  RadioCard,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { FaRegLaugh, FaRegSadTear, FaRegSmile } from 'react-icons/fa'
import { BsChatLeftHeartFill } from 'react-icons/bs'
import { ChatContext } from '../context'

export default function Feedback() {
  const [cancelled, setCancelled] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<string | null>('')

  const { sendCSAT, resetChat } = useContext(ChatContext)

  const sendFeedback = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)

      const result = await sendCSAT(Number(rating), message)

      if (result) {
        setSent(true)
      }
    } catch (error) {
      console.error('Error sending feedback:', error)
    } finally {
      setLoading(false)
      setMessage('')
    }
  }

  if (cancelled) {
    return (
      <Button rounded="md" w="full" onClick={resetChat}>
        Start new conversation
      </Button>
    )
  } else if (sent) {
    return (
      <>
        <Stack
          border="1px solid"
          borderColor="border"
          rounded="md"
          height="308px"
          p={3}
          mb={3}
        >
          <EmptyState.Root px={3}>
            <EmptyState.Content>
              <EmptyState.Indicator color="green.400">
                <BsChatLeftHeartFill />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title fontSize="xl">
                  Thanks for your feedback!
                </EmptyState.Title>
                <EmptyState.Description>
                  Thanks for contacting us. If you have any complaints or other
                  issues, feel free to contact us again
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        </Stack>
        <Button rounded="md" w="full" onClick={resetChat}>
          Start new conversation
        </Button>
      </>
    )
  }

  return (
    <Stack
      as="form"
      onSubmit={sendFeedback}
      border="1px solid"
      borderColor="border"
      p={3}
      rounded="md"
      height="308px"
    >
      <RadioCard.Root
        value={rating}
        onValueChange={(e) => setRating(e.value)}
        orientation="vertical"
        align="center"
        maxW="400px"
        defaultValue="Good"
        mb={2}
      >
        <RadioCard.Label
          mx="auto"
          fontSize="md"
          mb={2}
          fontWeight={500}
          color="gray.600"
        >
          Thanks for the chat. How do you feel?
        </RadioCard.Label>
        <HStack>
          {items.map((item) => (
            <RadioCard.Item key={item.value} value={item.value}>
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <Icon fontSize="2xl" color="fg.muted">
                  {item.icon}
                </Icon>
                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </HStack>
      </RadioCard.Root>
      <Field.Root>
        <Field.Label>What are the main reasons for your rating?</Field.Label>
        <Textarea
          resize="none"
          fontWeight={500}
          value={message}
          placeholder="Fill the reason you rating"
          onChange={(e) => setMessage(e.target.value)}
        />
      </Field.Root>
      <HStack justify="flex-end" mt={3}>
        <Button
          variant="outline"
          rounded="md"
          onClick={() => setCancelled(true)}
        >
          Cancel
        </Button>
        <Button type="submit" rounded="md" loading={loading} disabled={!rating}>
          Submit
        </Button>
      </HStack>
    </Stack>
  )
}

const items = [
  { value: '1', title: 'Bad', icon: <FaRegSadTear /> },
  { value: '4', title: 'Good', icon: <FaRegSmile /> },
  { value: '5', title: 'Amazing', icon: <FaRegLaugh /> },
]
