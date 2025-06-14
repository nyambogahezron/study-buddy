import { useState } from 'react';
import { motion } from 'framer-motion';
import {
	CalendarIcon,
	ClockIcon,
	UserGroupIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';

interface StudySession {
	id: string;
	title: string;
	startTime: string;
	endTime: string;
	group: string;
	participants: number;
}

const mockSessions: StudySession[] = [
	{
		id: '1',
		title: 'Math Study Group',
		startTime: '2024-03-20T10:00:00',
		endTime: '2024-03-20T12:00:00',
		group: 'Calculus Group',
		participants: 4,
	},
	{
		id: '2',
		title: 'Physics Review',
		startTime: '2024-03-21T14:00:00',
		endTime: '2024-03-21T16:00:00',
		group: 'Physics Group',
		participants: 3,
	},
];

const Schedule = () => {
	const [selectedDate] = useState(new Date());
	const [sessions] = useState<StudySession[]>(mockSessions);

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const formatTime = (timeString: string) => {
		return new Date(timeString).toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
		});
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Study Schedule
					</h1>
					<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
						{formatDate(selectedDate)}
					</p>
				</div>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-400'
				>
					<PlusIcon className='mr-2 h-5 w-5' />
					Schedule Session
				</motion.button>
			</div>

			<div className='grid gap-6 lg:grid-cols-2'>
				{/* Calendar View */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className='rounded-lg bg-white p-6 shadow dark:bg-surface-dark'
				>
					<h2 className='mb-4 text-lg font-medium text-gray-900 dark:text-white'>
						Calendar
					</h2>
					<div className='aspect-square rounded-lg border border-gray-200 dark:border-gray-700'>
						{/* TODO: Implement calendar component */}
						<div className='flex h-full items-center justify-center text-gray-500 dark:text-gray-400'>
							Calendar View Coming Soon
						</div>
					</div>
				</motion.div>

				{/* Upcoming Sessions */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					className='space-y-4'
				>
					<h2 className='text-lg font-medium text-gray-900 dark:text-white'>
						Upcoming Sessions
					</h2>
					{sessions.map((session) => (
						<motion.div
							key={session.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className='rounded-lg bg-white p-4 shadow dark:bg-surface-dark'
						>
							<div className='flex items-start justify-between'>
								<div>
									<h3 className='font-medium text-gray-900 dark:text-white'>
										{session.title}
									</h3>
									<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
										{session.group}
									</p>
								</div>
								<div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
									<UserGroupIcon className='h-4 w-4' />
									<span>{session.participants}</span>
								</div>
							</div>
							<div className='mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400'>
								<div className='flex items-center'>
									<CalendarIcon className='mr-1 h-4 w-4' />
									{new Date(session.startTime).toLocaleDateString()}
								</div>
								<div className='flex items-center'>
									<ClockIcon className='mr-1 h-4 w-4' />
									{formatTime(session.startTime)} -{' '}
									{formatTime(session.endTime)}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default Schedule;
