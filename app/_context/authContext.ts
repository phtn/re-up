import { atom } from 'jotai'
import { UserData } from './types'
import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/lib/db'
const auth = getAuth(firebaseApp)
const authStateAtom = atom(auth)
const userDataAtom = atom<UserData | null>(null)

export { userDataAtom, authStateAtom }
