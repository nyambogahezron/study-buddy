import { createStore } from 'zustand';
import { User } from '../types';

type UserStore = {
  user: User | null;
  logout: () => void;
  setUser: (user: User) => void;
};

export const useUserStore = createStore<UserStore>((set) => ({
  user: null,
  logout: () => set({ user: null }),
  setUser: (user: User) => set({ user }),
}));

export const getUser = async () => {
  const user = localStorage.getItem('user');

  if (user) {
    const parsedUser = JSON.parse(user);
    useUserStore.setState({ user: parsedUser });
  } else {
    useUserStore.setState({ user: null });
  }
};
