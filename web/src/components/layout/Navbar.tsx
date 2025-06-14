import { motion } from 'framer-motion';
import { useStore } from '@/store';
import { Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { UserMenu } from './UserMenu';

export const Navbar = () => {
	const { toggleSidebar, isDarkMode, toggleDarkMode, user } = useStore();

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className='border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-surface-dark'
		>
			<div className='flex h-16 items-center justify-between px-4'>
				<div className='flex items-center space-x-4'>
					<button
						onClick={toggleSidebar}
						className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
					>
						<Bars3Icon className='h-6 w-6' />
					</button>
					<h1 className='text-xl font-semibold text-gray-900 dark:text-white'>
						Study Buddy
					</h1>
				</div>

				<div className='flex items-center space-x-4'>
					<button
						onClick={toggleDarkMode}
						className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
					>
						{isDarkMode ? (
							<SunIcon className='h-6 w-6' />
						) : (
							<MoonIcon className='h-6 w-6' />
						)}
					</button>

					{user && <UserMenu user={user} />}
				</div>
			</div>
		</motion.nav>
	);
};
