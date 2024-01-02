import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'If The Shoe Fits',
    template: '%s | If The Shoe Fits',
  },
  description: 'A hip sneaker boutique nestled in the heart of the Mall of America.',
  metadataBase: new URL('https://www.iftheshoefits.vercel.app'),
  openGraph: {
    images: '/opengraph-image.png',
    type: 'website',
    siteName: 'If The Shoe Fits',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${inter.className} flex min-h-full flex-col overflow-x-hidden`}
      >
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
