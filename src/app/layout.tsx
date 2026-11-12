import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BROKERAGE_INFO } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://movemiamirealtor.com"
  ),
  title: {
    default: `${BROKERAGE_INFO.brandName} | Attorney-Led Miami Real Estate Brokerage`,
    template: `%s | ${BROKERAGE_INFO.brandName}`,
  },
  description: BROKERAGE_INFO.description,
  openGraph: {
    title: `${BROKERAGE_INFO.brandName} — Your Move. Your Miami.`,
    description: BROKERAGE_INFO.description,
    type: "website",
    locale: "en_US",
    siteName: BROKERAGE_INFO.brandName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-ivory font-sans text-[15px] leading-[1.65] text-charcoal antialiased md:text-[16px]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
