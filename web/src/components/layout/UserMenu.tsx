import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useStore } from '@/store';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

interface UserMenuProps {
	user: {
		id: string;
		username: string;
		email: string;
		avatar?: string;
	};
}

export const UserMenu = ({ user }: UserMenuProps) => {
	const { setUser } = useStore();

	const handleLogout = () => {
		setUser(null);
	};

	return (
		<Menu as='div' className='relative'>
			<Menu.Button className='flex items-center rounded-full bg-white p-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800'>
				{user.avatar ? (
					<img
						className='h-8 w-8 rounded-full'
						src={user.avatar}
						alt={user.username}
					/>
				) : (
					<UserCircleIcon className='h-8 w-8 text-gray-400' />
				)}
			</Menu.Button>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800'>
					<div className='px-4 py-2 text-sm text-gray-700 dark:text-gray-200'>
						<p className='font-medium'>{user.username}</p>
						<p className='text-gray-500 dark:text-gray-400'>{user.email}</p>
					</div>

					<Menu.Item>
						{({ active }) => (
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className={clsx(
									active ? 'bg-gray-100 dark:bg-gray-700' : '',
									'block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200'
								)}
								onClick={handleLogout}
							>
								Sign out
							</motion.button>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
