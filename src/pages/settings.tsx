import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter-preact'
import { Box, Layout, TextButton } from '../components'

export const SettingsPage: React.FC = () => {
  const [, setLocation] = useLocation()
  // eslint-disable-next-line unicorn/no-null
  const [user, setUser] = useState<User>(null as unknown as User)


  useEffect(() => {
    onAuthStateChanged(getAuth(), (value) => value && setUser(value))
  }, [])

  return (
    <>
      <Layout hasNavbar>
        <div tw="w-full flex flex-col items-center text-white">
          <Box tw="w-full mb-12 px-8 pt-8 pb-20 rounded-t-none bg-primary flex flex-col items-center space-y-8">
            <h1 tw="text-3xl">ユーザー設定</h1>
            <div tw="flex items-center justify-center space-x-8">
              <img tw="w-24 h-24 rounded-full bg-gray-500" src={user?.photoURL as string} alt={user?.displayName as string} />
              <span tw="text-2xl">{user?.displayName}</span>
            </div>
          </Box>
          <div tw="w-full grid grid-cols-1 gap-y-6 px-8 mb-12 items-center">
            <TextButton
              tw="w-full py-4 text-2xl bg-primary"
              onClick={async () => signOut(getAuth()).then(() => setLocation('/'))}
            >
              ログアウト
            </TextButton>
          </div>
        </div>
      </Layout>
    </>
  )
}
