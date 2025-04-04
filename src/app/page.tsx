// import styles from './page.module.css'
import ChatWidget from '@/components/widget'
import ChatProvider from '@/components/widget/context'
import { Center } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChatProvider>
      <Center minH="svh" bg="gray.200">
        <ChatWidget />
      </Center>
    </ChatProvider>
    // {/* <Box width="400px" height="640px">
    //   <iframe src="https://app.chatwoot.com/widget?website_token=faQ2BAQ7PDno3oAULHe4VsEk" width='100%' height={'100%'}></iframe>
    // </Box> */}
  )
}
