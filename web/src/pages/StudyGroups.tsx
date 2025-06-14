import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store';
import { apiService } from '@/services/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { StudyGroup, Message } from '@/types/api';
import {
	PlusIcon,
	UserGroupIcon,
	ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const StudyGroups = () => {
	const { user } = useStore();
	const [groups, setGroups] = useState<StudyGroup[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		loadGroups();
	}, []);

	useEffect(() => {
		if (selectedGroup) {
			loadMessages(selectedGroup.id);
		}
	}, [selectedGroup]);

	const loadGroups = async () => {
		try {
			setIsLoading(true);
			const data = await apiService.getStudyGroups();
			setGroups(data);
			if (data.length > 0) {
				setSelectedGroup(data[0]);
			}
		} catch (err) {
			setError('Failed to load study groups');
		} finally {
			setIsLoading(false);
		}
	};

	const loadMessages = async (groupId: string) => {
		try {
			const data = await apiService.getMessages(groupId);
			setMessages(data);
			scrollToBottom();
		} catch (err) {
			setError('Failed to load messages');
		}
	};

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newMessage.trim() || !selectedGroup) return;

		try {
			const message = await apiService.sendMessage(
				selectedGroup.id,
				newMessage
			);
			setMessages((prev) => [...prev, message]);
			setNewMessage('');
			scrollToBottom();
		} catch (err) {
			setError('Failed to send message');
		}
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	if (isLoading) {
		return (
			<div className='flex h-full items-center justify-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	return (
		<div className='flex h-full'>
			{/* Groups Sidebar */}
			<div className='w-64 border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-surface-dark'>
				<div className='mb-4 flex items-center justify-between'>
					<h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
						Study Groups
					</h2>
					<motion.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className='rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
					>
						<PlusIcon className='h-5 w-5' />
					</motion.button>
				</div>

				<div className='space-y-2'>
					{groups.map((group) => (
						<motion.button
							key={group.id}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => setSelectedGroup(group)}
							className={`flex w-full items-center space-x-3 rounded-lg p-3 text-left ${
								selectedGroup?.id === group.id
									? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
									: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
							}`}
						>
							<UserGroupIcon className='h-5 w-5' />
							<div>
								<p className='font-medium'>{group.name}</p>
								<p className='text-sm text-gray-500 dark:text-gray-400'>
									{group.members.length} members
								</p>
							</div>
						</motion.button>
					))}
				</div>
			</div>

			{/* Chat Area */}
			<div className='flex flex-1 flex-col'>
				{selectedGroup ? (
					<>
						{/* Chat Header */}
						<div className='border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-surface-dark'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								{selectedGroup.name}
							</h3>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								{selectedGroup.description}
							</p>
						</div>

						{/* Messages */}
						<div className='flex-1 overflow-y-auto p-4'>
							<AnimatePresence>
								{messages.map((message) => (
									<motion.div
										key={message.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										className={`mb-4 flex ${
											message.sender.id === user?.id
												? 'justify-end'
												: 'justify-start'
										}`}
									>
										<div
											className={`max-w-[70%] rounded-lg p-3 ${
												message.sender.id === user?.id
													? 'bg-primary-600 text-white'
													: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
											}`}
										>
											<div className='mb-1 text-sm font-medium'>
												{message.sender.username}
											</div>
											<p>{message.content}</p>
											<div className='mt-1 text-xs opacity-70'>
												{new Date(message.createdAt).toLocaleTimeString()}
											</div>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
							<div ref={messagesEndRef} />
						</div>

						{/* Message Input */}
						<form
							onSubmit={handleSendMessage}
							className='border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-surface-dark'
						>
							<div className='flex space-x-4'>
								<input
									type='text'
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder='Type a message...'
									className='flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
								/>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									type='submit'
									className='rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-400'
								>
									<ChatBubbleLeftRightIcon className='h-5 w-5' />
								</motion.button>
							</div>
						</form>
					</>
				) : (
					<div className='flex h-full items-center justify-center text-gray-500 dark:text-gray-400'>
						Select a study group to start chatting
					</div>
				)}
			</div>
		</div>
	);
};

export default StudyGroups;
