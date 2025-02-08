import { Header } from "@/components/Header";
import s from "./LegalNotice.module.scss";
import Link from "next/link";

export const LegalNotice = () => {
    return (
        <div>
            <Header />
            <div className={s.legalNotice}>
                <h1>Legal Notice</h1>

                <h2>Address</h2>
                <Link href="https://www.google.com/maps/search/?api=1&query=Ibererstraße+15-21,+8051+Graz" target="_blank">Ibererstraße 15 – 21, 8051 Graz</Link>

                <h2>E-Mail:</h2>
                <Link href="mailto:willkommen@bulme.at">willkommen@bulme.at</Link>

                <h2>Telefon:</h2>
                <Link href="tel:+43502480660">+43 50 248 066-0</Link>

                <h2>Management:</h2>
                <p>Alexander Leitner, Dmytro Rudnenko and Veronika Majorova</p>
                <div className={s.legalNotice__info}>
                    <span>All content is available free of charge</span>
                    <span>This website is an open source project</span>
                </div>
            </div>
        </div>
    );
};