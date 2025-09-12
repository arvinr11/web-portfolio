import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arvin's Portfolio",
  description: "Mobile Developer specializing in Flutter and Android development. Explore my projects, skills, and experience in mobile app development.",
  keywords: "mobile developer, flutter, android, kotlin, dart, mobile app development, portfolio, arvin roeslim",
  authors: [{ name: "Arvin Roeslim" }],
  creator: "Arvin Roeslim",
  openGraph: {
    title: "Arvin's Portfolio",
    description: "Mobile Developer specializing in Flutter and Android development. Explore my projects, skills, and experience in mobile app development.",
    url: "https://arvinroeslim.me",
    siteName: "Arvin's Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvin's Portfolio",
    description: "Mobile Developer specializing in Flutter and Android development. Explore my projects, skills, and experience in mobile app development.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
