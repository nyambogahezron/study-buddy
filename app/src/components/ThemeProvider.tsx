import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useStore } from '../store';

const lightTheme = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
		primary: '#6B4CE6',
		secondary: '#10B981',
		background: '#F3F4F6',
		surface: '#FFFFFF',
		error: '#EF4444',
	},
};

const darkTheme = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		primary: '#8B5CF6',
		secondary: '#34D399',
		background: '#1F2937',
		surface: '#374151',
		error: '#F87171',
	},
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const systemColorScheme = useColorScheme();
	const { isDarkMode, toggleDarkMode } = useStore();

	// Sync with system theme
	useEffect(() => {
		if (systemColorScheme === 'dark' && !isDarkMode) {
			toggleDarkMode();
		} else if (systemColorScheme === 'light' && isDarkMode) {
			toggleDarkMode();
		}
	}, [systemColorScheme]);

	return (
		<PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
			{children}
		</PaperProvider>
	);
}
