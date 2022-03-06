import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import {
  collection,
  doc,
  endAt,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAt
} from 'firebase/firestore'
import React, { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { Box, Layout, ModalPrompt, TextButton, TextInput } from '../components'
import { Record } from '../libraries'

const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> =
  (event) => !(/\d/u).test(event.key) && event.preventDefault()

// eslint-disable-next-line max-lines-per-function
export const RecordPage: React.FC = () => {
  // eslint-disable-next-line unicorn/no-null
  const [user, setUser] = useState<User>(null as unknown as User)
  const [isModalActive, setModalActive] = useState(false)
  const [amount, setAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const handleModalClose: MouseEventHandler = (event) => {
    event.preventDefault()
    setModalActive(false)
  }

  const handleModalSubmit: MouseEventHandler = (event) => {
    event.preventDefault()
    if (Number.isSafeInteger(amount) && amount > 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      setDoc(doc(collection(getFirestore(), 'users', `${user.uid}/records`)), { amount, createdAt: serverTimestamp() })
      setModalActive(false)
      setAmount(0)
    }
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setAmount(Number.parseInt(event.target.value, 10))
  }

  useEffect(() => {
    onAuthStateChanged(getAuth(), (value) => value && setUser(value))
  }, [])

  useEffect(() => {
    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(1)
    endDate.setMonth(endDate.getMonth() + 1)
    endDate.setDate(0)
    return user && onSnapshot(
      query(
        collection(getFirestore(), 'users', `${user.uid}/records`),
        orderBy('createdAt'),
        startAt(startDate),
        endAt(endDate)
      ),
      (querySnapshot) => {
        setTotalAmount(0)
        for (const document of querySnapshot.docs) {
          if (document.id !== 'metadata') {
            setTotalAmount((previuous) => previuous + (document.data() as unknown as Record).amount)
          }
        }
      }
    )
  }, [user])

  return (
    <>
      <Layout hasNavbar>
        <div tw="w-full flex flex-col items-center text-white">
          <Box tw="w-full mb-12 px-8 pt-8 pb-20 rounded-t-none bg-primary flex flex-col items-center space-y-8">
            <h1 tw="text-3xl text-secondary">Gamoney</h1>
            <span tw="w-full text-3xl">{new Date().getFullYear()}年{new Date().getMonth() + 1}月</span>
            <div tw="relative flex items-center">
              <span tw="text-5xl">{totalAmount}</span>
              <span tw="absolute bottom-0 -right-16 text-3xl">円</span>
            </div>
          </Box>
          <TextButton tw="mb-12 bg-primary" onClick={() => setModalActive(true)}>記録する</TextButton>
        </div>
      </Layout>
      <ModalPrompt
        label="金額を入力"
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        active={isModalActive}
      >
        <div tw="flex items-center justify-center space-x-2">
          <TextInput
            as="input"
            value={amount}
            min={0}
            onKeyPress={handleInputKeyDown}
            onChange={handleInputChange}
          />
          <span>円</span>
        </div>
      </ModalPrompt>
    </>
  )
}
