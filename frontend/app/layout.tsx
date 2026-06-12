import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Daily Spark | Personalized Bonding Activities",
  description: "Generate personalized bonding activities for you and your child.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-[#F0FDF4] text-[#064E3B] antialiased min-h-screen`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

