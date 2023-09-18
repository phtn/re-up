import tw from 'tailwind-styled-components'

const CheckoutItem = tw.div`
  md:px-56
`
const CheckoutHeader = tw.div`
  items-center
  px-64
  py-8
  mb-10
  flex
  flex-row
  justify-between
  w-0
  border-b
  md:w-full
`
export { CheckoutItem, CheckoutHeader }
