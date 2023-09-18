'use client'
import Body from './_components/body'
import { Main } from './_components/styled'
import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/lib/db'
import { getUserData } from '@/api/getUserData'
import { useAtom } from 'jotai'
import { AuthContext } from '@/context/authContext'

export default function Home() {
	const auth = getAuth(firebaseApp)
	const [_, setUserData] = useAtom(AuthContext)

	// auth.onAuthStateChanged((user) => {
	// 	if (user !== null) {
	// 		const uid = user.uid
	// 		getUserData(uid)
	// 			.then((result) => setUserData(result))
	// 			.catch((err) => console.log(err))
	// 	} else setUserData(user)
	// })

	console.log('page')

	return (
		<Main>
			<Body />
		</Main>
	)
}
