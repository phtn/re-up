'use client'
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
import { Header, CheckoutItem } from './styled'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
	BillingProps,
	ProductDetailProps,
	CheckoutSessionProps,
	LineItemProps,
	CheckoutHeaderProps,
	CheckoutProductProps,
} from './types'
import { decimal, map } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { signIn } from '@/api/signIn'
import { useAtom } from 'jotai'
import { createCheckoutSession } from '@/api/checkout'
import { redirect } from 'next/navigation'

export const Checkout = (props: CheckoutProductProps) => {
	const {
		productDescription,
		productImage,
		productInfo,
		productName,
		productPrice,
	} = props

	const [itemCount, setItemCount] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [paymongoResponse, setPaymongoResponse] =
		useState<CheckoutSessionProps | null>(null)

	const productUnitPrice = decimal(productPrice, 2)
	const totalPrice = useMemo(
		() => productPrice * itemCount,
		[itemCount, productPrice]
	)
	const totalDisplayPrice = decimal(totalPrice, 2)

	const basePoint = 120
	const unitPoints = basePoint * itemCount

	const cart = `${itemCount} item${itemCount > 1 ? 's' : ''}`

	const { toast } = useToast()

	const handleSignIn = () =>
		signIn().then(() =>
			toast({
				title: 'Sign in successful',
				description: `We got new arrivals and I swear you got to see this!`,
				action: <ToastAction altText='new arrivals'>View Latest</ToastAction>,
			})
		)

	const inCents = productPrice * 1.12 * 100 * itemCount
	const totalAmount = Math.floor(inCents)

	const processCartItems = useCallback(() => {
		const line_items: LineItemProps[] = [
			{
				currency: 'PHP',
				amount: Math.floor(productPrice * 1.12 * 100),
				name: productName,
				quantity: itemCount,
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
	}, [itemCount, productPrice, productName])

	// *	PAYMENT	*	//

	useEffect(() => {
		console.log(itemCount, totalAmount)
	}, [itemCount, totalAmount])

	useEffect(() => {
		if (paymongoResponse?.checkout_url) {
			redirect(paymongoResponse.checkout_url)
		}
	}, [paymongoResponse])

	// const handleOnPressCheckout = () => handlePayment()

	// const handleOnPressCheckout = () => {
	// 	if (user) {
	// 		setIsLoading(true)
	// 		console.log('Proceed to payment')
	// 		handlePayment()
	// 	} else {
	// 		return toast({
	// 			title: 'Login to proceed.',
	// 			description:
	// 				'This ensures that we can send your e-receipt to your email.',
	// 			action: (
	// 				<ToastAction
	// 					onClick={handleSignIn}
	// 					altText='Continue with Google'>
	// 					<span className='text-secondary-foreground'>Sign in</span>
	// 				</ToastAction>
	// 			),
	// 		})
	// 	}
	// }

	const productDetailProps = useMemo(() => {
		const handleIncrement = () => setItemCount((prev) => prev + 1)
		const handleDecrement = () =>
			setItemCount((prev) => (prev === 1 ? 1 : prev - 1))
		const handleOnPressCheckout = async () => {
			setIsLoading(true)
			const payload = processCartItems()

			try {
				const response = await createCheckoutSession(payload)
				setPaymongoResponse(response as CheckoutSessionProps)
			} catch (err) {
				console.log(err)
			}
		}
		return {
			handleDecrement,
			handleIncrement,
			handleOnPressCheckout,
			isLoading,
			itemCount,
			productDescription,
			productInfo,
			productName,
			productUnitPrice,
		}
	}, [
		isLoading,
		itemCount,
		productDescription,
		productInfo,
		productName,
		productUnitPrice,
		processCartItems,
	])

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
				<CheckoutHeader
					cart={cart}
					totalDisplayPrice={totalDisplayPrice}
					unitPoints={unitPoints}
				/>
				<CheckoutItem>
					<section className='w-full pb-12 md:pb-24 lg:pb-32'>
						<div className='container flex items-start justify-center gap-16 px-4 md:px-6'>
							<Image
								alt='Soap'
								className='aspect-[1/1] object-cover object-center transition-transform transform-gpu duration-1000 scale-95 animate-in'
								height={300}
								src={productImage}
								width={300}
							/>
							<ProductDetails {...productDetailProps} />
						</div>
					</section>
				</CheckoutItem>
			</SheetContent>
		</Sheet>
	)
}

const CheckoutHeader = (props: CheckoutHeaderProps) => {
	const { cart, totalDisplayPrice, unitPoints } = props
	return (
		<SheetHeader>
			<Header>
				<div className='flex flex-row w-[16rem] items-center justify-between'>
					<span className='text-primary font-medium py-1'>Total</span>
					<ChevronRight
						className='text-zinc-500'
						height={16}
						width={16}
					/>
					<span className='fade-in-10 animate-in md:text-3xl'>
						₱ {totalDisplayPrice}
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
			</Header>
		</SheetHeader>
	)
}

const ProductDetails = (props: ProductDetailProps) => {
	const {
		productDescription,
		productInfo,
		productName,
		productUnitPrice,
		isLoading,
		itemCount,
		handleDecrement,
		handleIncrement,
		handleOnPressCheckout,
	} = props

	const CheckoutOptions = useCallback(() => {
		const options = map(
			<RotateCwIcon className='text-gradient text-primary mx-6 animate-spin' />,
			<MoveRightIcon className='text-primary mx-6' />
		)
		return <>{options.get(isLoading)}</>
	}, [isLoading])
	return (
		<div className='space-y-10'>
			<h1 className='text-4xl font-bold tracking-tighter'>
				{productName}
				<span className='font-light text-3xl mx-4 mb-1 tracking-normal'>
					Face & Body
				</span>
			</h1>

			<p className='text-2xl font-semibold text-secondary-foreground'>
				₱ {productUnitPrice}
			</p>
			<p className='text-base text-foreground'>{productDescription}</p>
			<div className='flex space-x-8'>
				<Button
					onClick={handleDecrement}
					className='w-12 h-12 rounded-full border-[0.44px] border-primary text-zinc-900 text-lg font-bold bg-gradient-to-br from-primary-foreground to-primary'>
					<Minus />
				</Button>
				<div className='flex items-center justify-center w-12 h-12 rounded-lg text-foreground text-xl backdrop-blur-md bg-primary-foreground/25 font-medium'>
					{itemCount}
				</div>
				<Button
					onClick={handleIncrement}
					className='w-12 h-12 rounded-full border-[0.44px] border-primary text-zinc-900 text-lg font-bold bg-gradient-to-br from-primary-foreground to-primary'>
					<Plus />
				</Button>
			</div>
			<Button
				onClick={() => handleOnPressCheckout()}
				className='w-full h-14 rounded-md bg-zinc-900 text-zinc-50 shadow-sm hover:bg-[#191818]'>
				Checkout
				<CheckoutOptions />
			</Button>
			<p className='text-xs text-foreground dark:text-zinc-400'>
				{productInfo}
			</p>
		</div>
	)
}
