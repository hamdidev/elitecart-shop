import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | EliteCart",
    absolute: "EliteCart",
  },
  description: "Shop smarter, live better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} antialiased`}>{children}</body>
    </html>
  );
}
