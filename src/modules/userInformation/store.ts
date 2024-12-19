import $api from "@/http";
import { ROUTES } from "@/routes/routes";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
import Error from "next/error";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface IUser {
    email: string;
    id: number;
    birth_date: Date;
    createdAt: Date;
    ActivationLinkId: null;
    RefreshTokenId: null;
    currentWeight: number;
    first_name: string;
    gender: string;
    height: number;
    isVerified: boolean;
    last_name: string;
    targetWeight: number;
    updatedAt: Date;
    // name: string;
    // last_name: string;
}

interface UserState {
    user: IUser | null,
    users: IUser[] | null,
    isLoading: boolean,
    setIsLoading: (load: boolean) => void,
    setAuth: (param: boolean) => void,
    setUser: (user: IUser) => void,
    fetchLogin: (email: string, password: string) => Promise<boolean>,
    fetchRegistration: (name: string, last_name: string, email: string, password: string) => Promise<boolean>,
    fetchRefreshAccessToken: () => Promise<void>,
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
            const token = localStorage.getItem("accessToken");
            const response = await axios.get("http://localhost:3001/api/auth/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("USERS: ", response.data);
            set({ users: response.data.values });
        } catch (error: any) {
            // Fehlerbehandlung
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    logout: async (redirect) => {
        try {
            const response = await axios.post("http://localhost:3001/api/auth/logout", {}, {
                withCredentials: true
            });
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
    fetchRefreshAccessToken: async () => {
        try {
            const response = await axios.post("http://localhost:3001/api/auth/refreshAccessToken", {}, {
                withCredentials: true
            });
            // Handle successful login
            console.log(response.data.data)
            const token = response.data.data.token;
            get().setAuth(true)
            localStorage.setItem('accessToken', token);
        } catch (error: any) {
            console.log(error.response?.data?.message || error.message);
        }
    },
    fetchGetUser: () => {
        get().setIsLoading(true);
        $api.get("/auth/getuser")
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
        // Handle successful login
        //get().setAuth(true)
    },
    fetchLogin: async (email: string, password: string) => {
        try {
            const response = await axios.post("http://localhost:3001/api/auth/login", {
                email,
                password,
            }, {
                withCredentials: true
            });
            // Handle successful login
            const newUser = response.data.data.user;
            const token = response.data.data.token;
            console.log("INFO: ", response.data.data);
            //set({ message: response.data.values.message });
            localStorage.setItem('accessToken', token);
            //get().fetchGetAllUsers()
            set({ user: newUser });

            console.log("THIS IS COOKE", document.cookie)
            return true;

        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message);
        }
    },
    fetchRegistration: async (name: string, last_name: string, email: string, password: string) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/register",
                {
                    first_name: name,
                    last_name: last_name,
                    email: email,
                    password: password,
                }, {
                withCredentials: true
            }
            );
            //console.log("THIS IS AFTER REGISTER: ", response.data.data)
            //console.log("new user: ", response.data.data.user)
            //const newUser = response.data.data.user;
            //const token = response.data.data.token;
            //localStorage.setItem('accessToken', token);

            //get().setAuth(true)
            //get().fetchGetAllUsers()

            //set({ user: newUser })
            return true;
        } catch (error: any) {
            console.log("ERRROR", error.message)
            throw new Error(error.response?.data?.message || error.message);
        }
    },
})), { name: 'userStore', version: 1 }))

export default useUserStore