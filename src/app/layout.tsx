import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "black",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  
};

export const metadata: Metadata = {
  title: "Expense Tracker 304",
  description: "Created by Adarsh",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: [{ url: "/android-chrome-192x192.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Expense Tracker",
  },
  applicationName: "Expense Tracker 304",
  formatDetection: {
    telephone: false,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
