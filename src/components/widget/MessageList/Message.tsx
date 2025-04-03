import { IMessage } from '@/types'
import {
  Avatar,
  Box,
  Button,
  HStack,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { LuBot } from 'react-icons/lu'

export default function Message({
  data,
  onActionClick,
}: {
  data: IMessage
  onActionClick: (e: { text: string }) => void
}) {
  if (data.text) {
    return (
      <Stack
        direction={
          data?.user?.isBot || data?.user?.isAgent ? 'row' : 'row-reverse'
        }
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
            data?.user?.isBot
              ? 'purple'
              : data?.user?.isAgent
              ? 'orange'
              : 'gray'
          }
        >
          <Avatar.Fallback name={data?.user?.name}>
            {data?.user?.isBot && <LuBot size="18px" />}
          </Avatar.Fallback>
          <Avatar.Image />
        </Avatar.Root>
        <Stack maxW="230px" gap={1.5}>
          <Box
            p="3"
            bg={
              data?.user?.isBot || data?.user?.isAgent
                ? 'gray.100'
                : 'green.100'
            }
            rounded="lg"
          >
            <Text fontSize="xs" fontWeight={600} lineHeight={1.4}>
              {data.text}
            </Text>
          </Box>
          {data?.actions?.length && (
            <Stack p="3" bg="gray.100" rounded="lg">
              {data?.actions?.map((item) => (
                <Button
                  key={item?.text}
                  bgColor="white"
                  variant="outline"
                  onClick={() => onActionClick(item)}
                >
                  {item?.text}
                </Button>
              ))}
            </Stack>
          )}
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
              <Avatar.Fallback name={data?.user?.name} />
              <Avatar.Image />
            </Avatar.Root>
            <span>{data?.user?.name}</span>
          </HStack>
        </HStack>
        <Separator flex="1" />
      </HStack>
    )
  }

  return null
}
