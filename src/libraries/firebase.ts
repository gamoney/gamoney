import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { FieldValue } from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
  // eslint-disable-next-line no-secrets/no-secrets
  apiKey: 'AIzaSyC8Mevko_tnu3iQ5G1fElVQCiX5zsb-6dk',
  appId: '1:407346577704:web:956014ac30158dd1f7101d',
  authDomain: 'gamoney-2c326.firebaseapp.com',
  messagingSenderId: '407346577704',
  projectId: 'gamoney',
  storageBucket: 'gamoney.appspot.com'
}

export const app = initializeApp(firebaseConfig)

export const signIn = () => signInWithRedirect(getAuth(), new GoogleAuthProvider())

export type Goal = {
  name: string,
  createdAt: FieldValue
}

export type Record = {
  amount: number,
  createdAt: FieldValue
}
