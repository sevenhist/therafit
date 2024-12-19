'use client'
import useUserStore from "@/modules/userInformation/store";
import { ROUTES } from "@/routes/routes";
import { redirect, useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

export const AuthLayout: FC<PropsWithChildren> = ({children}) => {
    const user = useUserStore(store => store.user)
    const router = useRouter()
    useEffect(() => {
        if(!user) {
            router.push(ROUTES.AUTH.login)
        }
    }, [])
    if(!user) {
        return null
    }
    return children
}