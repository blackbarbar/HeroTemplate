import { useUserStore } from '@/stores/user-store';

export function useRequiredUser() {
  const user = useUserStore((state) => state.user);
  if (!user) {
    throw new Error('User must be set, but was null');
  }
  return user;
}
