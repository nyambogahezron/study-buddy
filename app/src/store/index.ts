import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
	id: string;
	username: string;
	email: string;
	avatar?: string;
}

interface AppState {
	user: User | null;
	isDarkMode: boolean;
	setUser: (user: User | null) => void;
	toggleDarkMode: () => void;
	logout: () => void;
}

export const useStore = create<AppState>()(
	persist(
		(set) => ({
			user: null,
			isDarkMode: false,
			setUser: (user) => set({ user }),
			toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
			logout: () => set({ user: null }),
		}),
		{
			name: 'study-buddy-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
