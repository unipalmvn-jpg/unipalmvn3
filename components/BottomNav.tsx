"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAnimation } from "@/contexts/AnimationContext";
import { useRef, useEffect } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { setCartIconRect } = useAnimation();
  const cartRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const updateRect = () => {
      if (cartRef.current) {
        setCartIconRect(cartRef.current.getBoundingClientRect());
      }
    };

    // Cập nhật vị trí sau một khoảng trễ nhỏ để đảm bảo layout ổn định
    const timeoutId = setTimeout(updateRect, 100);

    // Cập nhật lại vị trí khi cửa sổ thay đổi kích thước hoặc cuộn
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [setCartIconRect]);

  const navItems = [
    { href: "/", icon: Home, label: "Trang Chủ" },
    { href: "/shop", icon: ShoppingBag, label: "Sản Phẩm" },
    { href: "/cart", icon: ShoppingCart, label: "Giỏ Hàng", badge: totalItems, ref: cartRef },
    { href: "/wishlist", icon: Heart, label: "Yêu Thích" },
    { href: "/profile", icon: User, label: "Tài Khoản" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-bottom md:hidden">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={item.ref as any}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                <Icon
                  className={`w-6 h-6 mb-1 ${
                    isActive ? "text-primary" : "text-textGray"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <div className="absolute top-1 right-1/4 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 99 ? "99+" : item.badge}
                  </div>
                )}
                <span
                  className={`text-xs font-semibold ${
                    isActive ? "text-primary" : "text-textGray"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}