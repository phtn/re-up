import { Atom } from 'jotai'
import { ReactNode } from 'react'

type HydrateUserProps = {
	initialValues: UserData
	children: ReactNode
}
type Maybe = (...args: any[]) => void | undefined

type UserData = {
	userId: string
	displayName: string
	email: string
	photoURL: string
	updatedAt: number
	createdAt: number
	credits: number
	newUser: boolean
}

export type { HydrateUserProps, Maybe, UserData }
