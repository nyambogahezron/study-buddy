import { motion } from 'framer-motion';
import { useStore } from '@/store';
import {
	AcademicCapIcon,
	ClockIcon,
	UserGroupIcon,
	BookOpenIcon,
} from '@heroicons/react/24/outline';

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

const stats = [
	{
		name: 'Active Courses',
		value: '4',
		icon: BookOpenIcon,
		color: 'bg-blue-500',
	},
	{
		name: 'Study Groups',
		value: '3',
		icon: UserGroupIcon,
		color: 'bg-green-500',
	},
	{
		name: 'Study Hours',
		value: '12h',
		icon: ClockIcon,
		color: 'bg-purple-500',
	},
	{
		name: 'Assignments Due',
		value: '2',
		icon: AcademicCapIcon,
		color: 'bg-yellow-500',
	},
];

const Dashboard = () => {
	const { user } = useStore();

	return (
		<div className='space-y-6'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className='flex items-center justify-between'
			>
				<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
					Welcome back, {user?.username}!
				</h1>
			</motion.div>

			<motion.div
				variants={container}
				initial='hidden'
				animate='show'
				className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
			>
				{stats.map((stat) => (
					<motion.div
						key={stat.name}
						variants={item}
						className='overflow-hidden rounded-lg bg-white shadow dark:bg-surface-dark'
					>
						<div className='p-5'>
							<div className='flex items-center'>
								<div className={`rounded-md p-3 ${stat.color}`}>
									<stat.icon className='h-6 w-6 text-white' />
								</div>
								<div className='ml-5'>
									<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
										{stat.name}
									</p>
									<p className='text-2xl font-semibold text-gray-900 dark:text-white'>
										{stat.value}
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>

			<motion.div
				variants={container}
				initial='hidden'
				animate='show'
				className='grid grid-cols-1 gap-6 lg:grid-cols-2'
			>
				<motion.div
					variants={item}
					className='rounded-lg bg-white p-6 shadow dark:bg-surface-dark'
				>
					<h2 className='text-lg font-medium text-gray-900 dark:text-white'>
						Upcoming Study Sessions
					</h2>
					<div className='mt-4 space-y-4'>
						{/* Add study session list here */}
						<p className='text-gray-500 dark:text-gray-400'>
							No upcoming study sessions
						</p>
					</div>
				</motion.div>

				<motion.div
					variants={item}
					className='rounded-lg bg-white p-6 shadow dark:bg-surface-dark'
				>
					<h2 className='text-lg font-medium text-gray-900 dark:text-white'>
						Recent Activity
					</h2>
					<div className='mt-4 space-y-4'>
						{/* Add activity feed here */}
						<p className='text-gray-500 dark:text-gray-400'>
							No recent activity
						</p>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Dashboard;
