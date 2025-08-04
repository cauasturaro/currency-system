import './User.css';
import { useState } from 'react';
import { HideButton } from '../buttons/Buttons'; 

export function User() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const balance = 26266.73;
    const formattedBalance = balance.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const toggleVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    return (
        <div className="user-div">
            <img src="/images/user.png" alt="profile picture" />

            <h2>{isBalanceVisible ? formattedBalance : 'R$ ••••••'}</h2>
            
            <HideButton 
                isVisible={isBalanceVisible}
                onToggle={toggleVisibility}
            />
        </div>
    );
}
