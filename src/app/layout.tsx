import 'vibe-library/dist/assets/main.css'
import "../scss/null.scss"
import { AuthProvider } from '@/providers/AuthProvider';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer 
          theme='dark'
          autoClose={3000}
        />
      </body>
    </html>
  );
}
