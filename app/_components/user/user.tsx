import { Button } from '@/components/ui/button'
import { getAuth, signOut } from 'firebase/auth'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { ReceiptIcon, ShoppingBagIcon, UserCircle2Icon } from 'lucide-react'
import {
	UserContentBody,
	ContentHeader,
	UserContent,
	UserHeader,
	FooterContainer,
	LoginHeader,
	LoginContent,
	UserProfile,
	UserDetailsContent,
	SubscriptionCard,
	PanelItem,
	PanelDetails,
	PanelContainer,
} from './styled'
import { useAtom } from 'jotai'
import { generateGreeting, getFirstWord, getInitials, map } from '@/lib/utils'
import { useCallback, useMemo } from 'react'
import { signIn } from '@/api/signIn'
import { firebaseApp } from '@/lib/db'
import { UserDetailProps } from './types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { userDataAtom } from '@/app/_context/authContext'

const auth = getAuth(firebaseApp)
const onSignOut = () =>
	signOut(auth)
		.then(() => {
			console.log('signed out.')
		})
		.catch((err) => {
			console.log(err)
		})

const UserDetails = ({ displayName, email, photoURL }: UserDetailProps) => {
	const firstName = getFirstWord(displayName as string)
	const initials = getInitials(displayName as string)
	return (
		<UserProfile>
			<UserDetailsContent>
				<SheetTitle>{firstName}</SheetTitle>
				<span className='text-xs font-medium text-primary'>{email}</span>
			</UserDetailsContent>
			<Avatar>
				<AvatarImage src={photoURL} />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
		</UserProfile>
	)
}

const Authenticated = () => {
	return (
		<UserContentBody>
			<SubscriptionCard>
				<span className='text-primary-foreground font-medium tracking-wider'>
					Active
				</span>
				<span className='text-primary-foreground tracking-wide'>
					<span className='font-extrabold text-[24px]'>500</span> pts
				</span>
			</SubscriptionCard>

			<PanelContainer>
				<PanelItem>
					<PanelDetails>
						<ShoppingBagIcon className='text-primary mr-4' />
						<span className='text-lg text-foreground font-semibold tracking-wide'>
							Cart
						</span>
					</PanelDetails>
					<span className='text-lg text-primary font-semibold tracking-wide'>
						0
					</span>
				</PanelItem>
				<PanelItem>
					<PanelDetails>
						<ReceiptIcon className='text-primary mr-4' />
						<span className='text-lg text-foreground font-semibold tracking-wide'>
							Transactions
						</span>
					</PanelDetails>
					<span className='text-lg text-primary font-semibold tracking-wide'>
						0
					</span>
				</PanelItem>
			</PanelContainer>
		</UserContentBody>
	)
}

const Login = () => {
	const handleSignInWithGoogle = () => signIn().then(() => console.log(null))
	return (
		<UserContentBody>
			<ContentHeader>
				<LoginHeader></LoginHeader>

				<LoginContent>
					<Button
						onClick={handleSignInWithGoogle}
						variant='outline'
						className='py-6'>
						<svg
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 48 48'
							className='h-6'>
							<g>
								<path
									fill='#EA4335'
									d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'></path>
								<path
									fill='#4285F4'
									d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'></path>
								<path
									fill='#FBBC05'
									d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'></path>
								<path
									fill='#34A853'
									d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'></path>
								<path
									fill='none'
									d='M0 0h48v48H0z'></path>
							</g>
						</svg>

						<span className='mx-4 tracking-wide font-semibold'>
							Sign in with Google
						</span>
					</Button>
				</LoginContent>
			</ContentHeader>
		</UserContentBody>
	)
}

const Footer = () => (
	<SheetFooter>
		<FooterContainer>
			<Button
				variant={'secondary'}
				onClick={onSignOut}>
				Night mode
			</Button>
			<Button
				className='bg-foreground'
				onClick={onSignOut}>
				Sign out
			</Button>
		</FooterContainer>
	</SheetFooter>
)

export const User = () => {
	const [user, _setUser] = useAtom(userDataAtom)
	const isAuthenticated = user !== null
	// const [data] = useAtom(globalAuth)

	const greeting = generateGreeting(new Date())

	const userProps = useMemo(() => {
		return {
			displayName: user?.displayName,
			email: user?.email,
			photoURL: user?.photoURL,

			// displayName: '',
			// email: '',
			// photoURL: '',
		}
	}, [user?.displayName, user?.email, user?.photoURL])

	const Header = useCallback(() => {
		const options = map(
			<UserDetails {...userProps} />,
			<SheetTitle>👋 &nbsp;&nbsp;{greeting}</SheetTitle>
		)
		return (
			<SheetHeader>
				<UserHeader>{options.get(isAuthenticated)}</UserHeader>{' '}
			</SheetHeader>
		)
	}, [isAuthenticated, greeting, userProps])

	const Content = useCallback(() => {
		const options = map(<Authenticated />, <Login />)
		return <UserContent>{options.get(isAuthenticated)}</UserContent>
	}, [isAuthenticated])

	const TriggerOptions = useCallback(() => {
		// const photoURL = user?.photoURL
		const photoURL = ''
		// const initials = getInitials(user?.displayName)
		const initials = getInitials('RE')
		const options = map(
			<Avatar>
				<AvatarImage src={photoURL} />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>,
			<UserCircle2Icon className='text-secondary-foreground' />
		)
		return <>{options.get(isAuthenticated)}</>
	}, [isAuthenticated])

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant={'ghost'}
					size={'icon'}>
					<TriggerOptions />
				</Button>
			</SheetTrigger>
			<SheetContent side='right'>
				<Header />
				<Content />
				<Footer />
			</SheetContent>
		</Sheet>
	)
}
