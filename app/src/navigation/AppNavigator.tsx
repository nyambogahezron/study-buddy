import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStore } from '../store';

export default function AppNavigator() {
	const colorScheme = useColorScheme();
	const { user } = useStore();

	if (!user) {
		return (
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						display: 'none',
					},
				}}
			>
				<Tabs.Screen name='(auth)' options={{ href: null }} />
			</Tabs>
		);
	}

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
					borderTopColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
				},
				tabBarActiveTintColor: '#6B4CE6',
				tabBarInactiveTintColor: colorScheme === 'dark' ? '#9CA3AF' : '#6B7280',
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Dashboard',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='view-dashboard'
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='groups'
				options={{
					title: 'Study Groups',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='account-group'
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='courses'
				options={{
					title: 'Courses',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='book-open'
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='schedule'
				options={{
					title: 'Schedule',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='calendar' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='messages'
				options={{
					title: 'Messages',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='message' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: 'Settings',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='cog' size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
