import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/lib/ThemeProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Moonsu Link — Digital Farmer Assistant & Marketplace",
  description:
    "Your Digital Farmer Assistant & Marketplace for Cameroon. Connect farmers, buyers, and agricultural value chain actors across Cameroon via WhatsApp and Telegram.",
};

export const viewport: Viewport = {
  themeColor: "#162531",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
