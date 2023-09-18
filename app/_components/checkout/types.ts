type CheckoutProps = {
	productName: string
	productPrice: number
	productDescription: string
	productInfo: string
	productImage: string
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

export type { BillingProps, CheckoutProps, CheckoutSessionProps, LineItemProps }
