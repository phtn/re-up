import tw from 'tailwind-styled-components'

const Container = tw.div`
  flex
  md:px-16
  py-3
  pr-5
  pl-2
  items-center
  justify-between
  sticky
  backdrop-blur-lg
  top-0
  z-50

`

const Brand = tw.h1`
  flex
  text-[2rem]
  font-bold
  w-[120px]
  justify-center
  items-center
`

const UserTrigger = tw.div`
  flex
  flex-row
  justify-around
`

const MensCover = tw.div`
  h-full
  bg-[url('/images/mens-bag.webp')]
  bg-cover
  bg-no-repeat
`

const Menubar = tw.div`
  items-center
  justify-center
  transition-transform
  duration-200
  ease-out
  scale-x-0
  lg:scale-x-100
  xl:flex
  flex-row
  hidden
  z-40
  w-full
`

const WomensCover = tw.div`
  h-full
  bg-[url('/images/womens-bag.webp')]
  bg-cover
  bg-no-repeat
`

export { Brand, Container, Menubar, MensCover, UserTrigger, WomensCover }
