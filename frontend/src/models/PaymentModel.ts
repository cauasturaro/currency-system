import type { User } from './UserModel';

export interface Payment {
    id: number;
    value: string;
    status: 'pending' | 'completed' | 'failed';
    payer: User;
    receiver: User;
    createdAt: string;
    updatedAt: string;
}