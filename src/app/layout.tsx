import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Billboard Scout",
  description: "BBscout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <main className="main" id="top">
      {children}
      </main>
        <Script src="/js/popper/popper.min.js" strategy="afterInteractive"  />
        <Script src="/js/bootstrap/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/anchorjs/anchor.min.js" strategy="afterInteractive" />
        <Script src="/js/is/is.min.js" strategy="afterInteractive" />
        <Script src="/js/lodash/lodash.min.js" strategy="afterInteractive" />
        <Script src="/js/list.js/list.min.js" strategy="afterInteractive" />
        <Script src="/js/dayjs/dayjs.min.js" strategy="afterInteractive" />
        <Script src="/js/phoenix.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
