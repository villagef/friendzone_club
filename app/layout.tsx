import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/Navbar";
import Footer from "@/components/Footer";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FriendZone Club",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "w-full overflow-x-hidden bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <MainNav />
        <div className="min-h-[calc(100vh-143px)] w-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
