import { FC } from "react"
import s from "./Footer.module.scss"
import { ROUTES } from "@/routes/routes";
import Link from "next/link";

export const Footer: FC = () => {
    
    const navLinks = [
        {
            title: "ABOUT US",
            link: ROUTES.about
        }, 
        {
            title: "PRIVACY POLICY",
            link: ROUTES.privacy_policy
        }, 
        {
            title: "LEGAL NOTICE",
            link: ROUTES.legal_notice
        }
    ];

    return (
        <footer className={s.footer}>
            <div className={s.footer__container}>
                <div className={s.footer__logo}>
                    <div className={s.footer__logo_box}>TheraFit</div>
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
                        <Link key={link.link} href={link.link} className={s.footer__link}>
                            {link.title}
                        </Link>
                    ))}
                </nav>

                <div className={s.footer__copyright}>
                    Copyright © 2025 • TheraFit
                </div>
            </div>
        </footer>
    )
}