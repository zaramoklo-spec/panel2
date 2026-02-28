import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Admin } from '@/types'
import { STORAGE_KEYS } from '@/lib/constants'

interface AuthState {
  admin: Admin | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (admin: Admin, token: string) => void
  clearAuth: () => void
  updateAdmin: (admin: Partial<Admin>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (admin, token) => set({ 
        admin, 
        token, 
        isAuthenticated: true 
      }),
      
      clearAuth: () => set({ 
        admin: null, 
        token: null, 
        isAuthenticated: false 
      }),
      
      updateAdmin: (updates) => set((state) => ({
        admin: state.admin ? { ...state.admin, ...updates } : null
      })),
    }),
    {
      name: STORAGE_KEYS.USER,
    }
  )
)
