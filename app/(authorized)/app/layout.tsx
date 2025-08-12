'use client';

import { useUserStore } from '@/stores/user-store';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);
  const { data } = useSession();

  useEffect(() => {
    if (!data?.user) return;
    setUser(data.user);
  }, [data, setUser]);

  return <>{children}</>;
}
