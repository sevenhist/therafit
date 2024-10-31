import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react';

export default function Home() {

      const [message, setMessage] = useState('');
      const [response, setResponse] = useState('');
  
      // Daten vom Backend abrufen
      useEffect(() => {
          fetch('http://localhost:4000/api/greeting')
              .then((res) => res.json())
              .then((data) => setMessage(data.message))
              .catch((error) => console.error('Fehler beim Abrufen:', error));
      }, []);
  
      // Nachricht an das Backend senden
      const sendMessage = async () => {
          try {
              const res = await fetch('http://localhost:4000/api/echo', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ message: 'Hallo vom Next.js-Frontend!' }),
              });
              const data = await res.json();
              setResponse(data.echoedMessage);
          } catch (error) {
              console.error('Fehler beim Senden:', error);
          }
      };
  
      return (
          <div>
              <h1>Backend-Nachricht: {message}</h1>
              <button onClick={sendMessage}>Nachricht senden</button>
              {response && <p>Backend-Antwort: {response}</p>}
          </div>
      );
}
