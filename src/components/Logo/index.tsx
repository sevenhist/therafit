import Link from 'next/link'
import s from './Logo.module.scss'
import { ROUTES } from '@/routes/routes'

export const Logo = () => {
    return (
        <Link href={ROUTES.home} className={s.logo}>
            <h2>FitData</h2>
        </Link>
    )
}