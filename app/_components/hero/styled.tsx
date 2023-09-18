import Image from 'next/image'
import tw from 'tailwind-styled-components'

type ImageProps = {
	height?: number
	width?: number
	alt: string
	src: string
}

// *  CONTAINERS  * //
const Container = tw.div`
  flex-1
  lg:px-40
  lg:pb-24
  xl:grid
  xl:grid-cols-2
  transition-all
  duration-1000
  lg:hover:px-[10.85%]
`

const Img = tw(Image)`
  w-auto
  md:h-[500px] 
  h-[600px]
`

const Primary = tw.div`
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

const Secondary = tw.div`
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

// *  CONTENT * //
const Title = tw.h1`
  text-[3rem]
  md:text-[3.5rem]
  font-thin
  text-foreground
  dark:text-secondary-foreground
  leading-tight
  min-w-[90%]
  self-center
`

const Subtext = tw.h1`
  text-[1.15rem]
  md:text-[1rem]
  font-regular
  text-slate-500
  dark:text-slate-400
  my-12
  w-[90%]
  flex
`

export { Container, Img, Primary, Secondary, Subtext, Title }
