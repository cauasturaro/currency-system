import axios from 'axios';
// import { Payment } from '../models/PaymentModel';

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

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    }
});


export async function getPaymentHistoryForUser(userId: string): Promise<Payment[]> {
    try {
        const response = await apiClient.get<Payment[]>(`/users/${userId}/payments`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Failed to fetch payment history.";
            console.error("API Service Error:", errorMessage);
            throw new Error(errorMessage);
        } else {
            console.error("An error occurred:", error);
            throw new Error("An error occurred.");
        }
    }
}
