import s from "./Impressum.module.scss";

export const Impressum = () => {
    return (
            <div className={s.impressum}>
                <h1>Legal Notice</h1>
                
                <h2>Address</h2>
                <p>Ibererstraße 15 – 21</p>
                <p>8051 Graz</p>
                
                <h2>E-Mail:</h2>
                <p>willkommen@bulme.at</p>

                <h2>Telefon:</h2>
                <p>+43 50 248 066-0</p>

                <h2>Management:</h2>
                <p>Alexander Leitner and Dmytro Rudnenko</p>

                <p>This website is an open source project.</p>
                <p>All content is available free of charge.</p>
            </div>
        
    );
};