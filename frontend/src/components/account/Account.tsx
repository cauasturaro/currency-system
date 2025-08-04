import './Account.css';
import { useEffect, useState } from 'react';
import { HideButton } from '../buttons/Buttons'; 
import { getBalanceForUser } from '../../services/apiService';

export function Account() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const [balance, setBalance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBalance = async () => {
            try {
                const userId = '1';
                const data = await getBalanceForUser(userId);
                setBalance(data)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An error ocurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadBalance();
    });

    const formattedBalance = balance.toLocaleString('en', {
        style: 'currency',
        currency: 'USD'
    });

    const toggleVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    return (
        <div className="account-div">
            <h2>{isBalanceVisible ? formattedBalance : '$ ••••••'}</h2>
            
            <HideButton 
                isVisible={isBalanceVisible}
                onToggle={toggleVisibility}
            />
        </div>
    );
}
