"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingBag, Heart, Check, GitCompare, MessageCircle, Zap } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useComparison } from "@/contexts/ComparisonContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useReviews } from "@/contexts/ReviewContext";
import { useAuth } from "@/contexts/AuthContext";
import { useChatSupport } from "@/contexts/ChatSupportContext";
import { useOrders } from "@/contexts/OrderContext";
import { useAnimation } from "@/contexts/AnimationContext";
import Footer from "@/components/Footer";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { addToComparison, isInComparison, canAddMore } = useComparison();
  const { addProduct: addToRecentlyViewed } = useRecentlyViewed();
  const { getProductReviews, addReview, hasUserPurchasedProduct } = useReviews();
  const { user } = useAuth();
  const { openChat, sendMessage } = useChatSupport();
  const { orders } = useOrders();
  const { flyToCart } = useAnimation();
  
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageRef = useRef<HTMLDivElement>(null);
  const product = products.find((p) => p.id === params.id);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
      if (!selectedColor && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      if (!selectedSize && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product, selectedColor, selectedSize, addToRecentlyViewed]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Không tìm thấy sản phẩm</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedColor, selectedSize, quantity);
    if (product.images && product.images.length > 0) {
      flyToCart(product.images[0], imageRef);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedSize) return;
    await addItem(product, selectedColor, selectedSize, quantity);
    router.push("/checkout");
  };

  const handleChatNow = () => {
    const message = `Xin chào, tôi muốn hỏi về sản phẩm: ${product.name}\nGiá: ${product.price.toLocaleString("vi-VN")}₫`;
    openChat();
    setTimeout(() => sendMessage(message), 300);
  };

  const handleSubmitReview = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để đánh giá sản phẩm");
      return;
    }

    if (!hasUserPurchasedProduct(user.id, product.id, orders)) {
      alert("Bạn cần mua sản phẩm này trước khi có thể đánh giá");
      return;
    }

    if (reviewComment.trim()) {
      addReview(product.id, user.id, user.name, reviewRating, reviewComment);
      setReviewComment("");
      setReviewRating(5);
      setShowReviewForm(false);
    }
  };

  const productReviews = getProductReviews(product.id);
  const canReview = user ? hasUserPurchasedProduct(user.id, product.id, orders) : false;
  const hasImages = product.images && product.images.length > 0;
  const displayImages = hasImages ? product.images! : [];
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <div className="relative" ref={imageRef}>
        {hasImages ? (
          <div className="relative h-[500px] bg-backgroundGray">
            <Image
              src={displayImages[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {displayImages.length > 1 && (
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "w-6 bg-white" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className="h-[500px] flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
            }}
          >
            <p className="text-9xl font-black text-white/20 text-center leading-none">
              UPF<br />50+
            </p>
          </div>
        )}

        {/* Header Bar */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-5">
          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => canAddMore || isInComparison(product.id) ? addToComparison(product) : null}
              className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center"
            >
              <GitCompare
                className={`w-6 h-6 ${isInComparison(product.id) ? "text-primary" : "text-black"}`}
                strokeWidth={isInComparison(product.id) ? 2.5 : 2}
              />
            </button>
            <button
              onClick={() => toggleItem(product)}
              className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center"
            >
              <Heart
                className={`w-6 h-6 ${isInWishlist(product.id) ? "text-primary fill-primary" : "text-black"}`}
              />
            </button>
          </div>
        </div>

        {product.badge && (
          <div className="absolute top-32 left-5 bg-primary text-white text-xs font-bold px-4 py-2 rounded">
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="max-w-4xl mx-auto px-5 py-6 pb-32">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">{product.category}</p>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-star fill-star" />
            <span className="text-sm font-semibold text-textGray">
              {product.rating} ({product.reviews} đánh giá)
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-black text-black mb-4 leading-tight">{product.name}</h1>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl font-black text-primary">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xl text-textLight line-through">
                {product.originalPrice.toLocaleString("vi-VN")}₫
              </span>
              <div className="bg-[#ff4444] text-white text-xs font-bold px-3 py-1 rounded">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </div>
            </>
          )}
        </div>

        {/* Color Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-black mb-4">Chọn Màu Sắc</h3>
          <div className="flex gap-4">
            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`w-14 h-14 rounded-full flex items-center justify-center border-4 ${
                  selectedColor === color ? "border-primary" : "border-transparent"
                }`}
              >
                <div
                  className="w-11 h-11 rounded-full shadow-md"
                  style={{ backgroundColor: color }}
                />
                {selectedColor === color && (
                  <Check className="w-4 h-4 text-white absolute" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-black mb-4">Chọn Kích Thước</h3>
          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 rounded-md border-2 font-bold ${
                  selectedSize === size
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {product.stock !== undefined && (
            <p className="text-sm text-textGray mt-3">Còn {product.stock} sản phẩm</p>
          )}
        </div>

        {/* Quantity */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-black mb-4">Số Lượng</h3>
          <div className="flex items-center gap-5">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-11 h-11 rounded-full bg-backgroundGray flex items-center justify-center text-2xl font-bold"
            >
              -
            </button>
            <span className="text-2xl font-bold min-w-[2.5rem] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-11 h-11 rounded-full bg-backgroundGray flex items-center justify-center text-2xl font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-black mb-4">Mô Tả Sản Phẩm</h3>
          {typeof product.description === 'string' ? (
            <p className="text-base text-textGray leading-relaxed">{product.description}</p>
          ) : (
            <div className="space-y-4">
              {product.description.map((item, index) => {
                if (item.type === 'text') {
                  return (
                    <p key={`desc-${index}`} className="text-base text-textGray leading-relaxed">
                      {item.content}
                    </p>
                  );
                } else if (item.type === 'image') {
                  return (
                    <div key={`desc-img-${index}`} className="relative h-60 rounded-lg overflow-hidden">
                      <Image src={item.url} alt="Product description" fill className="object-cover" />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-4">Đặc Điểm Nổi Bật</h3>
            <div className="space-y-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-base text-textGray">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-black">Đánh Giá Sản Phẩm</h3>
            {canReview && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-backgroundGray text-primary font-semibold px-4 py-2 rounded-full text-sm"
              >
                {showReviewForm ? "Đóng" : "Viết đánh giá"}
              </button>
            )}
          </div>

          {showReviewForm && canReview && (
            <div className="bg-backgroundGray p-5 rounded-lg mb-5">
              <p className="text-sm font-semibold text-black mb-3">Đánh giá của bạn</p>
              <div className="flex gap-2 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setReviewRating(star)}>
                    <Star
                      className={`w-8 h-8 ${star <= reviewRating ? "text-star fill-star" : "text-border"}`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-semibold text-black mb-3">Nhận xét</p>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Nhập nhận xét của bạn..."
                className="w-full border border-border rounded-lg p-3 text-base min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSubmitReview}
                className="mt-4 bg-primary text-white font-bold px-6 py-4 rounded-lg w-full"
              >
                Gửi Đánh Giá
              </button>
            </div>
          )}

          {productReviews.length === 0 ? (
            <p className="text-base text-textGray text-center py-8">Chưa có đánh giá nào</p>
          ) : (
            <div className="space-y-5">
              {productReviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {review.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-black">{review.userName}</p>
                        <p className="text-xs text-textGray">
                          {new Date(review.date).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-star fill-star" />
                      ))}
                    </div>
                  </div>
                  <p className="text-base text-textGray leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-black mb-4">Sản Phẩm Liên Quan</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/shop/product/${related.id}`}
                  className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-xl transition-shadow"
                >
                  <div
                    className="h-44 flex items-center justify-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${related.gradient[0]}, ${related.gradient[1]})`,
                    }}
                  >
                    <p className="text-4xl font-black text-white/20 text-center leading-tight">
                      UPF<br />50+
                    </p>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-bold text-black mb-2 line-clamp-2 min-h-[2.5rem]">
                      {related.name}
                    </h3>
                    <span className="text-base font-extrabold text-primary">
                      {related.price.toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border p-4 shadow-2xl z-40 safe-area-bottom">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-3">
          <button
            onClick={handleChatNow}
            className="col-span-1 border-2 border-primary rounded-lg py-2 flex flex-col items-center justify-center gap-1"
          >
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold text-primary text-center whitespace-nowrap">Chat ngay</span>
          </button>
          <button
            onClick={handleAddToCart}
            className="col-span-1 border-2 border-primary rounded-lg py-2 flex flex-col items-center justify-center gap-1"
          >
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold text-primary text-center whitespace-nowrap">Thêm giỏ</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="col-span-2 bg-primary rounded-lg py-3 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5 text-white" />
            <span className="text-base font-bold text-white whitespace-nowrap">Mua Ngay</span>
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}