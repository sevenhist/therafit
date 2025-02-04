import s from "./Impressum.module.scss";

export const Impressum = () => {
    return (
            <div className={s.impressum}>
                <h1>Impressum</h1>
                
                <h2>Adresse:</h2>
                <p>Ibererstraße 15 – 21</p>
                <p>8051 Graz</p>
                
                <h2>E-Mail:</h2>
                <p>willkommen@bulme.at</p>

                <h2>Telefon:</h2>
                <p>+43 50 248 066-0</p>

                <h2>Geschäftsführung:</h2>
                <p>Alexander Leitner und Dmytro Rudnenko</p>

                <p>Diese Website ist ein Open-Source-Projekt.</p>
                <p>Alle Inhalte stehen kostenlos zur Verfügung.</p>
            </div>
        
    );
};