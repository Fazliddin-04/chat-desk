import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { LuMessageSquareQuote, LuX } from 'react-icons/lu'

export default function ChatToggle({
  open,
  style,
  onClick,
}: {
  open: boolean
  style: React.CSSProperties
  onClick: () => void
}) {
  return (
    <IconButton
      rounded="md"
      position="fixed"
      bottom={5}
      zIndex={100}
      //   rotate={(open ? 0 : 90) + 'deg'}
      //   transition="300ms ease-in-out"
      aria-label="Toggle chat"
      onClick={onClick}
      _active={{
        opacity: 0.5,
      }}
      style={style}
      transition="500ms ease-in-out"
    >
      {open ? <LuX /> : <LuMessageSquareQuote />}
    </IconButton>
  )
}
