import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

const sizeClasses = {
	sm: 'h-4 w-4',
	md: 'h-8 w-8',
	lg: 'h-12 w-12',
};

export const LoadingSpinner = ({
	size = 'md',
	className = '',
}: LoadingSpinnerProps) => {
	return (
		<div className={`flex items-center justify-center ${className}`}>
			<motion.div
				className={`${sizeClasses[size]} rounded-full border-2 border-primary-200 border-t-primary-600 dark:border-primary-800 dark:border-t-primary-400`}
				animate={{ rotate: 360 }}
				transition={{
					duration: 1,
					repeat: Infinity,
					ease: 'linear',
				}}
			/>
		</div>
	);
};

export const LoadingPage = () => {
	return (
		<div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
			<div className='text-center'>
				<LoadingSpinner size='lg' className='mb-4' />
				<p className='text-sm text-gray-600 dark:text-gray-400'>Loading...</p>
			</div>
		</div>
	);
};
