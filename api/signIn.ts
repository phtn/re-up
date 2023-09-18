import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '@/lib/db'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { createAndUpdateUser } from './createUser'

initializeApp(firebaseConfig)

let provider = new GoogleAuthProvider()

const auth = getAuth()

export const signIn = () =>
	signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result)
			const _token = credential?.accessToken
			// The signed-in user info.
			const user = result.user
			// IdP data available using getAdditionalUserInfo(result)
			// ...
			createAndUpdateUser(user)
		})
		.catch((err) => {
			const errorCode = err.code
			const errorMessage = err.message
			// The email of the user's account used.
			const email = err.customData.email
			// The AuthCredential type that was used.
			const _credential = GoogleAuthProvider.credentialFromError(err)
			console.log(err, email, errorCode, errorMessage)
		})
