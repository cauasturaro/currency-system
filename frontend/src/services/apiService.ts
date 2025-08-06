import axios from 'axios';
// import { Payment } from '../models/PaymentModel';

interface User {
    id: number;
    name: string;
    balance: number
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

export async function getBalanceForUser(userId: string): Promise<number> {
    try {
        const response = await apiClient.get<{balance : number}>(`/users/${userId}/balance`);
        return response.data.balance;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Failed to fetch user balance.";
            console.error("API Service Error:", errorMessage);
            throw new Error(errorMessage);
        } else {
            console.error("An error occurred:", error);
            throw new Error("An error occurred.");
        }
    }
}

export async function getNameForUser(userId: string): Promise<string> {
    try {
        const response = await apiClient.get<{name : string}>(`/users/${userId}`);
        return response.data.name;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Failed to fetch for user name.";
            console.error("API Service Error:", errorMessage);
            throw new Error(errorMessage);
        } else {
            console.error("An error occurred:", error);
            throw new Error("An error occurred.");
        }
    }
}