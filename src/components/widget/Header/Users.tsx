import React, { useContext } from 'react'
import { Avatar, AvatarGroup } from '@chakra-ui/react'
import { ChatContext } from '../context'
import { LuBot } from 'react-icons/lu'

export default function Users() {
  const { agent } = useContext(ChatContext)

  return (
    <AvatarGroup gap="0" spaceX="-3" size="xs">
      <Avatar.Root colorPalette={agent ? 'orange' : 'purple'}>
        <Avatar.Fallback name={agent?.name}>
          {!agent && <LuBot size="18px" />}
        </Avatar.Fallback>
        <Avatar.Image />
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback />
        <Avatar.Image />
      </Avatar.Root>
    </AvatarGroup>
  )
}
