"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (product: any) => {
    addToCart(product, product.colors[0], product.sizes[0], 1);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-backgroundGray">
        <div className="bg-white px-5 py-5">
          <h1 className="text-3xl font-black tracking-tight">Yêu Thích</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-10">
          <Heart className="w-20 h-20 text-textLight mb-5" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-black mb-3">Chưa có sản phẩm yêu thích</h2>
          <p className="text-base text-textGray text-center mb-8">
            Thêm sản phẩm vào danh sách yêu thích để dễ dàng tìm lại
          </p>
          <Link
            href="/shop"
            className="bg-primary text-white font-bold px-8 py-4 rounded-lg hover:bg-primaryDark transition-colors"
          >
            Khám Phá Ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundGray">
      <div className="bg-white px-5 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-black tracking-tight">Yêu Thích</h1>
        <p className="text-sm font-semibold text-textGray">{items.length} sản phẩm</p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md relative">
              <Link href={`/shop/product/${product.id}`}>
                <div
                  className="h-44 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
                  }}
                >
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded">
                      {product.badge}
                    </div>
                  )}
                  <p className="text-4xl font-black text-white/20 text-center leading-tight">
                    UPF<br />50+
                  </p>
                </div>
              </Link>

              <button
                onClick={() => removeItem(product.id)}
                className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <Heart className="w-5 h-5 text-primary fill-primary" />
              </button>

              <div className="p-3">
                <h3 className="text-sm font-bold text-black mb-2 line-clamp-2 min-h-[2.25rem]">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-star fill-star" />
                  <span className="text-xs text-textGray font-semibold">{product.rating}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="text-base font-extrabold text-primary">
                    {product.price.toLocaleString("vi-VN")}₫
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-textLight line-through">
                      {product.originalPrice.toLocaleString("vi-VN")}₫
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary text-white font-bold px-4 py-3 rounded-md flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Thêm Giỏ Hàng</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}