"use client";
import "./globals.css";
import { Providers } from "./providers";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { usePathname } from "next/navigation";
import SideBar from "./components/Navigation/SideBar/SideBar";
import Nav from "./components/Navigation/Nav/Nav";


import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();

  const shouldShowSidebar = !["/login", "/api/auth/signin"].includes(
    currentPath
  );
  return (
    <html lang="en">
      <body>
        <Providers>
          {shouldShowSidebar && (
            <>
              <SideBar />
              <Nav />
            </>
          )}
          {children}
        </Providers>
      </body>
    </html>
  );
}
