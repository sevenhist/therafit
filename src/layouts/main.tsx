import { ROUTES } from "@/routes/routes"
import Link from "next/link"
import s from "./MainLayout.module.scss"
import useUserStore from "@/modules/userInformation/store"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/Button"

export const MainLayout = () => {
    const user = useUserStore(state => state.user)
    const isAuth = useUserStore(store => store.isAuth)
    const logout = useUserStore(store => store.logout)
    return (
        <div className={s.main}>
            <Header />
            {
                isAuth && user ?
                <div>
                    <p>Du bist angemeldet, deine email ist {user.email}</p>
                    {/* <Link className={s.main__link} href={ROUTES.getUsers}>get Users</Link> */}
                    <Button onClick={logout}>Abmelden</Button>
                </div>
                
                : 
                <div className={s.main__info}>
                    <h1>Du musst zuerst anmelden!</h1>
                    <div className={s.main__authorization}>
                        <Link className={s.main__link} href={ROUTES.AUTH.login}>Login</Link>
                        <Link className={s.main__link} href={ROUTES.AUTH.registration}>Registration</Link>
                    {/* <Link className={s.main__link} href={ROUTES.getUsers}>get Users</Link> */}
                    </div>
                </div>
            }
        </div>
    )
}