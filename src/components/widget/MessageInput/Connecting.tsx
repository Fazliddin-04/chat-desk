import { HStack, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

export default function Connecting({ open }: { open: string }) {
  return (
    <HStack
      colorPalette="teal"
      justify="center"
      mb={2}
      opacity={0}
      data-state={open}
      _open={{
        animationName: 'fade-in, slide-from-bottom-full',
        animationDuration: '300ms',
        animationFillMode: 'forwards',
      }}
      _closed={{
        animationName: 'fade-out, slide-to-bottom-full',
        animationDuration: '120ms',
        animationFillMode: 'forwards',
      }}
    >
      <Spinner color="colorPalette.600" borderWidth={3} />
      <Text fontWeight={600} color="gray.600" fontSize="sm">
        Loading chat history
      </Text>
    </HStack>
  )
}
