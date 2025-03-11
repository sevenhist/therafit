
import { API_URL } from "@/api/http";
import AuthService from "@/api/services/AuthService";
import { IUser } from "@/models/IUser";
import { ROUTES } from "@/routes/routes";
import { toast } from "react-toastify";
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
    setUser: (user: IUser | null) => void,
    fetchLogin: (email: string, password: string) => Promise<void>,
    fetchRegistration: (name: string, last_name: string, email: string, password: string) => Promise<void>,
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
    setUser: (user: IUser | null) => set(() => ({
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
            //console.log(response, "THIS IS ACTIVATE RESPONSE")
            localStorage.removeItem('accessToken');
            set(() => ({
                user: null,
                isAuth: false,
            }));
            redirect(ROUTES.AUTH.login);
            toast("Success Logout", {
                type: "success"
            });
            return response;
        } catch (error: any) {
            toast(error.response?.data?.message, {
                type: "error"
            });
        }
    },
    fetchGetUser: () => {
        get().setIsLoading(true);
        AuthService.getUser()
            .then((response) => {
                const user = response.data.data.user;
                get().setUser(user);
                toast("You are logged in", {
                    type: "success"
                });
            }) // then wird nur dannn funktioniert wenn keine fehler war, sondern wenn status code 200, 201, 202 erfolgreich ist
            .catch((e) => {
                //console.log(e)
                get().setUser(null)
                toast(e.response?.data?.message, {
                    type: "warning"
                }); // wenn fehler in user gibt dann wird user nicht geändert sondern user: null
            })
            .finally(() => {
                get().setIsLoading(false);
            })
    },
    fetchLogin: async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            //console.log("THIS IS RESPONSE ON LOGIN: ", response)
            const newUser = response.data.data.user;
            const token = response.data.data.token;
            localStorage.setItem('accessToken', token);
            set({ user: newUser });
            toast("Success Login", {
                type: "success"
            });
        } catch (error: any) {
            //console.log("THIS IS RESPONSE ON LOGIN: ", error)
            toast(error.response?.data?.message, {
                type: "error"
            });
        }
    },
    fetchRegistration: async (name: string, last_name: string, email: string, password: string) => {
        try {
            const response = await AuthService.register(name, last_name, email, password);
            toast("Success Registration", {
                type: "success"
            });
        } catch (error: any) {
            toast(error.response?.data?.message || error.message, {
                type: "error"
            });
        }
    },
})), { name: 'userStore', version: 1 }))

export default useUserStore