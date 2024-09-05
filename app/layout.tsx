import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '../context/LanguageContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rosary Now | Pray the Rosary Online",
  description: "Pray the Rosary online with Rosary Now. Interactive, easy-to-use Catholic prayer app with daily mysteries, timer, and prayer guides.",
  keywords: "rosary, catholic prayer, online rosary, daily mysteries, prayer app",
  openGraph: {
    title: "Rosary Now | Pray the Rosary Online",
    description: "Interactive Catholic prayer app for praying the Rosary online. Daily mysteries, timer, and prayer guides.",
    url: "https://rosarynow.com",
    siteName: "Rosary Now",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosary Now | Pray the Rosary Online",
    description: "Interactive Catholic prayer app for praying the Rosary online. Daily mysteries, timer, and prayer guides.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://rosarynow.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <LanguageProvider>
        <body className={inter.className}>{children}</body>
      </LanguageProvider>
    </html>
  );
}