import { onAuthStateChanged, getAuth, User } from 'firebase/auth'
import {
  onSnapshot,
  query,
  collection,
  getFirestore,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { Box, Layout } from '../components'
import { Record } from '../libraries'

type HistoryCardProperties = {
  createdAt: Date,
  amount: number
}

const HistoryCard: React.VFC<HistoryCardProperties> = ({ createdAt, amount }) => (
  <Box tw="w-full px-8 py-2 rounded-4xl bg-primary">
    <span tw="text-lg">{createdAt.getFullYear()}年{createdAt.getMonth() + 1}月{createdAt.getDate()}日</span>
    <div tw="relative flex items-center">
      <span tw="w-full mr-10 text-4xl text-right">{amount}</span>
      <span tw="absolute bottom-0 right-0 text-2xl">円</span>
    </div>
  </Box>
)

// eslint-disable-next-line max-lines-per-function
export const HistoryPage: React.FC = () => {
  // eslint-disable-next-line unicorn/no-null
  const [user, setUser] = useState<User>(null as unknown as User)
  const [totalAmount, setTotalAmount] = useState(0)
  const [recordDocuments, setRecordDocuments] = useState<QueryDocumentSnapshot<DocumentData>[]>([])

  useEffect(() => {
    onAuthStateChanged(getAuth(), (value) => value && setUser(value))
  }, [])

  useEffect(() => user && onSnapshot(
    query(
      collection(getFirestore(), 'users', `${user.uid}/records`),
      orderBy('createdAt', 'desc')
    ),
    (querySnapshot) => {
      setTotalAmount(0)
      for (const document of querySnapshot.docs) {
        if (document.id !== 'metadata') {
          setRecordDocuments((previous) => {
            previous.push(document)
            return previous
          })
          setTotalAmount((previuous) => previuous + (document.data() as unknown as Record).amount)
        }
      }
    }
  ), [user])

  return (
    <Layout hasNavbar>
      <div tw="w-full flex flex-col items-center text-white">
        <Box tw="w-full mb-12 px-8 pt-8 pb-16 rounded-t-none bg-primary  flex flex-col items-center space-y-8">
          <h1 tw="text-3xl">履歴</h1>
          <h2 tw="text-3xl">これまでの合計</h2>
          <div tw="relative flex items-center">
            <span tw="text-5xl">{totalAmount}</span>
            <span tw="absolute bottom-0 -right-16 text-3xl">円</span>
          </div>
        </Box>
        <div tw="w-full px-8 grid gap-y-6 mb-12">
          {
            recordDocuments.map((recordDocument) => {
              const data = recordDocument.data() as Record
              return (
                <HistoryCard
                  amount={data.amount}
                  createdAt={(data.createdAt as Timestamp).toDate()}
                  key={recordDocument.id}
                />
              )
            })
          }
        </div>
      </div>
    </Layout>
  )
}
