
import { API_URL } from "@/api/http";
import AuthService from "@/api/services/AuthService";
import { IUser } from "@/models/IUser";
import { ROUTES } from "@/routes/routes";
import axios from "axios";
import Error from "next/error";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";


interface UserState {
    user: IUser | null,
    users: IUser[] | null,
    isLoading: boolean,
    setIsLoading: (load: boolean) => void,
    setAuth: (param: boolean) => void,
    setUser: (user: IUser) => void,
    fetchLogin: (email: string, password: string) => Promise<boolean>,
    fetchRegistration: (name: string, last_name: string, email: string, password: string) => Promise<boolean>,
    fetchGetUser: () => void,
    logout: (redirect: (url: string) => void) => void,
    fetchGetAllUsers: () => Promise<void>
}

const useUserStore = create<UserState>()(devtools(immer((set, get) => ({
    user: null,
    users: null,
    isLoading: false,
    setAuth: (action: boolean) => set(() => ({
        isAuth: action,
    })),
    setUser: (user: IUser) => set(() => ({
        user: user,
    })),
    setIsLoading: (load: boolean) => set(() => ({
        isLoading: load,
    })),
    fetchGetAllUsers: async () => {
        try {
            const response = await AuthService.getAllUsers();
            console.log("USERS: ", response.data);
            //set({ users: response.data.values });
        } catch (error: any) {
            // Fehlerbehandlung
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    logout: async (redirect) => {
        try {
            const response = await AuthService.logout();
            console.log(response, "THIS IS ACTIVATE RESPONSE")
            localStorage.removeItem('accessToken');
            set(() => ({
                user: null,
                isAuth: false,
            }));
            redirect(ROUTES.AUTH.login);
            return response;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    fetchGetUser: () => {
        get().setIsLoading(true);
        AuthService.getUser()
            .then((response) => {
                const user = response.data.data.user;
                get().setUser(user);
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                get().setIsLoading(false);
            })
    },
    fetchLogin: async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            const newUser = response.data.data.user;
            const token = response.data.data.token;
            localStorage.setItem('accessToken', token);
            set({ user: newUser });
            return true;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    fetchRegistration: async (name: string, last_name: string, email: string, password: string) => {
        try {
            const response = await AuthService.register(name, last_name, email, password);
            return true;
        } catch (error: any) {
            console.log("ERRROR", error.message)
            throw new Error(error.response?.data?.message || error.message);
        }
    },
})), { name: 'userStore', version: 1 }))

export default useUserStore