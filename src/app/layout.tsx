// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Star Wars Characters",
  description: "Explore personagens do universo Star Wars",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white m-0">
        <main className="mx-[50px] mb-[80px] ">{children}</main>
      </body>
    </html>
  );
}


