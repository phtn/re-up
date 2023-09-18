import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Navbar from './_components/navbar'
import { ThemeProvider } from './_components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = localFont({
	src: [
		{
			path: '../public/fonts/InterDisplay-Thin.woff2',
			weight: '100',
			style: 'normal',
		},
		{
			path: '../public/fonts/InterDisplay-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../public/fonts/InterDisplay-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../public/fonts/InterDisplay-SemiBold.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../public/fonts/InterDisplay-ExtraBold.woff2',
			weight: '800',
			style: 'normal',
		},
	],
})

export const metadata: Metadata = {
	title: 'Re-up.ph',
	description: 'Simplify your life.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem>
					<Navbar />
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
