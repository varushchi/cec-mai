import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "@/store/Provider";
import LoginModal from "@/components/LoginModal/LoginModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Мониторинг МАИ",
  description: "Мониторинг повышения квалификации преподавателей",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <Navbar />
          <LoginModal />
          <div style={{flex: 1}}>
            {children}
          </div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
