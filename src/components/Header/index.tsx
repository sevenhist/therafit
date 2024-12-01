import Link from 'next/link'
import { Logo } from '../Logo'
import s from './Header.module.scss'
import { ROUTES } from '@/routes/routes'

export const Header = () => {
    return (
        <>
            <header className={s.header__container}>
                <div className={s.header}>
                    <Logo />
                    <div className={s.header__list}>
                        <Link href={ROUTES.home} className={s.header__link}>EXERCISES</Link>
                        <Link href={ROUTES.home} className={s.header__link}>NUTRITION</Link>
                        <Link href={ROUTES.home} className={s.header__link}>ABOUT</Link>
                        <Link href={ROUTES.AUTH.login} className={s.header__link}>LOGIN</Link>
                    </div>
                </div>
            </header>
        </>
    )
}