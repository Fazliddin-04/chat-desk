'use client'

import { Stack, VStack } from '@chakra-ui/react'
import Header from './Header'
import MessageList from './MessageList/index'
import MessageInput from './MessageInput/index'
import ChatToggle from './Toggle'
import { useMemo, useState } from 'react'

const Widget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'right' | 'left'>('right')

  const style = useMemo(
    () =>
      position == 'right'
        ? { right: 20, transform: `translateX(${isOpen ? 0 : 150}%)` }
        : { left: 20, transform: `translateX(${isOpen ? 0 : -150}%)` },
    [isOpen, position]
  )

  return (
    <VStack>
      <Stack
        transition="500ms ease-in-out"
        transformOrigin="right bottom"
        w="420px"
        height="600px"
        bg="white"
        rounded="md"
        gap={0}
        position="fixed"
        bottom={20}
        style={style}
        overflow="hidden"
      >
        <Header position={position} onChangePosition={(e) => setPosition(e)} />
        <MessageList />
        <MessageInput />
      </Stack>
      <ChatToggle
        open={isOpen}
        style={{ right: style.right, left: style.left }}
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </VStack>
  )
}

export default Widget
