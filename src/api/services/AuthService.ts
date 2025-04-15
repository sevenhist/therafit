import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "@/models/AuthResponse";
import { UserResponse } from "@/models/UserResponse";
import { RegisterResponse } from "@/models/RegisterResponse";
import { IUser } from "@/models/IUser";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AxiosResponse<AuthResponse>>> {
        return $api.post('/auth/login', {email, password}); //endpoint
    }
    static async logout(): Promise<void> {
        return $api.post('/auth/logout');
    }
    static async getUser(): Promise<AxiosResponse<AxiosResponse<UserResponse>>> {
        return $api.get("/auth/getuser");
    } 
    static async register(first_name: string, last_name: string, email: string, password: string): Promise<AxiosResponse<AxiosResponse<RegisterResponse>>> {
        return $api.post('/auth/register', {first_name, last_name, email, password});
    }
    static async getAllUsers(): Promise<any> {
        return $api.get('/auth/users');
    }
    static async changePassword(currentPassword: string, newPassword: string): Promise<AxiosResponse> {
        return $api.post('/auth/change-password', { currentPassword, newPassword });
    }
}