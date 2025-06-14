import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
	HomeIcon,
	BookOpenIcon,
	CalendarIcon,
	ChatBubbleLeftRightIcon,
	UserGroupIcon,
	Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

const navigation = [
	{ name: 'Dashboard', href: '/', icon: HomeIcon },
	{ name: 'Study Groups', href: '/groups', icon: UserGroupIcon },
	{ name: 'Courses', href: '/courses', icon: BookOpenIcon },
	{ name: 'Schedule', href: '/schedule', icon: CalendarIcon },
	{ name: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
	{ name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export const Sidebar = () => {
	const location = useLocation();

	return (
		<div className='flex h-full flex-col bg-white dark:bg-surface-dark'>
			<div className='flex-1 space-y-1 px-2 py-4'>
				{navigation.map((item) => {
					const isActive = location.pathname === item.href;
					return (
						<Link
							key={item.name}
							to={item.href}
							className={clsx(
								'group flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors',
								isActive
									? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
									: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
							)}
						>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								className='mr-3 h-6 w-6'
							>
								<item.icon
									className={clsx(
										'h-6 w-6',
										isActive
											? 'text-primary-600 dark:text-primary-400'
											: 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400'
									)}
								/>
							</motion.div>
							{item.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
};
