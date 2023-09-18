import { atom } from 'jotai'
import { UserData } from './types'

const AuthContext = atom<UserData | null>(null)

export { AuthContext }
