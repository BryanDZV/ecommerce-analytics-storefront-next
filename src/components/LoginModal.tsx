'use client'

import FlexibleImage from '@/app/components/FlexibleImage'
import { demoLogin, demoPassword, useUserStore } from '@/store/useUserStore'
import React, { useState } from 'react'
import {z} from 'zod'
import { sileo } from 'sileo'
import { useNotificationStore } from '@/store/useNotificationStore'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

const loginSchema = z.object({
    email: z.string().email('Enter valid email'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
})

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [authError, setAuthError] = useState('')

    const user = useUserStore((state) => state.user)
    const login = useUserStore((state) => state.login)
    const logout = useUserStore((state) => state.logout)

    const startLoading = useNotificationStore((state) => state.startLoading)
    const showSuccess = useNotificationStore((state) => state.showSuccess)
    const showError = useNotificationStore((state) => state.showError) 
    const reset = useNotificationStore((state) => state.reset)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        reset()
        setEmailError('')
        setPasswordError('')
        setAuthError('')

        const result = loginSchema.safeParse({ email, password })

        if (!email.trim()&& !password.trim()) {
            setAuthError('Email and password are required')
            return
        }

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                if (issue.path[0] === 'email'){
                    setEmailError(issue.message)
                }
                if (issue.path[0] === 'password') {
                    setPasswordError(issue.message)
                }
            })
            return
        }

        startLoading()

        await new Promise((resolve) => setTimeout(resolve, 600))

        if (email === demoLogin.email && password === demoPassword) {
            login(demoLogin)

            const message = 'Login successful'
            showSuccess(message)

            sileo.success({title: message})

            setEmail('')
            setPassword('')
            setEmailError('')
            setPasswordError('')
            setAuthError('')

            onClose()
            return
        }

        const message = 'Incorrect email or password'
        setAuthError(message)
        showError(message)
    }

    const handleLogout = () => {
        logout()
        reset()
        sileo.success({title: 'Logged out'})
        onClose()
    }

    return (
        <div className="loginOverlay">
            <div className="loginModal" role="dialog">
                <button type="button" className="loginModalClose"onClick={onClose}> x </button>

                <div className="loginImageBox">
                    <FlexibleImage
                        src="/login.png"
                        alt="loginImage"
                        fill={true}
                        className="loginModalImage"
                    />
                </div>

                <div className="loginFormBox">
                    <h2 className="loginModalTitle">Sign up</h2>
                    
                    {user ? (
                        <div className='loginAuthenticatedBox'>
                            <p>You are signed in as {user.email}</p>
                            <button type='button'className='loginButton'onClick={handleLogout}> Log out </button>
                        </div>
                    ) : (        
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <input
                            className="loginInput" 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />   
                        <input
                            className="loginInput" 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />

                        {emailError && <p className='loginError'>{emailError}</p>} 
                        {passwordError && <p className='loginError'>{passwordError}</p>} 
                        {authError && <p className='loginError'>{authError}</p>} 

                        <button className="loginButton" type="submit"> Login </button>

                        <button className="loginButton2" type="button"> I forgot my password. Click here to reset </button>

                        <button className="loginButton2" type="button"> Register New Account </button>
                    </form>
                    )}
                </div>
            </div>
        </div>
    )
}    
