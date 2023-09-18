import { db } from '@/lib/db'
import { filterPayload } from '@/lib/utils'
import { type User } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const createAndUpdateUser = async (user: User) => {
	const { uid, displayName, email, phoneNumber, photoURL } = user
	const docRef = doc(db, 'users', user.uid)
	const snapshot = await getDoc(docRef)

	const filteredPayload = filterPayload({
		displayName,
		email,
		phoneNumber,
		photoURL,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	})

	if (snapshot.exists()) {
		await updateDoc(doc(db, 'users', uid), { updatedAt: Date.now() })
	} else {
		await setDoc(doc(db, 'users', uid), filteredPayload)
	}
}

export { createAndUpdateUser }
