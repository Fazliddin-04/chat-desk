import { Box } from '@chakra-ui/react'
import React from 'react'

export default function Pattern() {
  return (
    <>
      <Box
        bgImage="radial-gradient(circle, {colors.gray.400} 25%, #fff 28%)"
        position="absolute"
        backgroundSize="10px 10px"
        top={0}
        right={0}
        width="120px"
        height="60px"
        zIndex={-2}
      />
      <Box
        bgGradient="to-r"
        gradientFrom="white"
        gradientTo="transparent"
        position="absolute"
        top={0}
        right={0}
        width="120px"
        height="60px"
        zIndex={-1}
      />
    </>
  )
}
