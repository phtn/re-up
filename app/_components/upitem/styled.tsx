import tw from 'tailwind-styled-components'

const Container = tw.div`
  flex
  w-[600px]
  h-[600px]
  justify-center
  border-2
  rounded-full
  overflow-hidden
  bg-slate-100
`

const Row = tw.div`
  items-center
  justify-center
  flex
`

const Details = tw.div`
  flex
bg-slate-300
  absolute
  rounded-2xl
  h-44
  justify-center
  items-center
  w-[650px]
  
`

export { Container, Details, Row }
