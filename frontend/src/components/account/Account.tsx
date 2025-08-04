import './Account.css';
import { useState } from 'react';
import { HideButton } from '../buttons/Buttons'; 

export function Account() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const balance = 26266.73;
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
