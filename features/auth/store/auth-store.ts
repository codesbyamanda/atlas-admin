'use client';

import { create } from 'zustand';
import type { AuthState, User } from '../types';


// Usuário mockado para demonstração
const MOCK_USER: User = {
  id: '1',
  name: 'Admin Demo',
  email: 'admin@demo.com',
  role: 'admin',
};

// Chave para localStorage
const AUTH_STORAGE_KEY = 'admin-dashboard-auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validação simples
    if (email === 'admin@demo.com' && password === 'admin123') {
      set({ user: MOCK_USER, isAuthenticated: true });
      
      // Persiste no localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(MOCK_USER));
      
      return true;
    }

    return false;
  },

  /**
   * Logout - limpa estado e localStorage
   */
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  /**
   * Verifica autenticação ao carregar a aplicação
   * Restaura sessão do localStorage se existir
   */
  checkAuth: () => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        set({ user, isAuthenticated: true });
      } catch {
        // Se houver erro ao parsear, limpa o localStorage
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  },
}));