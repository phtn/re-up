'use client'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
	Brand,
	Container,
	MensCover,
	Menubar,
	UserTrigger,
	WomensCover,
} from './styled'
import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import '@/components/ui/styles.css'
import User from '../ user'

const Menu = () => (
	<Menubar>
		<NavigationMenu>
			<NavigationMenuList>
				<Mens />
				<Womens />
				<Kids />
				<New />
				<Customize />
				<NavigationMenuIndicator className='NavigationMenuIndicator' />
			</NavigationMenuList>
		</NavigationMenu>
	</Menubar>
)

export const Navbar = () => (
	<Container>
		<Brand>
			re-up
			<span className='font-thin text-xl text-foreground/75'>&trade;</span>
		</Brand>
		<Menu />
		<UserTrigger>
			<User />
		</UserTrigger>
	</Container>
)

const Mens = () => (
	<NavigationMenuItem>
		<NavigationMenuTrigger>MEN</NavigationMenuTrigger>
		<NavigationMenuContent className='NavigationMenuContent'>
			<ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
				<li className='row-span-3'>
					<NavigationMenuLink asChild>
						<MensCover>
							<a
								className='flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md'
								href='/'>
								<div className='mb-2 mt-4 mr-3 text-xs font-bold text-primary-foreground'>
									NEW
								</div>
							</a>
						</MensCover>
					</NavigationMenuLink>
				</li>
				<ListItem
					href='/'
					title='Outdoors'>
					Explore camping essentials.
				</ListItem>
				<ListItem
					href='/'
					title='Hygiene'>
					From hair products to your socks.
				</ListItem>
				<ListItem
					href='/'
					title='Sports'>
					Explore active gears.
				</ListItem>
			</ul>
		</NavigationMenuContent>
	</NavigationMenuItem>
)

const Womens = () => (
	<NavigationMenuItem>
		<NavigationMenuTrigger>WOMEN</NavigationMenuTrigger>
		<NavigationMenuContent className='NavigationMenuContent'>
			<ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
				<li className='row-span-3'>
					<NavigationMenuLink asChild>
						<WomensCover>
							<a
								className='flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md'
								href='/'>
								<div className='mb-2 mt-4 mr-3 text-xs font-bold text-primary-foreground'>
									NEW
								</div>
							</a>
						</WomensCover>
					</NavigationMenuLink>
				</li>
				<ListItem
					href='/'
					title='In a bag'>
					Things you didn&apos;t know you need.
				</ListItem>
				<ListItem
					href='/'
					title='Intimate Care'>
					All personal care from face to nails.
				</ListItem>
				<ListItem
					href='/'
					title='Wellness'>
					Get the right elements for your body.
				</ListItem>
			</ul>
		</NavigationMenuContent>
	</NavigationMenuItem>
)

const Kids = () => (
	<NavigationMenuItem>
		<Link
			href='/'
			legacyBehavior
			passHref>
			<NavigationMenuLink className={navigationMenuTriggerStyle()}>
				KIDS
			</NavigationMenuLink>
		</Link>
	</NavigationMenuItem>
)

const New = () => (
	<NavigationMenuItem>
		<Link
			href='/'
			legacyBehavior
			passHref>
			<NavigationMenuLink className={navigationMenuTriggerStyle()}>
				NEW
			</NavigationMenuLink>
		</Link>
	</NavigationMenuItem>
)

const Customize = () => (
	<NavigationMenuItem>
		<Link
			href='/'
			legacyBehavior
			passHref>
			<NavigationMenuLink className={navigationMenuTriggerStyle()}>
				CUSTOMIZE
			</NavigationMenuLink>
		</Link>
	</NavigationMenuItem>
)

const ListItem = forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}>
					<div className='text-md font-extrabold tracking-wide leading-none'>
						{title}
					</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	)
})
ListItem.displayName = 'ListItem'
