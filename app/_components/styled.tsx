import { Button } from '@/components/ui/button'
import tw from 'tailwind-styled-components'

const Main = tw.div`
  w-full
  h-full
  overflow-hidden
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

const LgContent = tw.div`
  flex-1
  lg:px-40
  lg:pb-56
  xl:grid
  xl:grid-cols-2
  transition-all
  duration-1000
  lg:hover:px-[10.85%]
`

const HeroPrimary = tw.div`
  xl:flex
  h-full
  w-full
  px-6
  xl:px-20
  lg:px-10
  flex-col
  justify-center
  items-center
  xl:items-start
`

const HeroSecondary = tw.div`
  h-fit
  items-center
  justify-center
  md:rounded-xl
  overflow-hidden
  transition-all
  xl:scale-95
  hover:scale-100
  transform-gpu
  duration-1000
`

const HeroTitle = tw.h1`
  text-[3rem]
  md:text-[4.5rem]
  font-thin
  text-foreground
  dark:text-secondary-foreground
  leading-tight
  min-w-[90%]
  self-center
`

const HeroSubtext = tw.h1`
  text-[1.15rem]
  md:text-[1rem]
  font-regular
  text-slate-500
  dark:text-slate-400
  my-12
  w-[90%]
  flex
`

const Discover = tw(Button)`
  rounded-full
  transition-all
  hover:px-10
  py-4
  ease-out
  duration-500
  mb-12
  xl:mb-0
`

export {
	Discover,
	HeroPrimary,
	HeroSecondary,
	HeroSubtext,
	HeroTitle,
	LgContainer,
	LgContent,
	Main,
}
