import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import {
	ArrowRightCircle,
	ArrowRightIcon,
	ChevronRight,
	Minus,
	MoveRightIcon,
	Plus,
	RefreshCwIcon,
	RotateCw,
	RotateCwIcon,
	ShoppingBag,
	UserCircle2Icon,
} from 'lucide-react'
import { Action } from '../styled'
import { CheckoutHeader, CheckoutItem } from './styled'
import Image from 'next/image'
import { useCallback, useMemo, useState } from 'react'
import {
	BillingProps,
	CheckoutProps,
	CheckoutSessionProps,
	LineItemProps,
} from './types'
import { decimal, map } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { signIn } from '@/api/signIn'
import { useAtom } from 'jotai'
import { AuthContext } from '@/context/authContext'
import { initPayment } from '@/api/checkout'

export const Checkout = (props: CheckoutProps) => {
	const {
		productDescription,
		productImage,
		productInfo,
		productName,
		productPrice,
	} = props

	const [user, _] = useAtom(AuthContext)
	const [count, setCount] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [paymongoResponse, setPaymongoResponse] =
		useState<CheckoutSessionProps>({} as CheckoutSessionProps)

	const handleIncrement = () => setCount((prev) => prev + 1)
	const handleDecrement = () =>
		setCount((prev) => {
			if (prev === 1) {
				return 1
			} else {
				return prev - 1
			}
		})

	const unitPrice = decimal(productPrice, 2)
	const total = useMemo(() => productPrice * count, [count])
	const totalPrice = decimal(total, 2)

	const name = user?.displayName
	const email = user?.email
	const phone = ''

	const basePoint = 120
	const unitPoints = basePoint * count

	const cart = `${count} item${count > 1 ? 's' : ''}`

	const { toast } = useToast()

	const handleSignIn = () =>
		signIn().then(() =>
			toast({
				title: 'Sign in successful',
				description: `We got new arrivals and I swear you got to see this!`,
				action: <ToastAction altText='new arrivals'>View Latest</ToastAction>,
			})
		)

	const processCartItems = useCallback(() => {
		const inCents = total * 1.12 * 100
		const totalAmount = Math.floor(inCents)
		const line_items: LineItemProps[] = [
			{
				currency: 'PHP',
				amount: totalAmount,
				name: productName,
				quantity: count,
				description: 'desc',
			},
		]

		const billing: BillingProps = {
			name: null,
			phone: null,
			email: null,
			address: {
				city: null,
				country: null,
				line1: null,
				line2: null,
				postal_code: null,
				state: null,
			},
		}

		return { billing, line_items }
	}, [total, count, name, phone, email, user, productDescription])

	// *	PAYMENT	*	//

	const handlePayment = useCallback(async () => {
		setIsLoading(true)
		const initProps = processCartItems()

		await initPayment(initProps)
			.then((res) => {
				return setPaymongoResponse(res as CheckoutSessionProps)
			})
			.catch((err) => console.log(err))
			.finally(() => {
				if (paymongoResponse.session_id !== undefined) {
					setIsLoading(false)
					return toast({
						title: `Paymongo: ${paymongoResponse.session_id}`,
						description: paymongoResponse.checkout_url,
					})
				}
			})
	}, [paymongoResponse.checkout_url, paymongoResponse.session_id, isLoading])

	const handleOnCheckout = () => {
		if (user) {
			setIsLoading(true)
			console.log('Proceed to payment')
			handlePayment()
		} else {
			return toast({
				title: 'Login to proceed.',
				description:
					'This ensures that we can send your e-receipt to your email.',
				action: (
					<ToastAction
						onClick={handleSignIn}
						altText='Continue with Google'>
						<span className='text-secondary-foreground'>Sign in</span>
					</ToastAction>
				),
			})
		}
	}

	const CheckoutOptions = useCallback(() => {
		const options = map(
			<RotateCwIcon className='text-gradient text-primary mx-6 animate-spin' />,
			<MoveRightIcon className='text-primary mx-6' />
		)
		return <>{options.get(isLoading)}</>
	}, [isLoading])

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Action size={'lg'}>
					<span>Buy Now</span>
					<ArrowRightIcon
						width={24}
						height={24}
						className='ml-3 h-4 w-auto'
					/>
				</Action>
			</SheetTrigger>
			<SheetContent side='bottom'>
				<SheetHeader>
					<CheckoutHeader>
						<div className='flex flex-row w-[16rem] items-center justify-between'>
							<span className='text-primary font-medium py-1'>Total</span>
							<ChevronRight
								className='text-zinc-500'
								height={16}
								width={16}
							/>
							<span className='fade-in-10 animate-in md:text-3xl'>
								₱ {totalPrice}
							</span>
						</div>

						<div className='flex flex-row items-center justify-between w-36'>
							<ShoppingBag className='text-primary' />
							<ChevronRight
								className='text-zinc-500'
								height={16}
								width={16}
							/>
							<p className='text-foreground font-medium'>{cart}</p>
						</div>
						<div></div>
						<div></div>

						<p className='text-primary-foreground px-3 py-1 bg-primary'>
							+ {unitPoints} pts
						</p>
					</CheckoutHeader>
				</SheetHeader>
				<CheckoutItem>
					<section className='w-full pb-12 md:pb-24 lg:pb-32'>
						<div className='container flex items-start gap-16 px-4 md:px-6'>
							<Image
								alt='Soap'
								className='aspect-[1/1] object-cover object-center transition-transform transform-gpu duration-1000 scale-95 animate-in'
								height={500}
								src={productImage}
								width={500}
							/>
							<div className='space-y-10'>
								<h1 className='text-4xl font-bold tracking-tighter'>
									{productName}
									<span className='font-light text-3xl mx-4 mb-1 tracking-normal'>
										Face & Body
									</span>
								</h1>

								<p className='text-2xl font-semibold text-primary'>
									₱ {unitPrice}
								</p>
								<p className='text-base text-foreground'>
									{productDescription}
								</p>
								<div className='flex space-x-8'>
									<Button
										onClick={handleDecrement}
										className='w-12 h-12 rounded-full border-[0.44px] border-primary text-zinc-900 text-lg font-bold bg-gradient-to-br from-primary-foreground to-primary'>
										<Minus />
									</Button>
									<div className='flex items-center justify-center w-12 h-12 rounded-lg text-foreground text-xl backdrop-blur-md bg-primary-foreground/25 font-medium'>
										{count}
									</div>
									<Button
										onClick={handleIncrement}
										className='w-12 h-12 rounded-full border-[0.44px] border-primary text-zinc-900 text-lg font-bold bg-gradient-to-br from-primary-foreground to-primary'>
										<Plus />
									</Button>
								</div>
								<Button
									onClick={handlePayment}
									className='w-full h-14 rounded-md bg-zinc-900 text-zinc-50 shadow-sm hover:bg-[#191818]'>
									Checkout
									<CheckoutOptions />
								</Button>
								<p className='text-xs text-foreground dark:text-zinc-400'>
									{productInfo}
								</p>
							</div>
						</div>
					</section>
				</CheckoutItem>
			</SheetContent>
		</Sheet>
	)
}
