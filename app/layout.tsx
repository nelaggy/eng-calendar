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
      <body className={inter.className + 'bg-slate-100 dark:bg-slate-800 bg-no-repeat min-h-screen'}>
        {children}
        <div className="absolute bottom-1 right-1">&copy; Galen Lee 2024</div>
      </body>
    </html>
  );
}
