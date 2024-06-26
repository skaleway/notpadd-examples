import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import localFont from "next/font/local";

const satoshi = localFont({
  src: "../fonts/Satoshi-Regular.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Notpadd",
    template: " %s | Notpadd",
  },

  description: "Create blogging articles in minutes not hours.",
  icons: {
    icon: [
      { url: "/notpadd-light.png", media: "(prefers-color-scheme: dark)" },
      { url: "/notpadd-dark.png", media: "(prefers-color-scheme: light)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <main className="max-w-7xl mx-auto w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
