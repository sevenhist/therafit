import { IUser } from "./IUser";

export interface RegisterResponse {
    token: string,
    user: IUser,
    message: string
}