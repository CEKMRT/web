import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/themeprovider";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/core/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cek MRT by Perwira",
  description: "Find your MRT Schedules from nearest stations!",
  generator: "Next.js",
  applicationName: "MRT API",
  referrer: "origin-when-cross-origin",
  keywords: ["MRT", "Jadwal", "Stasiun MRT"],
  authors: [{ name: "Jeremy" }, { name: "Perwira", url: "https://nextjs.org" }],
  creator: "Jeremy Perwira",
  publisher: "Vercel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "google-adsense-account": "ca-pub-6205951690099961",
  },
};
export const revalidate = 60; // revalidate
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
