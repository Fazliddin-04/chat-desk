// import styles from './page.module.css'
import ChatWidget from '@/components/widget'
import { Center } from '@chakra-ui/react'

export default function Home() {
  return (
    <Center minH='svh' bg='gray.200'>
      <ChatWidget />
    </Center>
  )
}
