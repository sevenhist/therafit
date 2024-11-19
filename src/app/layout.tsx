'use client';
import "../scss/null.scss"
import { Inter } from "next/font/google";
import s from "./Layout.module.scss"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={s.content}>
          {children}
        </div>
      </body>
    </html>
  );
}
