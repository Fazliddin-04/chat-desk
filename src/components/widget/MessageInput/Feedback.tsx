import React, { useState } from 'react'
import {
  Box,
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

export default function Feedback() {
  const [feedback, setFeedback] = useState({ text: '' })
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <Box
        overflow="hidden"
        animationName="fade-out, collapse-height"
        animationTimingFunction="ease-in-out"
        animationDuration="500ms"
        animationDelay="1000ms"
        animationFillMode="forwards"
      >
        <Stack
          border="1px solid"
          borderColor="border"
          p={3}
          rounded="md"
          height="308px"
          mt={3}
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
      </Box>
    )
  }

  return (
    <Stack
      border="1px solid"
      borderColor="border"
      p={3}
      rounded="md"
      height="308px"
      mt={3}
    >
      <RadioCard.Root
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
          value={feedback.text}
          placeholder="Fill the reason you rating"
          onChange={(e) => setFeedback({ text: e.target.value })}
        />
      </Field.Root>
      <HStack justify="flex-end" mt={3}>
        <Button variant="outline">Cancel</Button>
        <Button type="submit" onClick={() => setSent(true)}>
          Submit
        </Button>
      </HStack>
    </Stack>
  )
}

const items = [
  { value: 'bad', title: 'Bad', icon: <FaRegSadTear /> },
  { value: 'good', title: 'Good', icon: <FaRegSmile /> },
  { value: 'amazing', title: 'Amazing', icon: <FaRegLaugh /> },
]
