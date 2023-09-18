import { Container, Img, Primary, Secondary, Subtext, Title } from './styled'
import { ReactElement } from 'react'

type HeroProps = {
	action: ReactElement
	image: string
	imageAlt: string
	subtext: string
	sticker?: ReactElement
	title: string
}

type CustomHeroProps = {
	primary: ReactElement
	secondary: ReactElement
}

const Hero = (props: HeroProps) => {
	const { action, image, imageAlt, sticker, subtext, title } = props
	return (
		<Container>
			<Primary>
				<Title>{title}</Title>
				<Subtext>{subtext}</Subtext>
				{action}
			</Primary>
			<Secondary>
				<Img
					alt={imageAlt}
					src={image}
					width={200}
					height={200}
				/>
				{sticker}
			</Secondary>
		</Container>
	)
}

const CustomHero = (props: CustomHeroProps) => {
	const { primary, secondary } = props
	return (
		<Container>
			<Primary>{primary}</Primary>
			<Secondary>{secondary}</Secondary>
		</Container>
	)
}

export { CustomHero, Hero }
export type { HeroProps, CustomHeroProps }
