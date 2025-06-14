import { Stack } from 'expo-router';
import { ThemeProvider } from '../components/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<Stack
					screenOptions={{
						headerShown: false,
						animation: 'slide_from_right',
					}}
				>
					<Stack.Screen name='(auth)' options={{ headerShown: false }} />
					<Stack.Screen name='(app)' options={{ headerShown: false }} />
				</Stack>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
