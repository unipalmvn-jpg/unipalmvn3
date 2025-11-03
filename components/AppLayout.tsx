"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import ChatWidget from "@/components/ChatWidget";
import FlyToCartAnimator from "@/components/FlyToCartAnimator";
import Header from "@/components/Header";
import { ReactNode } from "react";

const noNavPaths = [
  /^\/checkout$/,
  /^\/policies\/.+$/,
  /^\/customer-care\/.+$/,
  /^\/size-guide$/,
  /^\/about\/.+$/,
  /^\/blog\/.+$/,
  /^\/technologies\/.+$/,
  /^\/order-success/,
  /^\/address-select/,
  /^\/address-add/,
  /^\/feedback/,
  /^\/compare/,
  /^\/loyalty/,
  /^\/affiliate/,
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const showNav = !noNavPaths.some(path => path.test(pathname));

  return (
    <>
      <Header />
      <main className={`min-h-screen ${showNav ? "pb-20" : ""}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
      <ChatWidget />
      <FlyToCartAnimator />
    </>
  );
}