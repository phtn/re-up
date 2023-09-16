import { type ClassValue, clsx } from 'clsx'
import { useLayoutEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// export default function useWindowPosition() {
// 	const [scrollPosition, setPosition] = useState(0)
// 	useLayoutEffect(() => {
// 		function updatePosition() {
// 			setPosition(window.pageYOffset)
// 		}
// 		window.addEventListener('scroll', updatePosition)
// 		updatePosition()
// 		return () => window.removeEventListener('scroll', updatePosition)
// 	}, [])
// 	return scrollPosition
// }
