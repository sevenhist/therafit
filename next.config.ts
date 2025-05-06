/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Включаем режим статического экспорта
  // images: {
  //   unoptimized: true, // Отключаем оптимизацию изображений (некоторые старые методы могут не поддерживаться)
  // }
  reactStrictMode: false,
};

const withPWA = require('next-pwa')({
  dest: 'public', // Der Ordner, in dem die PWA-Dateien gespeichert werden (normalerweise 'public')
  register: true, // Automatische Registrierung des Service Workers aktivieren
  skipWaiting: true, // Den neuen Service Worker sofort aktivieren, ohne auf den Benutzer zu warten
  disable: process.env.NODE_ENV === 'development', // PWA im Entwicklungsmodus deaktivieren
  // Weitere Optionen kannst du hier hinzufügen (siehe Dokumentation)
})

module.exports = withPWA(nextConfig);
