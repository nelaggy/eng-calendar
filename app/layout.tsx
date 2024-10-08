import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engineering Calendar",
  description: "by Galen Lee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + 'bg-gray-50 dark:bg-neutral-900 dark:text-gray-50 bg-no-repeat min-h-screen'}>
        {children}
      </body>
    </html>
  );
}
