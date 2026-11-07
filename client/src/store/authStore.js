import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as userService from '@/services/userService'

let setStore

const useAuthStore = create(
  persist(
    (set) => {
      setStore = set
      return {
        userInfo: null,
        loading: false,
        error: null,
        hasHydrated: false,

        login: async (email, password) => {
          set({ loading: true, error: null })
          try {
            const data = await userService.login(email, password)
            set({ userInfo: data, loading: false })
            return data
          } catch (err) {
            const message =
              err.response?.data?.message || err.message || 'Login failed'
            set({ error: message, loading: false })
            throw new Error(message)
          }
        },

        register: async (name, email, password) => {
          set({ loading: true, error: null })
          try {
            const data = await userService.register(name, email, password)
            set({ userInfo: data, loading: false })
            return data
          } catch (err) {
            const message =
              err.response?.data?.message || err.message || 'Register failed'
            set({ error: message, loading: false })
            throw new Error(message)
          }
        },

        updateProfile: async (payload) => {
          set({ loading: true, error: null })
          try {
            const data = await userService.updateProfile(payload)
            set((state) => ({ userInfo: { ...state.userInfo, ...data }, loading: false }))
            return data
          } catch (err) {
            const message =
              err.response?.data?.message || err.message || 'Update failed'
            set({ error: message, loading: false })
            throw new Error(message)
          }
        },

        logout: () => set({ userInfo: null, error: null }),
        clearError: () => set({ error: null }),
      }
    },
    {
      name: 'userInfo',
      partialize: (state) => ({ userInfo: state.userInfo }),
      onRehydrateStorage: () => () => {
        setStore({ hasHydrated: true })
      },
    }
  )
)

export default useAuthStore
