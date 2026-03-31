import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolHub - Free Online Tools",
  description: "Free online tools for developers and everyone. No registration required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
