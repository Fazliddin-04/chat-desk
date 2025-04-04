import getFormattedDiff from '../../../utils/formattedDiff'
import { Avatar, DataList, HStack, Stack, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { MdTimer } from 'react-icons/md'
import { ChatContext } from '../context'

export default function Summary() {
  const { messages, ticket, agent } = useContext(ChatContext)

  if (ticket?.status === 'resolved') {
    return (
      <Stack border="1px solid" borderColor="border" p={3} rounded="md">
        <Text fontWeight={500} color="gray.600">
          Summary talk with agent
        </Text>
        <DataList.Root fontWeight={500} flexDir="row" gap={16}>
          {agent && (
            <DataList.Item>
              <DataList.ItemLabel color="gray.500">
                Chat with
              </DataList.ItemLabel>
              <DataList.ItemValue>
                <HStack>
                  <Avatar.Root size="2xs" colorPalette="orange">
                    <Avatar.Fallback name={agent?.name} />
                    <Avatar.Image />
                  </Avatar.Root>
                  <span>{agent?.name}</span>
                </HStack>
              </DataList.ItemValue>
            </DataList.Item>
          )}
          <DataList.Item>
            <DataList.ItemLabel color="gray.500">
              Chat duration
            </DataList.ItemLabel>
            <DataList.ItemValue>
              <HStack>
                <Avatar.Root size="2xs">
                  <Avatar.Fallback>
                    <MdTimer size="14px" color="#555" />
                  </Avatar.Fallback>
                </Avatar.Root>
                <span>
                  {getFormattedDiff(
                    new Date(messages.at(0)?.created_at ?? 0),
                    new Date(messages.at(-1)?.created_at ?? 0)
                  )}
                </span>
              </HStack>
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
      </Stack>
    )
  }
  return null
}
