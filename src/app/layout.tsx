import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supabase Profiles",
  description: "Simple dashboard to manage your Supabase user profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} app-body`}>
        <div className="app-shell">
          <header className="app-header">
            <p className="eyebrow">Supabase demo</p>
            <h1 className="header-title">People &amp; access</h1>
            <p className="header-copy">
              Update your own details, browse teammates, and keep your Supabase
              project tidy with a calm, minimal interface.
            </p>
          </header>
          <nav className="app-nav" aria-label="Primary">
            <Link href="/account" className="nav-link">
              Account
            </Link>
            <Link href="/users" className="nav-link">
              Users
            </Link>
          </nav>
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
