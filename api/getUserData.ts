import { UserData } from '@/context/types'
import { db } from '@/lib/db'
import { doc, getDoc } from 'firebase/firestore'

const getUserData = async (uid: string) => {
	const docRef = doc(db, 'users', uid)
	const snapshot = await getDoc(docRef)
	const userData = snapshot.data() as UserData
	return userData
}

export { getUserData }
