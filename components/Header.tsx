"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, Search, User, ShoppingCart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const announcements = [
  "Miễn phí vận chuyển toàn quốc cho đơn từ 500K",
  "Giảm giá 20% cho thành viên mới",
  "Đổi trả miễn phí trong 60 ngày",
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  const isHomePage = pathname === "/";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const goToPrevAnnouncement = () => {
    setCurrentAnnouncementIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const goToNextAnnouncement = () => {
    setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-white relative">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={goToPrevAnnouncement}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <p className="text-sm font-semibold text-center flex-1 px-4">
            {announcements[currentAnnouncementIndex]}
          </p>
          
          <button
            onClick={goToNextAnnouncement}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className={`border-b border-border sticky top-0 z-40 ${isHomePage ? 'bg-white/95 backdrop-blur-md' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile: Hamburger Menu */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-black text-base md:text-lg">U</span>
              </div>
              <span className="text-xl md:text-2xl font-black text-primary tracking-tight hidden sm:block">
                UNIPALM
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${encodeURIComponent(category.name)}`}
                  className={`text-sm font-semibold hover:text-primary transition-colors ${
                    pathname.includes(category.id) ? "text-primary" : "text-black"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setShowSearch(true)}
                className="w-10 h-10 flex items-center justify-center hover:bg-backgroundGray rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/profile"
                className="hidden md:flex w-10 h-10 items-center justify-center hover:bg-backgroundGray rounded-full transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href="/cart"
                className="w-10 h-10 flex items-center justify-center hover:bg-backgroundGray rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <div className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setShowMobileMenu(false)}>
          <div
            className="bg-white w-80 h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-black">Menu</h2>
              <button onClick={() => setShowMobileMenu(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-5">
              <div className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/shop?category=${encodeURIComponent(category.name)}`}
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-backgroundGray font-semibold"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-backgroundGray font-semibold"
                >
                  <User className="w-5 h-5" />
                  <span>Tài Khoản</span>
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-backgroundGray font-semibold"
                >
                  <span>Yêu Thích</span>
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-backgroundGray font-semibold"
                >
                  <span>Đơn Hàng</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowSearch(false)}>
          <div
            className="bg-white w-full max-w-2xl mx-auto mt-20 rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black">Tìm Kiếm</h2>
              <button onClick={() => setShowSearch(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 bg-backgroundGray rounded-lg outline-none text-base"
                autoFocus
              />
              <button
                type="submit"
                className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primaryDark transition-colors"
              >
                Tìm
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}