type CheckoutProductProps = {
	productName: string
	productPrice: number
	productDescription: string
	productInfo: string
	productImage: string
}

type CheckoutHeaderProps = {
	cart: string
	totalDisplayPrice: string
	unitPoints: number
}

type ProductDetailProps = {
	handleDecrement: () => void
	handleIncrement: () => void
	handleOnPressCheckout: () => void
	isLoading: boolean
	itemCount: number
	productDescription: string
	productInfo: string
	productName: string
	productUnitPrice: string
}

type AddressProps = {
	city: string | null
	country: string | null
	line1: string | null
	line2: string | null
	postal_code: string | null
	state: string | null
}

type BillingProps = {
	name: string | null
	phone: string | null
	email: string | null
	address: AddressProps
}

type CheckoutPayload = {
	billing: BillingProps
	line_items: LineItemProps[]
}

type LineItemProps = {
	currency: string
	amount: number
	name: string
	quantity: number
	description: string
}

type CheckoutSessionProps = {
	checkout_url: string
	session_id: string
}

export type {
	BillingProps,
	CheckoutHeaderProps,
	CheckoutProductProps,
	ProductDetailProps,
	CheckoutSessionProps,
	CheckoutPayload,
	LineItemProps,
}
