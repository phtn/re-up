import Image from 'next/image'
import { Container, Details, Row } from './styled'

type Props = {
	title: string
	description: string
	image: string
}

export const UpItem = (props: Props) => {
	const { title, description, image } = props
	return (
		<Container>
			<Row>
				<Details>
					<span className='font-extrabold text-[6rem]'>{title}</span>
					<span></span>
				</Details>

				<Image
					alt={description}
					src={image}
					width={200}
					height={200}
					className='h-[450px] hover:h-[550px] duration-1000 transition-scale w-auto z-50'
				/>
			</Row>
		</Container>
	)
}
