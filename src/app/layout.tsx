import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/themeprovider";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/core/header";
import keywords from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: '/icon.ico', // /public path
  },
  title: "MRT Jakarta",
  description: "Cari Jadwal MRT-mu disini!",
  generator: "Next.js",
  applicationName: "MRT API",
  referrer: "origin-when-cross-origin",
  keywords: keywords,
  authors: [
    { name: "Perwira", url: "https://github.com/Jeremyperwira" },
    { name: "Albert125", url: "https://github.com/albertus125" },
  ],
  creator: "JPerwira",
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
      <link rel="icon" href="/icon.png" sizes="any" />
      <body className={`${inter.className} min-h-screen bg-gray-200 dark:bg-zinc-800 no-scrollbar overflow-y-auto`}>
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
