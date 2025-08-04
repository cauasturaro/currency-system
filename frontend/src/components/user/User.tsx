import './User.css';
import { useState } from 'react';
import { HideButton } from '../buttons/Buttons'; 

export function User() {
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const username = "Cauã Sturaro"

    const balance = 26266.73;
    const formattedBalance = balance.toLocaleString('en', {
        style: 'currency',
        currency: 'USD'
    });

    const toggleVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    return (
        <div className="user-div">
            <img src="/images/user.png" alt="profile picture" />

            <h2>Olá, {username}!</h2>
        </div>
    );
}
