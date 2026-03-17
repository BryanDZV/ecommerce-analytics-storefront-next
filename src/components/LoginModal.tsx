import FlexibleImage from '@/app/components/FlexibleImage'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {

    if (!isOpen) return null

    return (
        <div className="loginOverlay">
            <div className="loginModal">
                <button 
                type="button" 
                className="loginModalClose"
                onClick={onClose}
                >
                x
                </button>

                <div className="loginImageBox">
                    <FlexibleImage
                        src="/login-image.png"
                        alt="login-image"
                        fill={true}
                        className="loginModalImage"
                    />
                </div>

                <div className="loginFormBox">
                    <h2 className="loginModalTittle">User Login</h2>
                    <form className="loginForm">
                        <input
                            className="loginInput" 
                            type="email"
                            placeholder="Username"
                        />
                        <input
                            className="loginInput" 
                            type="password" 
                            placeholder="Password"
                        />

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
                </div>
            </div>
        </div>
    )
}