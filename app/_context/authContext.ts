import { Atom, atom, useAtom } from 'jotai'
import { UserData } from './types'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { getUserData } from '@/api/getUserData'
import { db, firebaseApp } from '@/lib/db'
import { useEffect } from 'react'

const auth = getAuth(firebaseApp)
const authStateAtom = atom(auth)
const userDataAtom = atom<UserData | null>(null)

export { userDataAtom, authStateAtom }
