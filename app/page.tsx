"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ShoppingBag, Star, Mail, Phone, Facebook, Instagram, Youtube, MessageCircle, Send, Users, DollarSign, TrendingUp, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { products, categories, lifestyleItems } from "@/data/products";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useAffiliate } from "@/contexts/AffiliateContext";
import Footer from "@/components/Footer";

const banners = [
  {
    id: "1",
    title: "NEW COLLECTION",
    subtitle: "Summer 2025",
    description: "Bộ sưu tập mới nhất với công nghệ UPF 50+ tiên tiến",
    colors: ["#97d7d9", "#5bc9e1"],
    cta: "Khám Phá Ngay",
    link: "/shop",
  },
  {
    id: "2",
    title: "SALE OFF 50%",
    subtitle: "Flash Sale Hôm Nay",
    description: "Giảm giá sốc cho tất cả sản phẩm chống nắng",
    colors: ["#f6c785", "#f3ac71"],
    cta: "Mua Ngay",
    link: "/shop",
  },
  {
    id: "3",
    title: "UPF 50+",
    subtitle: "Maximum Protection",
    description: "Bảo vệ tối ưu cho làn da dưới ánh nắng mặt trời",
    colors: ["#045433", "#364c43"],
    cta: "Tìm Hiểu Thêm",
    link: "/technologies",
  },
  {
    id: "4",
    title: "MIỄN PHÍ VẬN CHUYỂN",
    subtitle: "Đơn Từ 500K",
    description: "Giao hàng nhanh chóng toàn quốc",
    colors: ["#b2d235", "#a5b289"],
    cta: "Mua Sắm Ngay",
    link: "/shop",
  },
];

