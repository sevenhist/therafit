'use client';
import useUserStore from "@/modules/userInformation/store";
import "../scss/null.scss"
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const fetchReloadPage = useUserStore(state => state.fetchReloadPage);

  useEffect(() => {
    const reloadPageData = async () => {
      try {
        console.log("RELOAD RELODAD")
        await fetchReloadPage();
      } catch (error) {
        console.error("Error during page reload:", error);
      }
    };

    reloadPageData();
  }, [fetchReloadPage]);

  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
