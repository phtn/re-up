import { useAtom } from 'jotai'
import { userDataAtom } from '../_context/authContext'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { db } from '@/lib/db'
import { UserData } from '../_context/types'

const useFetchUser = (uid: string) => {
	const [_, setData] = useAtom(userDataAtom)

	if (!uid) {
		setData(null)
		return
	}

	const unsub = async () => {
		const docRef = doc(db, 'users', uid)
		const snapshot = await getDoc(docRef)
		const userData = snapshot.data() as UserData
		setData(userData)
	}
}

export { useFetchUser }
