import axios from 'axios';

import type { User } from '../models/UserModel';
import type { Payment } from '../models/PaymentModel';


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

import type { RegisterPayload } from '../models/register/registerPayLoad';

export async function registerUser(payload: RegisterPayload): Promise<User> {
    try {
        const response = await apiClient.post<User>('/users/register', payload);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Registration failed.";
            console.error("API Service Error:", errorMessage);
            throw new Error(errorMessage);
        } else {
            console.error("An unexpected error occurred:", error);
            throw new Error("An unexpected error occurred.");
        }
    }
}

import type { LoginResponse, LoginPayLoad } from '../models/login/login';

export async function loginUser(payload: LoginPayLoad): Promise<LoginResponse> {
    try {
        const response = await apiClient.post<LoginResponse>('/users/login', payload);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "Authentication failed.";
            console.error("API Service Error:", errorMessage);
            throw new Error(errorMessage);
        } else {
            console.error("An unexpected error occurred:", error);
            throw new Error("An unexpected error occurred.");
        }
    }
}
