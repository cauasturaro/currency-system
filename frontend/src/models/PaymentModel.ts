//import { User } from './UserModel';

interface User {
    id: number;
    name: string;
}

export interface Payment {
    id: number;
    value: string; 
    status: 'pending' | 'completed' | 'failed';
    payer: User;
    receiver: User;
    createdAt: string; 
    updatedAt: string;
}

