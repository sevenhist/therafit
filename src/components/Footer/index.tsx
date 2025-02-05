import { FC } from "react"
import s from "./Footer.module.scss"

export const Footer: FC = () => {
    
    const navLinks = [
        'ABOUT US',
        'PRIVACY POLICY'
    ];

    return (
        <footer className={s.footer}>
            <div className={s.footer__container}>
                <div className={s.footer__logo}>
                    <div className={s.footer__logo_box}>FitData</div>
                </div>

                <div className={s.footer__info}>
                    <div className={s.footer__contact}>
                        <div className={s.footer__address}>
                            <i className={s.footer__icon}>📍</i>
                            15-21 Ibererstrasse • Graz, 8051
                        </div>
                        <div className={s.footer__contacts}>
                            <span>
                                <i className={s.footer__icon}>📞</i>
                                (050) 248-0660
                            </span>
                        </div>
                    </div>
                </div>

                <nav className={s.footer__nav}>
                    {navLinks.map((link) => (
                        <a key={link} href="#" className={s.footer__link}>
                            {link}
                        </a>
                    ))}
                </nav>

                <div className={s.footer__copyright}>
                    Copyright © 2025 • FitData
                </div>
            </div>
        </footer>
    )
}