import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import AppLayout from "@/components/AppLayout";

export const metadata: Metadata = {
  title: "Unipalm - Chống nắng có Gu",
  description: "Bảo vệ làn da người Việt với công nghệ UPF 50+ và phong cách hiện đại",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          <AppLayout>
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}