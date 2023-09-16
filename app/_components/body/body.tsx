import { ReactElement } from 'react'
import {
	DarkSection,
	Discover,
	HeroOverlay,
	HeroPrimary,
	HeroSecondary,
	HeroSubtext,
	HeroTitle,
	LgContainer,
	LgContent,
	MediumGridCol,
} from '../styled'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Panel from '../panel'
import UpItem from '../upitem'
import { BigPanel } from '../panel/panel'

type BodyProps = {
	children: ReactElement
}

const upItems = [
	{ title: 'Appalachian', description: '', image: '/images/azure-one.png' },
	{ title: 'Rockies', description: '', image: '/images/azure-two.png' },
]

const Hero = () => (
	<LgContent>
		<HeroPrimary>
			<HeroTitle>Discover brand new ways to travel.</HeroTitle>
			<HeroSubtext>
				Embark on your journeys with unparalleled ease and efficiency, as we
				redefine the way you pack for travel.
			</HeroSubtext>
			<Discover size={'lg'}>
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
				className='w-auto md:h-[700px] h-[600px]'
			/>
		</HeroSecondary>
	</LgContent>
)

const MidSection = () => (
	<BigPanel>
		<DarkSection>
			<MediumGridCol>
				<UpItem {...upItems[0]} />
				<UpItem {...upItems[1]} />
			</MediumGridCol>
		</DarkSection>
	</BigPanel>
)

export const Body = () => (
	<LgContainer>
		<Hero />
		<HeroOverlay>
			<Panel>
				<></>
			</Panel>
		</HeroOverlay>
		<MidSection />
	</LgContainer>
)
