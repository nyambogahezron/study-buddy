import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
	id: string;
	username: string;
	email: string;
	avatar?: string;
}

interface AppState {
	user: User | null;
	isDarkMode: boolean;
	isSidebarOpen: boolean;
	setUser: (user: User | null) => void;
	toggleDarkMode: () => void;
	toggleSidebar: () => void;
}

export const useStore = create<AppState>()(
	persist(
		(set) => ({
			user: null,
			isDarkMode: false,
			isSidebarOpen: true,
			setUser: (user) => set({ user }),
			toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
			toggleSidebar: () =>
				set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
		}),
		{
			name: 'study-buddy-storage',
		}
	)
);
