import tw from 'tailwind-styled-components'

const CheckoutItem = tw.div`
  sm:px-8
  md:px-16
  lg:px-44
`
const Header = tw.div`
  items-center
  px-64
  py-8
  mb-10
  flex
  flex-row
  justify-between
  w-0
  md:w-full
`
export { CheckoutItem, Header }
