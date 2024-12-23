'use client'
import useUserStore from "@/modules/userInformation/store";
import { Suspense, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "vibe-library";
import s from "./Page.module.scss"
import { useRouter } from "next/navigation";

export default function Home() {

  const user = useUserStore(state => state.user)
  const logout = useUserStore(store => store.logout)
  const router = useRouter();
  const getAllUser = useUserStore(store => store.fetchGetAllUsers);


  return (
    <div className={s.main}>
      <Header />
      <div className={s.main___inSystem}>
        <p>Du bist angemeldet, deine email ist {user?.email}</p>
        {/* <Link className={s.main__link} href={ROUTES.getUsers}>get Users</Link> */}
        <Button onClick={() => {
          logout(router.push)
        }}>Abmelden</Button>
        <Button onClick={() => {
          getAllUser()
        }}>Get all users</Button>
      </div>
    </div>
  )
  // )
}
