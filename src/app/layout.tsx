import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dulce Meza | Portafolio",
  description: "Comunicóloga apasionada por la creatividad, el diseño y la comunicación. Especialista en marketing, redes sociales y creación de contenido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
