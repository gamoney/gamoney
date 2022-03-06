import { getAuth, getRedirectResult, onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { Route, Router, useLocation } from 'wouter-preact'
import { GoalPage, HistoryPage, LoginPage, RecordPage, SettingsPage } from './pages'

const initialData = { createdAt: serverTimestamp() }

export const App: React.FC = () => {
  const [location, setLocation] = useLocation()

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user && location === '/') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setDoc(doc(getFirestore(), `users/${user.uid}`), initialData, { merge: true })
          .then(() => Promise.all([
            setDoc(
              doc(collection(getFirestore(), 'users', `${user.uid}/goals`), 'metadata'),
              initialData,
              { merge: true }
            ),
            setDoc(
              doc(collection(getFirestore(), 'users', `${user.uid}/records`), 'metadata'),
              initialData,
              { merge: true }
            )
          ]))
          .then(() => setLocation('/record'))
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        getRedirectResult(getAuth())
      }
    })
  }, [location, setLocation])

  return (
    <Router>
      <Route path="/" component={LoginPage} />
      <Route path="/record" component={RecordPage} />
      <Route path="/history" component={HistoryPage} />
      <Route path="/goal" component={GoalPage} />
      <Route path="/settings" component={SettingsPage} />
    </Router>
  )
}
