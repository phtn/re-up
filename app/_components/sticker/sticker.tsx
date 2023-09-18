import Image from 'next/image'
import { Container } from './styled'
import { BadgePercentIcon } from 'lucide-react'

type Props = {
	label: string
	lg?: boolean
}

const Sticker = ({ label, lg }: Props) => {
	return <Container $lg={lg as boolean}>{label}</Container>
}

const FlashSticker = ({ label, lg }: Props) => (
	<Container $lg={lg as boolean}>
		<span className='font-medium text-primary-foreground text-[24px] mr-2'>
			₱
		</span>
		<span className={`flex text-slate-900 text-[44px] font-bold leading-tight`}>
			{' '}
			{label}
		</span>
	</Container>
)

export { FlashSticker, Sticker }
