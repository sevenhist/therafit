import { ROUTES } from "@/routes/routes"
import Link from "next/link"
import s from "./MainLayout.module.scss"
import useUserStore from "@/modules/userInformation/store"
import { Header } from "@/components/Header"

export const MainLayout = () => {
    const user = useUserStore(state => state.user)
    const isAuth = useUserStore(store => store.isAuth)
    return (
        <div className={s.main}>
            <Header />
            <h1>Du musst zuerst anmelden!</h1>
            {
                isAuth && user ?
                <p>Du bist angemeldet, deine email ist {user.email}</p>
                : 
                <div className={s.main__authorization}>
                    <Link className={s.main__link} href={ROUTES.AUTH.login}>Login</Link>
                    <Link className={s.main__link} href={ROUTES.AUTH.registration}>Registration</Link>
                    <Link className={s.main__link} href={ROUTES.serverConnection}>To Server Connect</Link>
                </div>
            }
        </div>
    )
}