import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Serdar Salim",
  description: "Serdar Salim - Builder, Creator, Dreamer",
  icons: {
    icon: '/favicon-32.png',
    apple: '/app-logo.png',
  },
  openGraph: {
    title: "Serdar Salim",
    description: "Builder, Creator, Dreamer",
    url: 'https://serdarsalim.com',
    siteName: 'Serdar Salim',
    images: [
      {
        url: '/app-logo.png',
        width: 1024,
        height: 1024,
        alt: 'Serdar Salim',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Serdar Salim",
    description: "Builder, Creator, Dreamer",
    images: ['/app-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
