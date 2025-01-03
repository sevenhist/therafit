'use client'
import useUserStore from "@/modules/userInformation/store";
import { FC, PropsWithChildren, useEffect } from "react";
import { Loader } from "vibe-library";

export const AuthProvider:FC<PropsWithChildren> = ({children}) => {
    const fetchGetUser = useUserStore(state => state.fetchGetUser);
    const isLoading = useUserStore(state => state.isLoading)
    useEffect(() => {
        fetchGetUser();
    }, []);
    if(isLoading) {
        return <Loader />;
    }
    return children
}