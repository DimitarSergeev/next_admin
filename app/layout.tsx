"use client";
import "./globals.css";
import { Providers } from "./providers";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { usePathname } from "next/navigation";
import SideBar from "./components/Navigation/SideBar/SideBar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  console.log(currentPath);

  const shouldShowSidebar = !["/login", "/api/auth/signin"].includes(
    currentPath
  );
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* <div style={{ display: "flex" }}> */}
              {shouldShowSidebar && <SideBar />}
            <section className="home-section">
              {children}
            </section>
          {/* </div> */}
        </Providers>
      </body>
    </html>
  );
}
