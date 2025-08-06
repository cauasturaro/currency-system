import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

import './Register.css';
import { registerUser } from '../../services/apiService';

export function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (password != confirmPassword) {
            setError("Passwords doesn't match");
            return;
        }

        setIsLoading(true);

        try{
            await registerUser({ name, email, password });
            navigate('/login');
        } catch (error) {
            if (error instanceof Error )
                setError(error.message);
            else
                setError("An unknown error ocurred");
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="register-main">
            <h2>Register</h2>
            <form className='registerForm' onSubmit={handleSubmit}>
                <input 
                className='text' 
                type='text' 
                placeholder='Name' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
                />
                <input 
                className='text'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input 
                className='text' 
                type='password' 
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <input 
                className='text' 
                type='password' 
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />

                {error && <p className='error-message'>{error}</p>}

                <Link to="/login" className='login-link'>Already have an account?</Link>

                <input 
                className='text' 
                type='submit' 
                value="Register"
                disabled={isLoading}
                />
            </form>
        </div>
    );
}
