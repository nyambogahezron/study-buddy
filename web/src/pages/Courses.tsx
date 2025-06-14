import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store';
import { apiService } from '@/services/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Course } from '@/types/api';
import {
	BookOpenIcon,
	UserIcon,
	AcademicCapIcon,
	PlusIcon,
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

const Courses = () => {
	const { user } = useStore();
	const [courses, setCourses] = useState<Course[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		loadCourses();
	}, []);

	const loadCourses = async () => {
		try {
			setIsLoading(true);
			const data = await apiService.getCourses();
			setCourses(data);
		} catch (err) {
			setError('Failed to load courses');
		} finally {
			setIsLoading(false);
		}
	};

	const handleEnroll = async (courseId: string) => {
		try {
			await apiService.enrollInCourse(courseId);
			// Refresh courses after enrollment
			loadCourses();
		} catch (err) {
			setError('Failed to enroll in course');
		}
	};

	if (isLoading) {
		return (
			<div className='flex h-full items-center justify-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
					My Courses
				</h1>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-400'
				>
					<PlusIcon className='mr-2 h-5 w-5' />
					Add Course
				</motion.button>
			</div>

			{error && (
				<div className='rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/50 dark:text-red-400'>
					{error}
				</div>
			)}

			<motion.div
				variants={container}
				initial='hidden'
				animate='show'
				className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
			>
				{courses.map((course) => (
					<motion.div
						key={course.id}
						variants={item}
						className='overflow-hidden rounded-lg bg-white shadow dark:bg-surface-dark'
					>
						<div className='p-6'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-3'>
									<div className='rounded-full bg-primary-100 p-2 dark:bg-primary-900'>
										<BookOpenIcon className='h-6 w-6 text-primary-600 dark:text-primary-400' />
									</div>
									<h3 className='text-lg font-medium text-gray-900 dark:text-white'>
										{course.name}
									</h3>
								</div>
							</div>

							<p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
								{course.description}
							</p>

							<div className='mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400'>
								<div className='flex items-center'>
									<UserIcon className='mr-1 h-4 w-4' />
									{course.students.length} students
								</div>
								<div className='flex items-center'>
									<AcademicCapIcon className='mr-1 h-4 w-4' />
									{course.instructor.username}
								</div>
							</div>

							<div className='mt-6'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => handleEnroll(course.id)}
									className='w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-400'
								>
									Enroll Now
								</motion.button>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default Courses;
