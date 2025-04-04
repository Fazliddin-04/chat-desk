import { IMessage } from '../../../types'
import { Avatar, Box, HStack, Separator, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { LuBot } from 'react-icons/lu'

export default function Message({
  data,
}: // onActionClick,
{
  data: IMessage
  onActionClick: (e: string) => void
}) {
  if (data.content) {
    return (
      <Stack
        direction={data?.message_type === 0 ? 'row-reverse' : 'row'}
        mt={1}
        data-state="open"
        _open={{
          animationName: 'fade-in, slide-from-bottom',
          animationDuration: '300ms',
        }}
      >
        <Avatar.Root
          size="xs"
          colorPalette={
            data?.sender?.type === 'contact'
              ? 'gray'
              : data?.sender?.type === 'user'
              ? 'orange'
              : 'purple'
          }
        >
          <Avatar.Fallback name={data?.sender?.name}>
            {!data?.sender?.name && <LuBot size="18px" />}
          </Avatar.Fallback>
          <Avatar.Image />
        </Avatar.Root>
        <Stack maxW="230px" gap={1.5}>
          <Box
            p="3"
            bg={data?.sender?.type === 'contact' ? 'green.100' : 'gray.100'}
            rounded="lg"
          >
            <Text fontSize="xs" fontWeight={600} lineHeight={1.4}>
              {data.content}
            </Text>
          </Box>
        </Stack>
      </Stack>
    )
  } else if (data.hasAgentConnected) {
    return (
      <HStack
        my={2}
        data-state="open"
        _open={{
          animationName: 'fade-in, slide-from-bottom',
          animationDuration: '300ms',
        }}
      >
        <Separator flex="1" />
        <HStack flexShrink="0" fontSize="xs" fontWeight={600}>
          <Text as="span" color="gray.400">
            Connected with:
          </Text>{' '}
          <HStack>
            <Avatar.Root size="2xs" colorPalette="orange">
              <Avatar.Fallback name={data?.sender?.name} />
              <Avatar.Image />
            </Avatar.Root>
            <span>{data?.sender?.name}</span>
          </HStack>
        </HStack>
        <Separator flex="1" />
      </HStack>
    )
  }

  return null
}
