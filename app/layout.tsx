import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "John Matthew Banto — Full-stack developer",
  description:
    "John Matthew Banto is a Manila-based full-stack developer focused on backend systems, with experience building and maintaining internal bidding and shipment-tracking applications. Seeking fully remote developer roles.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
