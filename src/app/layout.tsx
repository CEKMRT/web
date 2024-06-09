import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/themeprovider";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/core/HeadFoot/header";
import Footer from "@/components/core/HeadFoot/footer";
import keywords from "@/lib/definition/seo";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/icon1.png", // /public path
  },
  title: "MRT Jakarta",
  description:
    "Temukan Jadwal MRT-mu disini!, Pulang Kerja, Kuliah, Belanja gak perlu bingung cari waktu buat naik MRT lagi!",
  generator: "Next.js",
  applicationName: "Jadwal MRT",
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
export const revalidate = 3600; // revalidate
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.png" sizes="any" />
      <body
        className={`${inter.className} min-h-screen bg-gray-200 dark:bg-zinc-800 no-scrollbar overflow-y-auto select-none relative`}
      >
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
