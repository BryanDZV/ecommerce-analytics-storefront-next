import { create } from 'zustand'
import { discountCodes } from '@/mocks/mockDiscounts'

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

        const matchedCode = discountCodes.find(
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

        let calculateDiscount = 0

        if (matchedCode.type === 'percentage') {
            calculateDiscount = subtotal * (matchedCode.value / 100)
        }

        if (matchedCode.type === 'fixed') {
            calculateDiscount = matchedCode.value
        }

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