import { Button } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ChatContext } from './context'

export default function CloseTicket() {
  const { dispatch } = useContext(ChatContext)
  const onClick = () => {
    dispatch({ type: 'update_status', payload: 'closed' })
  }

  return <Button onClick={onClick}>Close Ticket</Button>
}
