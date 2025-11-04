import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import { CartProvider } from "@/lib/cart-content";
import { ConvexClientProvider } from "@/components/convexProvider";

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css"
        />
      </head>
      <body
        className={` font-medium text-[15px] min-h-screen antialiased flex flex-col items-center justify-between `}
      >
        <ConvexClientProvider>
          <CartProvider>
            <Header />
            {children}

            <Footer />
          </CartProvider>
        </ConvexClientProvider>
        <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
      </body>
    </html>
  );
}