export default function HomePage() {
  const { products: recentlyViewedProducts } = useRecentlyViewed();
  const { isEnrolled, commissionRate } = useAffiliate();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "subscribed">("idle");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const featuredProducts = products.slice(0, 4);

  const handleNewsletterSubscribe = () => {
    setNewsletterStatus("subscribed");
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterStatus("idle");
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const goToNextBanner = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Carousel - Adjusted for header */}
      <div className="relative" style={{ height: 'calc(100vh - 120px)', minHeight: '500px' }}>
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="w-full h-full flex-shrink-0 relative"
              style={{
                background: `linear-gradient(135deg, ${banner.colors[0]}, ${banner.colors[1]})`,
              }}
            >
              <div className="absolute inset-0 bg-black/10" />
              
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full mb-6">
                      <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
                      <span className="text-sm font-bold text-white tracking-wide">
                        {banner.subtitle}
                      </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight">
                      {banner.title}
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-white/95 mb-8 font-medium leading-relaxed">
                      {banner.description}
                    </p>
                    
                    <Link
                      href={banner.link}
                      className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black font-bold px-8 py-5 rounded-full transition-all shadow-2xl text-lg"
                    >
                      <span>{banner.cta}</span>
                      <ShoppingBag className="w-6 h-6" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-20 right-12 bg-white/20 backdrop-blur-sm border-2 border-white px-8 py-6 rounded-2xl transform rotate-[-5deg] hidden md:block">
                <div className="text-center">
                  <p className="text-xl font-extrabold text-white tracking-wide mb-1">UPF</p>
                  <p className="text-6xl font-black text-white tracking-tight leading-none">50+</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevBanner}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 rounded-full flex items-center justify-center transition-all z-20"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={3} />
        </button>
        
        <button
          onClick={goToNextBanner}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 rounded-full flex items-center justify-center transition-all z-20"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={3} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBannerIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentBannerIndex 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-black mb-6">Danh Mục</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                className="flex-shrink-0 w-36 p-6 rounded-md shadow-md hover:shadow-lg transition-shadow text-center"
                style={{ backgroundColor: category.color }}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="text-sm font-bold text-black mb-1">{category.name}</h3>
                <p className="text-xs text-textGray">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-12 px-6 bg-backgroundGray">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold text-black">Sản Phẩm Nổi Bật</h2>
            <Link href="/shop" className="text-sm font-semibold text-primary hover:underline">
              Xem Tất Cả
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/shop/product/${product.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div
                  className="h-72 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
                  }}
                >
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-4 py-2 rounded">
                      {product.badge}
                    </div>
                  )}
                  <p className="text-8xl font-black text-white/20 text-center leading-none">
                    UPF<br />50+
                  </p>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-black mb-2 line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-star fill-star" />
                    <span className="text-sm text-textGray font-semibold">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-extrabold text-primary">
                      {product.price.toLocaleString("vi-VN")}₫
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-textLight line-through">
                        {product.originalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Lifestyle */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-black mb-6">Phong Cách Sống</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {lifestyleItems.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href="/blog"
                className="h-44 rounded-md overflow-hidden relative group"
                style={{
                  background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`,
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/95">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewedProducts.length > 0 && (
        <div className="py-12 px-6 bg-backgroundGray">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-extrabold text-black">Sản Phẩm Đã Xem</h2>
              <Link href="/shop" className="text-sm font-semibold text-primary hover:underline">
                Xem Tất Cả
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {recentlyViewedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/shop/product/${item.id}`}
                  className="flex-shrink-0 w-40 bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div
                    className="h-36 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`,
                    }}
                  >
                    <p className="text-2xl font-black text-white/20">UPF 50+</p>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-black mb-2 line-clamp-2 min-h-[2.5rem]">
                      {item.name}
                    </h3>
                    <p className="text-sm font-extrabold text-primary">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Technology Section */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/technologies"
            className="block bg-gradient-to-br from-primary to-primaryDark rounded-md p-8 text-white hover:shadow-xl transition-shadow"
          >
            <h2 className="text-3xl font-black mb-3">Công Nghệ UPF 50+</h2>
            <p className="text-base mb-6 opacity-95">
              Chặn 98% tia UV có hại, bảo vệ làn da toàn diện với công nghệ vải tiên tiến
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { icon: "☀️", label: "UPF 50+" },
                { icon: "💨", label: "Thoáng Khí" },
                { icon: "🧊", label: "Cooling Effect" },
                { icon: "🛡️", label: "Kháng Khuẩn" },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center"
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <p className="text-sm font-bold">{feature.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-center opacity-90">Tìm Hiểu Thêm →</p>
          </Link>
        </div>
      </div>

      {/* Affiliate Section */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/affiliate"
            className="block bg-gradient-to-br from-[#f6c785] to-[#f3ac71] rounded-md p-8 relative overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="absolute top-5 right-5 bg-[#ff4444] text-white text-xs font-black px-4 py-2 rounded shadow-md">
              HOT
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-9 h-9 text-white" strokeWidth={2.5} />
              <h2 className="text-3xl font-black text-white">Chương Trình Affiliate</h2>
            </div>
            
            <p className="text-xl font-bold text-black mb-3">Kiếm tiền cùng Unipalm</p>
            
            <p className="text-base text-white mb-6 opacity-95">
              Giới thiệu sản phẩm Unipalm và nhận hoa hồng {(commissionRate * 100).toFixed(0)}% cho mỗi đơn hàng thành công
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#fff8ed] flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-[#f6c785]" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-black">Hoa hồng {(commissionRate * 100).toFixed(0)}%</p>
                  <p className="text-sm text-textGray">Cho mọi đơn hàng</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#fff8ed] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-[#f6c785]" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-black">Dễ dàng kiếm tiền</p>
                  <p className="text-sm text-textGray">Chia sẻ & nhận tiền</p>
                </div>
              </div>
            </div>
            
            {isEnrolled ? (
              <div className="bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold px-5 py-3 rounded-full text-center">
                ✓ Bạn đã tham gia
              </div>
            ) : (
              <p className="text-base font-extrabold text-white text-center">Tham Gia Ngay →</p>
            )}
          </Link>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-12 px-6">
        <div className="max-w-3xl mx-auto bg-backgroundGray border border-border rounded-md p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-black text-black mb-3">Đăng Ký Nhận Tin</h2>
          <p className="text-base text-textGray mb-6">
            Nhận thông tin khuyến mãi, sản phẩm mới và mã giảm giá độc quyền
          </p>
          {newsletterStatus === "subscribed" ? (
            <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-lg border-2 border-primary">
              <Send className="w-5 h-5 text-primary" />
              <p className="text-sm font-semibold text-primary">
                Đăng ký thành công! Vui lòng kiểm tra email.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email của bạn"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-5 py-4 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleNewsletterSubscribe}
                className="bg-primary hover:bg-primaryDark text-white font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>Đăng Ký</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}