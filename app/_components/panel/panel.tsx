import { ReactElement } from 'react'
import { BigContainer, Container } from './styled'

type Props = { children: ReactElement }

const Panel = ({ children }: Props) => <Container>{children}</Container>

const BigPanel = ({ children }: Props) => (
	<BigContainer>{children}</BigContainer>
)

export { BigPanel, Panel }
