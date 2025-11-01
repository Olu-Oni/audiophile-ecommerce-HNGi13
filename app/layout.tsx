import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "./footer";
import Header from "./header";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audiophile",
  description: "Ecommerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` font-medium text-[15px]  antialiased`}>
        {/* <div className="flex flex-col min-h-screen items-center justify-center "> */}
        <Header/>
        {children}
        <Footer/>
        {/* </div> */}
      </body>
    </html>
  );
}
