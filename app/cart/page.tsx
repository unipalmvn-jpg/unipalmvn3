"use client";

import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingCart, Edit3, Check, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { CartItem } from "@/types";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, totalPrice, updateVariant } = useCart();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleOpenEdit = (item: CartItem) => {
    setEditingItem(item);
    setNewColor(item.selectedColor);
    setNewSize(item.selectedSize);
  };

  const handleCloseEdit = () => {
    setEditingItem(null);
    setNewColor("");
    setNewSize("");
  };

  const handleSaveVariant = () => {
    if (!editingItem) return;

    updateVariant(
      editingItem.product.id,
      editingItem.selectedColor,
      editingItem.selectedSize,
      newColor,
      newSize
    );

    handleCloseEdit();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-backgroundGray pb-20">
        <div className="bg-white px-5 py-5">
          <h1 className="text-3xl font-black tracking-tight">Giỏ Hàng</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-10">
          <ShoppingCart className="w-20 h-20 text-textLight mb-5" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-black mb-3">Giỏ hàng trống</h2>
          <p className="text-base text-textGray text-center mb-8">
            Hãy thêm sản phẩm để tiếp tục mua sắm
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundGray pb-48">
      <div className="bg-white px-5 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-black tracking-tight">Giỏ Hàng</h1>
        <p className="text-sm font-semibold text-textGray">{items.length} sản phẩm</p>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-5 space-y-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="bg-white rounded-xl p-4 shadow-md flex gap-4">
            <div
              className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${item.product.gradient[0]}, ${item.product.gradient[1]})`,
              }}
            >
              <p className="text-xl font-black text-white/30 text-center leading-tight">
                UPF<br />50+
              </p>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-black mb-2 line-clamp-2">{item.product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-textGray">Màu:</span>
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: item.selectedColor }}
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-textGray font-semibold">Size: {item.selectedSize}</span>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="flex items-center gap-1 bg-backgroundGray px-2 py-1 rounded-xl"
                  >
                    <Edit3 className="w-3 h-3 text-primary" />
                    <span className="text-xs font-semibold text-primary">Đổi</span>
                  </button>
                </div>
                <p className="text-lg font-extrabold text-primary mb-2">
                  {item.product.price.toLocaleString("vi-VN")}₫
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.selectedColor,
                        item.selectedSize,
                        item.quantity - 1
                      )
                    }
                    className="w-8 h-8 rounded-full bg-backgroundGray flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-bold min-w-[1.5rem] text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.selectedColor,
                        item.selectedSize,
                        item.quantity + 1
                      )
                    }
                    className="w-8 h-8 rounded-full bg-backgroundGray flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                  className="p-2"
                >
                  <Trash2 className="w-5 h-5 text-[#ff4444]" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl p-5 shadow-md mt-6">
          <h3 className="text-lg font-bold text-black mb-4">Tóm Tắt Đơn Hàng</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-base text-textGray">Tạm tính</span>
              <span className="text-base font-semibold text-black">{totalPrice.toLocaleString("vi-VN")}₫</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base text-textGray">Phí vận chuyển</span>
              <span className="text-base font-semibold text-primary">Miễn phí</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="text-lg font-bold text-black">Tổng cộng</span>
              <span className="text-2xl font-black text-primary">{totalPrice.toLocaleString("vi-VN")}₫</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border p-4 shadow-2xl z-30 safe-area-bottom">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-textGray">Tổng Tiền</p>
            <p className="text-2xl font-black text-primary">{totalPrice.toLocaleString("vi-VN")}₫</p>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-primary hover:bg-primaryDark text-white font-bold px-9 py-4 rounded-lg shadow-lg transition-colors"
          >
            Thanh Toán
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-extrabold text-black">Đổi Phân Loại</h2>
              <button onClick={handleCloseEdit}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-base font-semibold text-textGray mb-6">{editingItem.product.name}</p>

            <div className="mb-6">
              <h3 className="text-base font-bold text-black mb-3">Chọn Màu Sắc</h3>
              <div className="flex gap-3 overflow-x-auto">
                {editingItem.product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setNewColor(color)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-4 flex-shrink-0 ${
                      newColor === color ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full shadow-md"
                      style={{ backgroundColor: color }}
                    />
                    {newColor === color && (
                      <Check className="w-4 h-4 text-white absolute" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-bold text-black mb-3">Chọn Kích Thước</h3>
              <div className="flex gap-3 flex-wrap">
                {editingItem.product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setNewSize(size)}
                    className={`px-5 py-3 rounded-lg border-2 font-bold ${
                      newSize === size
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveVariant}
              className="w-full bg-primary text-white font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Lưu Thay Đổi</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}