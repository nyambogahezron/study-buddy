import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
	HomeIcon,
	UserGroupIcon,
	BookOpenIcon,
	CalendarIcon,
	ChatBubbleLeftRightIcon,
	Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
	{ name: 'Dashboard', href: '/', icon: HomeIcon },
	{ name: 'Study Groups', href: '/groups', icon: UserGroupIcon },
	{ name: 'Courses', href: '/courses', icon: BookOpenIcon },
	{ name: 'Schedule', href: '/schedule', icon: CalendarIcon },
	{ name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
	{ name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function MainLayout() {
	const location = useLocation();

	return (
		<div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
			{/* Sidebar */}
			<div className='w-64 bg-white dark:bg-surface-dark'>
				<div className='flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700'>
					<h1 className='text-xl font-bold text-gray-900 dark:text-white'>
						Study Buddy
					</h1>
				</div>
				<nav className='mt-5 px-2'>
					{navigation.map((item) => {
						const isActive = location.pathname === item.href;
						return (
							<Link
								key={item.name}
								to={item.href}
								className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
									isActive
										? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
								}`}
							>
								<item.icon
									className={`mr-3 h-6 w-6 flex-shrink-0 ${
										isActive
											? 'text-primary-600 dark:text-primary-400'
											: 'text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-200'
									}`}
								/>
								{item.name}
							</Link>
						);
					})}
				</nav>
			</div>

			{/* Main content */}
			<div className='flex flex-1 flex-col overflow-hidden'>
				<main className='flex-1 overflow-y-auto p-6'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}
					>
						<Outlet />
					</motion.div>
				</main>
			</div>
		</div>
	);
}
