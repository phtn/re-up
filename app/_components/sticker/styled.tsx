import { BadgePercent } from 'lucide-react'
import tw from 'tailwind-styled-components'

type StickerProps = {
	$lg: boolean
}

const Container = tw.div<StickerProps>`
  ${(p) => (p.$lg ? 'h-32 w-32' : 'h- 10w-5')}

  flex
  flex-row
  bg-gradient-to-br
  from-primary/50
  to-secondary-foreground/10
  backdrop-blur-lg
  absolute
  top-16
  left-3/4
  rounded-full
  items-center
  justify-center
  fade-in-25
  duration-[10000]
`

export { Container }
