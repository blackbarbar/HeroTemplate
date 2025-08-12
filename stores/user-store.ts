import { create } from 'zustand';
import { produce } from 'immer';
import { User } from '@prisma/client';

export type UserStoreState = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user: User) =>
    set(
      produce((state: UserStoreState) => {
        state.user = user;
      })
    ),
}));
