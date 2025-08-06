import { useState, useEffect } from 'react';
import { getPaymentHistoryForUser } from '../../services/apiService';

import type { User } from '../../models/UserModel';
import type { Payment } from '../../models/PaymentModel';

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
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
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

    const formattedBalance = (value: string) => {
        return parseFloat(value).toLocaleString('en', {
            style: 'currency',
            currency: 'USD'
        });
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
                        payments.map(payment => {
                          
                            const rowClass = payment.payer.id === 1 ? 'payer' : 'receiver';

                            return (
                                <tr key={payment.id} className={rowClass}>
                                    <td>{payment.payer.name}</td>
                                    <td>{payment.receiver.name}</td>
                                    <td>{formattedBalance(payment.value)}</td>
                                </tr>
                            );
                        })
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