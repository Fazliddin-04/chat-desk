import React, { useContext } from 'react'
import { Avatar, AvatarGroup } from '@chakra-ui/react'
import { ChatContext } from '../context'
import { LuBot } from 'react-icons/lu'

export default function Users() {
  const { state } = useContext(ChatContext)

  return (
    <AvatarGroup gap="0" spaceX="-3" size="xs">
      <Avatar.Root colorPalette={state?.agent?.isAgent ? 'orange' : 'purple'}>
        <Avatar.Fallback name={state?.agent?.name}>
          {!state?.agent && <LuBot size="18px" />}
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
