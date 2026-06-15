import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  variable: "--font-geist-sans",
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  display: "swap",
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devfum — Selected Product Work",
  description:
    "Selected web apps, SaaS platforms, AI tools, and scalable product systems by Devfum.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Devfum portfolio",
    "product design",
    "SaaS development",
    "AI tools",
    "web applications",
    "XR products",
  ],
  openGraph: {
    title: "Devfum — Selected Product Work",
    description:
      "A project-first portfolio of web apps, SaaS platforms, AI tools, and scalable product systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devfum — Selected Product Work",
    description:
      "Selected web apps, SaaS platforms, AI tools, and scalable product systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
