import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, Input } from 'reactstrap';
import { message } from 'antd';
import userService from '../../services/userService';
import './Login.css';
import signin from './login.webp';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLockedOut, setIsLockedOut] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);
    const MAX_FAILED_ATTEMPTS = 5;      // Maximum allowed failed attempts
    const LOCKOUT_DURATION = 30000;     // Lockout duration in milliseconds (30 seconds)
    const [isCodeSent, setIscodeSent] = useState(false);
    const [verificationcode, setVerificationCode] = useState('');
    const [role, setRole] = useState('');
    const Navigate = useNavigate();

    const handleCodeChange = (event) => {
        setVerificationCode(event.target.value);
    }

    const verifycode = (e) => {
        e.preventDefault();

        if (!verificationcode) {
            message.warning('Enter Verification Code');
            return;
        }
        const storeCode = localStorage.getItem('verificationCode')

        if (verificationcode === storeCode) {
            message.success('Verification code is correct');
            localStorage.setItem('token', token);
            Navigate('/');
        } else {
            message.error('Invalid verification Code');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const generatedCode = Math.floor(1000 + Math.random() * 9000);
        localStorage.setItem('verificationCode', generatedCode.toString());

        if (isLockedOut) {
            message.error('Account is locked due to too many failed attempts. Try again later.');
            return;
        }

        userService.login({ email, password, generatedCode })
            .then(response => {
                setUser(response.data.user);  // Save user data
                window.localStorage.setItem('user', JSON.stringify(response.data.user));  // Save to localStorage
                window.localStorage.setItem('token', response.data.token);  // Save token

                if (response.data.role === 'Admin') {
                    Navigate('/admin');
                } else {
                    setIscodeSent(true);
                    setToken(response.data.token);
                    message.success('Verification code has been sent to your email');
                }

                // Reset failed attempts
                setFailedAttempts(0);
            })
            .catch(err => {
                setFailedAttempts(prevAttempts => {
                    const newAttempts = prevAttempts + 1;
                    if (newAttempts >= MAX_FAILED_ATTEMPTS) {
                        setIsLockedOut(true);
                        setTimeout(() => {
                            setIsLockedOut(false);
                            setFailedAttempts(0);
                        }, LOCKOUT_DURATION);
                    }
                    return newAttempts;
                });
                message.error(err.response.data.err);
            });
    };

    return (
        <>
            {!isCodeSent ? (
                <div className='main-login'>
                    <div className='login-contain'>
                        <div className='left-side'>
                            <div className='img-contain'>
                                <img src={signin} alt='' />
                            </div>
                        </div>

                        <div className='right-side'>
                            <h2>Sign in</h2>
                            <form onSubmit={handleSubmit}>
                                <Label for="username">Email</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter your Email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Label for="Password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    type={showPassword ? 'text' : 'password'} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <div className="show-password">
                                    <Input
                                        type="checkbox"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={(e) => setShowPassword(e.target.checked)}
                                    />
                                    <Label for="showPassword">Show Password</Label>
                                </div>
                                <Button type='submit' id="submit-btn">
                                    Login
                                </Button>
                            </form>
                            <div className='footer-login'>
                                <p>Not registered yet? <Link to='/register'>Click here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="verify-code-container">
                    <h2>Enter Verification Code</h2>
                    <form onSubmit={verifycode}>
                        <input 
                            type='text'
                            id='verificationCode'
                            value={verificationcode}
                            onChange={handleCodeChange}
                            required
                        />
                        <button type='submit'>Verify Code</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default Login;