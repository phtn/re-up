import { ToastAction, ToastActionElement } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { Maybe } from '@/app/_context/types'
import { map } from '@/lib/utils'

type T = {
	title: string
	description: string
	action?: ToastActionElement
	altText?: string
	onClick?: Maybe
}

export const Snack = (props: T) => {
	const { title, description, action, altText, onClick } = props
	const hasAction = action !== undefined

	const actionOptions = map(
		<ToastAction
			altText={altText as string}
			onClick={onClick}>
			{action}
		</ToastAction>,
		<></>
	)
	return toast({
		title,
		description,
		action: actionOptions.get(hasAction),
	})
}

const successfulLogin = Snack({ title: 'Login', description: 'Welcome back!' })
