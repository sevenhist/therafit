import Link from 'next/link'
import s from './Logo.module.scss'
import logo from "../../assets/img/logo.png"
import { ROUTES } from '@/routes/routes'
import Image from 'next/image'

export const Logo = () => {
    return (
        <Link href={ROUTES.home} className={s.logo}>
            <Image src={logo} alt='image'></Image>
        </Link>
    )
}