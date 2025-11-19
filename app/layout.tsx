import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat, JetBrains_Mono, Reem_Kufi } from "next/font/google";
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

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Serdar Salim Domurcuk - Builder, Muslim, Father",
  description: "Serdar Salim Domurcuk (Salim Serdar) - Ex-Twitter Program Manager building Halqa and Culturia. Based in Malaysia. Builder. Muslim. Father.",
  keywords: ["Serdar Salim", "Serdar Domurcuk", "Serdar Salim Domurcuk", "Salim Serdar", "Salim Domurcuk", "Halqa", "Culturia", "Twitter PM", "Muslim builder", "Malaysia"],
  authors: [{ name: "Serdar Salim Domurcuk" }],
  creator: "Serdar Salim Domurcuk",
  icons: {
    icon: '/favicon-32.png',
    apple: '/app-logo.png',
  },
  openGraph: {
    title: "Serdar Salim",
    description: "Builder. Muslim. Father.",
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
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: "Serdar Salim",
    description: "Builder. Muslim. Father.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Serdar Salim Domurcuk",
              alternateName: ["Serdar Salim", "Salim Serdar", "Serdar Domurcuk", "Salim Domurcuk"],
              url: "https://serdarsalim.com",
              image: "https://serdarsalim.com/app-logo.png",
              jobTitle: "Builder, Program Manager",
              worksFor: {
                "@type": "Organization",
                name: "Halqa"
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "MY",
                addressLocality: "Malaysia"
              },
              sameAs: [
                "https://blog.serdarsalim.com",
                "https://tiktok.com/@salimspoke"
              ],
              description: "Builder, Muslim, Father. Ex-Twitter Program Manager building Halqa and Culturia in Malaysia."
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${jetbrainsMono.variable} ${reemKufi.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
