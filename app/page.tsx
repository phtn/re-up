'use client'
import Body from './_components/body'
import { Main } from './_components/styled'
import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/lib/db'
import { getUserData } from '@/api/getUserData'
import { useAtom } from 'jotai'
import { AuthContext } from '@/context/authContext'
import { useEffect } from 'react'

const auth = getAuth(firebaseApp)

export default function Home() {
	const [userData, setUserData] = useAtom(AuthContext)

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user !== null) {
				const uid = user.uid
				getUserData(uid)
					.then((result) => setUserData(result))
					.catch((err) => console.log(err))
			} else setUserData(user)
		})
	}, [userData])

	return (
		<Main>
			<Body />
		</Main>
	)
}
