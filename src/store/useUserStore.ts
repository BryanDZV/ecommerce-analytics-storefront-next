import { create } from'zustand'
import type { User } from '../types/user'

interface UserStore {
    user: User | null
    login: (data: User) => void
    logout: () => void
}

const demoLogin: User = {
    id: '1',
    name: 'user1',
    email: 'user1@globant.com'
}

export const useUserStore  = create<UserStore>((set) => ({
    user: null,

    login: (data) => 
        set({
            user: data,
        }),

    logout: () =>
        set({
            user: null,
        })    
}))



