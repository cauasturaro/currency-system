import type { User } from "../UserModel";

export interface LoginPayLoad {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}