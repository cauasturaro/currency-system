import { useState, useEffect } from 'react';
import { getPaymentHistoryForUser } from '../../services/apiService';
//import { Payment } from '../../models/PaymentModel';

interface User {
    id: number;
    name: string;
}

interface Payment {
    id: number;
    value: string; 
    status: 'pending' | 'completed' | 'failed';
    payer: User;
    receiver: User;
    createdAt: string; 
    updatedAt: string;
}

import './History.css';

export function History() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const userId = '1'; 
                const data = await getPaymentHistoryForUser(userId);
                setPayments(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadHistory();
    }, []); 
    if (isLoading) {
        return <div className="history-status">Loading history...</div>;
    }

    if (error) {
        return <div className="history-status error">Error: {error}</div>;
    }

    const formatCurrency = (value: string) => {
            return `$${parseFloat(value).toFixed(2)}`;
    };

    return (
        <div className="history">
            <table>
                <thead>
                    <tr>
                        <th>Payer</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length > 0 ? (
                        payments.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.payer.name}</td>
                                <td>{payment.receiver.name}</td>
                                <td>{formatCurrency(payment.value)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}