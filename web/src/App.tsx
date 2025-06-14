import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingPage } from '@/components/LoadingSpinner';
import { useStore } from '@/store';
import { apiService } from '@/services/api';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import MainLayout from './Layouts/mainLayout';

const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const StudyGroups = React.lazy(() => import('@/pages/StudyGroups'));
const Courses = React.lazy(() => import('@/pages/Courses'));
const Schedule = React.lazy(() => import('@/pages/Schedule'));
const Messages = React.lazy(() => import('@/pages/Messages'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const Login = React.lazy(() => import('@/pages/Login'));
const Register = React.lazy(() => import('@/pages/Register'));

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, setUser } = useStore();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = localStorage.getItem('token');
				if (token && !user) {
					const response = await apiService.getCurrentUser();
					setUser(response.user);
				}
			} catch {
				localStorage.removeItem('token');
			}
		};

		checkAuth();
	}, [user, setUser]);

	if (!user) {
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
	<ErrorBoundary>
		<Suspense fallback={<LoadingPage />}>{children}</Suspense>
	</ErrorBoundary>
);

export const App = () => {
	return (
		<Router>
			<AnimatePresence mode='wait'>
				<Routes>
					{/* Public routes */}
					<Route
						path='/login'
						element={
							<PageWrapper>
								<Login />
							</PageWrapper>
						}
					/>
					<Route
						path='/register'
						element={
							<PageWrapper>
								<Register />
							</PageWrapper>
						}
					/>

					{/* Protected routes */}
					<Route
						path='/'
						element={
							<PrivateRoute>
								<MainLayout />
							</PrivateRoute>
						}
					>
						<Route
							index
							element={
								<PageWrapper>
									<Dashboard />
								</PageWrapper>
							}
						/>
						<Route
							path='groups'
							element={
								<PageWrapper>
									<StudyGroups />
								</PageWrapper>
							}
						/>
						<Route
							path='courses'
							element={
								<PageWrapper>
									<Courses />
								</PageWrapper>
							}
						/>
						<Route
							path='schedule'
							element={
								<PageWrapper>
									<Schedule />
								</PageWrapper>
							}
						/>
						<Route
							path='messages'
							element={
								<PageWrapper>
									<Messages />
								</PageWrapper>
							}
						/>
						<Route
							path='settings'
							element={
								<PageWrapper>
									<Settings />
								</PageWrapper>
							}
						/>
					</Route>
				</Routes>
			</AnimatePresence>
		</Router>
	);
};
