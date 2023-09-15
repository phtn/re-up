import { ReactElement } from 'react'
import {
	Discover,
	HeroPrimary,
	HeroSecondary,
	HeroSubtext,
	HeroTitle,
	LgContainer,
	LgContent,
} from '../styled'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'

type BodyProps = {
	children: ReactElement
}

const Hero = () => (
	<LgContent>
		<HeroPrimary>
			<HeroTitle>Discover brand new ways to travel.</HeroTitle>
			<HeroSubtext>
				Embark on your journeys with unparalleled ease and efficiency, as we
				redefine the way you pack for travel.
			</HeroSubtext>
			<Discover>
				<span>Explore</span>
				<SearchIcon
					width={24}
					height={24}
					className='ml-3 h-4 w-auto'
				/>
			</Discover>
		</HeroPrimary>
		<HeroSecondary>
			<Image
				alt='bag'
				src={'/images/steam-two-w-trans.png'}
				height={200}
				width={200}
				className='w-full h-auto'
			/>
		</HeroSecondary>
	</LgContent>
)

export const Body = ({ children }: BodyProps) => (
	<LgContainer>
		<Hero />
	</LgContainer>
)
