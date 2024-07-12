"use client";
import "./globals.css";
import { Providers } from "./providers";
import "primereact/resources/themes/lara-light-cyan/theme.css";

// Import necessary components and plugins
import { usePathname } from "next/navigation";
import SideBar from "./components/Navigation/SideBar/SideBar";
import Nav from "./components/Navigation/Nav/Nav";
import { registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Register plugins globally
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current pathname to conditionally render components
  const currentPath = usePathname();

  // Determine if the sidebar and nav should be shown based on the current path
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
        <ToastContainer />
      </body>
    </html>
  );
}
