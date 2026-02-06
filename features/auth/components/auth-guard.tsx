'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/auth-store';


interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    // Verifica se há sessão salva no localStorage
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Se não autenticado após verificação, redireciona
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Mostra children apenas se autenticado
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}