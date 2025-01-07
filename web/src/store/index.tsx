
// rooms data store and actions

import { createStore } from 'zustand';
import { Room } from '../types';

type RoomStore = {
  rooms: Room[];
  addRoom: (room: Room) => void;
  removeRoom: (roomId: number) => void;
};

export const useRoomStore = createStore<RoomStore>((set) => ({
  rooms: [],
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  removeRoom: (roomId) =>
    set((state) => ({
      rooms: state.rooms.filter((room) => room.id !== roomId),
    })),
});
