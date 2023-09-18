import { Button } from '@/components/ui/button'
import tw from 'tailwind-styled-components'

const Action = tw(Button)`
  rounded-full
  transition-all
  hover:px-12
  px-10
  py-4
  ease-out
  duration-500
  mb-12
  xl:mb-0
`

const DarkSection = tw.div`
  flex
  bg-primary
  h-full
`

const HeroOverlay = tw.div`
  bg-[url('/images/stacked-blue.svg')]
  bg-cover
  bg-no-repeat
`

const LgContainer = tw.div`
  flex-1
  rounded-sm
  items-center
  justify-center
  px-0
  pt-20
  bg-gradient-to-br
  bg-slate-100
  from-secondary/25
  to-background
  dark:bg-slate-100/5
  transition-all
  ease-out
  duration-1000
`

const Main = tw.div`
  w-full
  h-full
  overflow-hidden
`

const MediumGridCol = tw.div`
  grid
  md:grid-cols-2
  w-full
  h-full
  gap-24
`

const UserOverlay = tw.div`
  bg-[url('/images/h-splash.svg')]
  bg-cover
  bg-no-repeat
`

export {
	DarkSection,
	Action,
	HeroOverlay,
	LgContainer,
	Main,
	MediumGridCol,
	UserOverlay,
}
