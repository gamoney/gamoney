import { Icon } from '@iconify/react'
import { getAuth, onAuthStateChanged, Unsubscribe, User } from 'firebase/auth'
import {
  doc,
  getFirestore,
  collection,
  setDoc,
  serverTimestamp,
  query,
  where,
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot,
  orderBy
} from 'firebase/firestore'
import React, { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import tw from 'twin.macro'
import { Box, Layout, ModalPrompt, TextButton, TextInput } from '../components'
import { Goal } from '../libraries'

type GoalCardProperties = Omit<Goal, 'createdAt'> & { id: string }

const GoalCard: React.FC<GoalCardProperties> = ({ name, id }) => {
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleDeleteGoal: MouseEventHandler<HTMLButtonElement> = (event) => {
    const user = getAuth().currentUser
    if (user && event.currentTarget.dataset.id) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      deleteDoc(doc(getFirestore(), 'users', `${user.uid}/goals/${event.currentTarget.dataset.id}`))
    }
  }

  return (
    <Box tw="p-6 rounded-4xl flex flex-col items-end justify-center text-2xl text-black bg-white">
      <span tw="w-full">{name}</span>
      <button tw="w-8 h-8 flex items-center justify-center" onClick={handleDeleteGoal} data-id={id}>
        <Icon icon="uil:trash" tw="w-full h-full" />
      </button>
    </Box>
  )
}

// eslint-disable-next-line max-lines-per-function
export const GoalPage: React.FC = () => {
  // eslint-disable-next-line unicorn/no-null
  const [user, setUser] = useState<User>(null as unknown as User)
  const [isModalActive, setModalActive] = useState(false)
  const [modalGoal, setModalGoal] = useState('')
  const [goalDocuments, setGoalDocuments] = useState<QueryDocumentSnapshot<DocumentData>[]>([])

  const handleModalClose: MouseEventHandler = (event) => {
    event.preventDefault()
    setModalActive(false)
  }

  const handleModalSubmit: MouseEventHandler = async (event) => {
    event.preventDefault()
    if (modalGoal.length > 0) {
      await setDoc(
        doc(collection(getFirestore(), 'users', `${user.uid}/goals`)),
        { createdAt: serverTimestamp(), name: modalGoal }
      )
      setModalActive(false)
      setModalGoal('')
    }
  }

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setModalGoal(event.target.value)
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // eslint-disable-next-line unicorn/no-null
    let unsubscribe: Unsubscribe = null as unknown as Unsubscribe
    onAuthStateChanged(getAuth(), (value) => {
      value && setUser(value)
    })
    if (user) {
      unsubscribe = onSnapshot(
        query(
          collection(getFirestore(), 'users', `${user.uid}/goals`),
          // eslint-disable-next-line unicorn/no-null
          where('name', '!=', null),
          orderBy('name')
        ),
        (querySnapshot) => {
          setGoalDocuments(querySnapshot.docs)
        }
      )
    }
    if (unsubscribe) return () => unsubscribe()
  }, [user])

  return (
    <>
      <Layout hasNavbar>
        <div tw="w-full flex flex-col items-center text-white">
          <Box tw="w-full mb-12 px-8 pt-8 pb-16 rounded-t-none bg-primary flex flex-col items-center space-y-8">
            <h1 tw="text-3xl">今月の目標</h1>
            <div tw="w-full grid gap-y-6">
              {
                goalDocuments.map((goalDocument) => (
                  <GoalCard name={(goalDocument.data() as Goal).name} key={goalDocument.id} id={goalDocument.id} />
                ))
              }
            </div>
          </Box>
          <TextButton tw="mb-12 bg-primary" onClick={() => setModalActive(true)}>追加する</TextButton>
        </div>
      </Layout>
      <ModalPrompt
        label="目標を入力"
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        active={isModalActive}
      >
        <TextInput
          as="textarea"
          value={modalGoal}
          onChange={handleInputChange}
        />
      </ModalPrompt>
    </>
  )
}
