import { CheckoutSessionProps } from '@/app/_components/checkout/types'
import { toast } from '@/components/ui/use-toast'
import { filterPayload } from '@/lib/utils'
import axios from 'axios'

const URL = process.env.NEXT_PUBLIC_PAYMONGO_CS_URL
const TK = process.env.NEXT_PUBLIC_PAYMONGO_TK

const HEADERS = {
	accept: 'application/json',
	'Content-Type': 'application/json',
	authorization: `Basic ${TK}`,
}

const payment_method_types = [
	'card',
	'gcash',
	'grab_pay',
	'paymaya',
	'dob',
	'dob_ubp',
]

const send_email_receipt = false
const show_description = true
const show_line_items = true
const description = 'Comptrolla Services'

export const initPayment = async (props: any) => {
	const { billing, line_items } = props
	const cleanBilling = filterPayload(billing)
	const data = {
		data: {
			attributes: {
				send_email_receipt,
				show_description,
				show_line_items,
				line_items,
				billing: cleanBilling,
				payment_method_types,
				description,
				reference_number: Date.now().toString(20),
			},
		},
	}

	const options = {
		method: 'POST',
		url: URL,
		headers: HEADERS,
		data,
	}

	return axios
		.request(options)
		.then((response) => {
			const status = response.data
			const checkout_url = status.data.attributes.checkout_url
			const session_id = status.data.id
			return { checkout_url, session_id }
		})
		.catch((err) =>
			toast({
				title: 'Network Error',
				description: '',
			})
		)
}
