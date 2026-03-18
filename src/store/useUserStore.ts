import { create } from'zustand'
import type { User } from '../types/user'
import { persist } from 'zustand/middleware'
interface UserStore {
    user: User | null
    login: (data: User) => void
    logout: () => void
}

export const demoLogin: User = {
    id: '1',
    name: 'demouser',
    email: 'demouser@globant.com',
}

export const demoPassword = 'demo1234'

export const useUserStore  = create<UserStore>() (
    persist(
        (set) => ({
            user:null,

            login: (data) =>
                set({
                    user: data,
                }),

            logout: () =>
                set({
                    user: null,
                }),   
        }),
        {
            name: 'user-storage',
        }
    )
)



