import { Box, Heading, HStack, IconButton, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import Users from './Users'
import { ChatContext } from '../context'
import Pattern from './Pattern'

export default function Header({
  position,
  onChangePosition,
}: {
  position: 'right' | 'left'
  onChangePosition: (e: 'right' | 'left') => void
}) {
  const { ticket } = useContext(ChatContext)

  return (
    <HStack
      justify="space-between"
      px={3}
      py={4}
      position="relative"
      zIndex={1}
    >
      <HStack>
        <IconButton
          aria-label="Back"
          variant="subtle"
          size="sm"
          rotate={(position === 'left' ? 180 : 0) + 'deg'}
          onClick={() =>
            onChangePosition(position === 'right' ? 'left' : 'right')
          }
        >
          <LuArrowLeft />
        </IconButton>
        {ticket?.title ? (
          <Box
            data-open="open"
            _open={{
              animationName: 'fade-in',
              animationDuration: '300ms',
              animationFillMode: 'forwards',
            }}
          >
            <Heading size="md" lineHeight={1.4}>
              {ticket?.title}
            </Heading>
            <Text fontSize="sm" lineHeight={1}>
              {ticket?.description}
            </Text>
          </Box>
        ) : (
          <Heading>Chat Bot</Heading>
        )}
      </HStack>
      <Users />
      <Pattern />
    </HStack>
  )
}
