import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

import { loginUser } from '../../services/apiService';

import './Login.css';

export function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try{
            const response = await loginUser({ email, password });
            // FAZER UM SAVE DO TOKEN MAIS TARDE PARA ACESSOS FUTUROS NA PÁGINA
            navigate('/home');
        } catch (error) {
            if (error instanceof Error )
                setError(error.message);
            else
                setError("An unknown error ocurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="login-main"> 
            <h2>Login</h2>
            <form className='loginForm' onSubmit={handleSubmit}>
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

                {error && <p className='error-message'>{error}</p>}

                <Link to="/register" className='register-link'>Don't have an account?</Link>

                <input 
                    className='submit' 
                    type='submit' 
                    value={isLoading ? "Logging in..." : "Login"}
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}