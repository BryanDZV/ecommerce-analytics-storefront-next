import { create } from 'zustand'

type NotificationStatus = 'initial' | 'success' | 'error'

interface NotificationStore {
    isLoading: boolean
    status: NotificationStatus
    message: string

    startLoading: () => void
    showSuccess: (message:string) => void
    showError: (message:string) => void
    reset: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    isLoading: false,
    status: 'initial',
    message: '',

    startLoading: () =>
        set({
            isLoading: true,
            status: 'initial',
            message: ''
        }),
    showSuccess: (message) =>
        set({
            isLoading:false,
            status: 'success',
            message,
        }),
    showError: (message) => 
        set({
            isLoading: false,
            status: 'error',
            message,
        }),
    reset: () =>
        set({
            isLoading: false, 
            status: 'initial',
            message: '',
        })           
}))




