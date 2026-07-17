import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/components/providers/TanStackProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import Navigation from "@/components/navigation/Navigation/Navigation";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GlobalModals from "@/components/custom/GlobalModals/GlobalModals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Friday",
  description: "Your personal finance companion",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <GoogleOAuthProvider clientId="143636454282-6v65191bah83k9md5ebl6vlq7bc91gf5.apps.googleusercontent.com">
          <TanStackProvider>
            <AuthProvider>
              <main className="app-content">{children}</main>
              <Navigation />
              <div id="modal-section"></div>
              <GlobalModals />
              <Toaster position="top-center" reverseOrder={false} />
            </AuthProvider>
          </TanStackProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
