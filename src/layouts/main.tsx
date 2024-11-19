import { ROUTES } from "@/routes/routes"
import Link from "next/link"
import s from "./MainLayout.module.scss"

export const MainLayout = () => {

    return (
        <div className={s.main}>
            <h1>Du musst zuerst anmelden!</h1>
            <div className={s.main__authorization}>
                <Link className={s.main__link} href={ROUTES.AUTH.login}>Login</Link>
                <Link className={s.main__link} href={ROUTES.AUTH.registration}>Registration</Link>
                <Link className={s.main__link} href={ROUTES.serverConnection}>To Server Connect</Link>
            </div>
        </div>
    )
}