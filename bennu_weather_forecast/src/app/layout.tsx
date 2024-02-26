import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Bennu Weather App",
  description: "Bennu Weather App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="full-width full-height bg-generale-bg">{children}</body>
    </html>
  );
}