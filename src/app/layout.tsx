import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          background: `
            radial-gradient(ellipse at 80% 20%, #232946 0%, transparent 70%),
            radial-gradient(ellipse at 20% 80%, #393e6e 0%, transparent 70%),
            #16161a url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='white' fill-opacity='0.7'/%3E%3Ccircle cx='80' cy='30' r='1' fill='white' fill-opacity='0.5'/%3E%3Ccircle cx='50' cy='70' r='1.2' fill='white' fill-opacity='0.6'/%3E%3Ccircle cx='90' cy='90' r='0.8' fill='white' fill-opacity='0.4'/%3E%3Ccircle cx='30' cy='80' r='1.1' fill='white' fill-opacity='0.5'/%3E%3C/svg%3E")
            repeat`
        }}
      >
          <Navbar />
          
        {children}
      </body>
    </html>
  );
}
