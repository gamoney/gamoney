import React from 'react'
import tw from 'twin.macro'
import logoUrl from '../assets/logo.svg'
import { Box, Layout, TextButton } from '../components'
import { signIn } from '../libraries'

export const LoginPage: React.FC = () => (
  <Layout tw="w-full h-screen px-8 py-24 bg-primary">
    <Box tw="p-4 bg-white">
      <img src={logoUrl as string} alt="ロゴ" tw="pointer-events-none" />
    </Box>
    <TextButton tw="px-12" onClick={signIn}>ログイン</TextButton>
  </Layout>
)
