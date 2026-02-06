'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/features/auth';

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Título da página - centralizado no mobile */}
        <div className="flex-1 flex justify-center lg:justify-start lg:ml-0">
          <h1 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Bem-vindo de volta
          </h1>
        </div>

        {/* Actions - Card unificado */}
        <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border bg-background/50 px-2.5 sm:px-3 py-2 hover:bg-muted/30 hover:border-border-strong transition-all duration-200">
          {/* User info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden sm:block text-sm leading-tight">
              <p className="font-semibold truncate max-w-[150px]">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">{user?.email}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-border" />

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="
              flex items-center justify-center gap-2 
              px-2.5 sm:px-3 py-1.5 rounded-lg
              text-sm font-medium text-muted-foreground
              hover:bg-destructive/10 hover:text-destructive
              transition-all duration-200
            "
            aria-label="Sair"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}