import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kalori Makanan API - Fast & Reliable Food Calorie Data",
  description:
    "Access nutritional data for 750+ Malaysian and international foods through our simple REST API. Get calorie information, serving sizes, and food categories instantly.",
  keywords:
    "food api, calorie api, nutrition api, malaysian food, food database, rest api, kalori makanan",
  authors: [{ name: "Kalori Makanan" }],
  creator: "Kalori Makanan",
  publisher: "Kalori Makanan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kalori-makanan.netlify.app"),
  openGraph: {
    title: "Kalori Makanan API - Fast & Reliable Food Calorie Data",
    description:
      "Access nutritional data for 750+ Malaysian and international foods through our simple REST API.",
    url: "https://kalori-makanan.netlify.app",
    siteName: "Kalori Makanan API",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kalori Makanan API",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalori Makanan API - Fast & Reliable Food Calorie Data",
    description:
      "Access nutritional data for 750+ Malaysian and international foods through our simple REST API.",
    images: ["/og-image.png"],
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

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
