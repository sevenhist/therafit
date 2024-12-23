import Link from 'next/link'
import { Logo } from '../Logo'
import s from './Header.module.scss'
import { ROUTES } from '@/routes/routes'
import { Accordion, Box, Button } from 'vibe-library'
import useUserStore from '@/modules/userInformation/store'

export const Header = () => {
    const user = useUserStore(store => store.user)
    return (
        <>
            <Box ui={{
                py: 10, // 10 * 4 = 40px
                width: '100%'
            }}>
                <Box ui={{
                    flexDirection: 'row',
                    width: '100%',
                    px: 30,
                    gap: 3,
                    md: {
                        flexDirection: 'column',
                        align: 'center',
                        justify: 'center',
                        px: 4
                    }
                }}>
                    <Logo />
                    <Box ui={{
                        flexDirection: 'row',
                        gap: 10,
                        grow: true,
                        align: 'center',
                        justify: 'end',
                        md: {
                            gap: 3
                        }
                    }}>
                        <Link href={ROUTES.home} className={s.header__link}>EXERCISES</Link>
                        <Link href={ROUTES.home} className={s.header__link}>NUTRITION</Link>
                        <Link href={ROUTES.home} className={s.header__link}>ABOUT</Link>
                        {
                            user ? (
                                <Link href={ROUTES.home} className={s.header__link}>PROFILE</Link>
                            ) : (
                                <Link href={ROUTES.AUTH.login} className={s.header__link}>LOGIN</Link>
                            )
                        }
                    </Box>
                </Box>
            </Box>
        </>
    )
}