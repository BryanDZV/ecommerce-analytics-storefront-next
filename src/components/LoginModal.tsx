'use client'

import FlexibleImage from '@/app/components/FlexibleImage'
import { demoLogin, demoPassword, useUserStore } from '@/store/useUserStore'
import React, { useState } from 'react'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const user = useUserStore((state) => state.user)
    const login = useUserStore((state) => state.login)
    const logout = useUserStore((state) => state.logout)

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email || !password) {
            setError('Insert email and password')
            return
        }

        if (email === demoLogin.email && password === demoPassword) {
            login(demoLogin)
            setError('')
            setEmail('')
            setPassword('')
            return
        }

        setError('Incorrect email or password')
    }

    const handleLogout = () => {
        logout()
        setEmail('')
        setPassword('')
        setError('')
    }

    return (
        <div className="loginOverlay">
            <div className="loginModal" role="dialog">
                <button 
                type="button" 
                className="loginModalClose"
                onClick={onClose}
                >
                x
                </button>

                <div className="loginImageBox">
                    <FlexibleImage
                        src="/loginImage.png"
                        alt="loginImage"
                        fill={true}
                        className="loginModalImage"
                    />
                </div>

                <div className="loginFormBox">
                    <h2 className="loginModalTitle">User Login</h2>
                    
                    {user ? (
                        <div className='loginAuthenticatedBox'>
                            <p>You are signed in as {user.email}</p>
                            <button 
                            type='button'
                            className='loginButton'
                            onClick={handleLogout}
                            >
                            Log out
                            </button>
                        </div>
                    ) : (        
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <input
                            className="loginInput" 
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="loginInput" 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p>{error}</p>}

                        <button className="loginButton" type="submit">
                            Login
                        </button>

                        <button className="loginButton2" type="button">
                            I forgot my password. Click here to reset
                        </button>

                        <button className="loginButton2" type="button">
                            Register New Account
                        </button>
                    </form>
                    )}
                </div>
            </div>
        </div>
    )
}