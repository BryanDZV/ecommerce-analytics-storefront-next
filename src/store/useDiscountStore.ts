import { create } from 'zustand'

interface DiscountCode {
    code: string
    percentage: number
}

interface DiscountStore {
    code: string
    appliedCode: string
    discountAmount: number
    errorMessage: string 
    successMessage: string

    setCode: (value: string) => void
    applyCode: (subtotal: number) => void
    resetDiscount: () => void
}

//Temporary mock data

const mockDiscountCode: DiscountCode [] = [
    {
        code: 'PRUEBA10',
        percentage: 10,
    }
]

export const useDiscountStore = create<DiscountStore>((set, get) => ({
    code: '',
    appliedCode: '',
    discountAmount: 0,
    errorMessage: '',
    successMessage: '',

    setCode: (value) =>
        set({
            code: value,
            errorMessage: '',
            successMessage: '',
        }),
    applyCode: (subtotal) => {
        const currentCode = get().code.trim()

        if (!currentCode) {
            set({
                errorMessage: 'Please enter a discount code',
                successMessage: '',
            })
            return
        }

        const matchedCode = mockDiscountCode.find(
            (item) => item.code === currentCode
        ) 
        if (!matchedCode) {
            set({
                appliedCode: '',
                discountAmount:0,
                errorMessage: 'Invalid discount code',
                successMessage: '',
            })
            return
        }

        const calculateDiscount = subtotal * (matchedCode.percentage / 100)

        set({
            appliedCode: matchedCode.code,
            discountAmount: Number(calculateDiscount.toFixed(2)),
            errorMessage: '',
            successMessage: 'Discount code applied successfully',
        })
    },
    
    resetDiscount: () =>
        set({
            code:'',
            appliedCode: '',
            discountAmount: 0, 
            errorMessage: '',
            successMessage: '',
        }),
}))