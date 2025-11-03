"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, CreditCard, Wallet, Smartphone, Tag, ChevronRight, Check, Gift } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAddresses } from "@/contexts/AddressContext";
import { useOrders } from "@/contexts/OrderContext";
import { useAffiliate } from "@/contexts/AffiliateContext";
import { useGiftCards } from "@/contexts/GiftCardContext";

const PAYMENT_METHODS = [
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng (COD)",
    icon: Wallet,
    description: "Thanh toán trực tiếp cho shipper",
  },
  {
    id: "bank",
    name: "Chuyển khoản ngân hàng",
    icon: CreditCard,
    description: "Chuyển khoản qua VietQR",
  },
  {
    id: "momo",
    name: "Ví MoMo",
    icon: Smartphone,
    description: "Thanh toán qua ví điện tử MoMo",
  },
];

const VOUCHERS = [
  { id: "NEWUSER10", discount: 10, type: "percentage", minOrder: 0, description: "Giảm 10% cho khách hàng mới" },
  { id: "SALE50K", discount: 50000, type: "fixed", minOrder: 500000, description: "Giảm 50k cho đơn từ 500k" },
  { id: "FREESHIP", discount: 30000, type: "shipping", minOrder: 300000, description: "Miễn phí vận chuyển cho đơn từ 300k" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { addresses, getDefaultAddress } = useAddresses();
  const { createOrder } = useOrders();
  const { validateAffiliateCode } = useAffiliate();
  const { validateGiftCard, redeemGiftCard } = useGiftCards();

  const [selectedAddress] = useState(getDefaultAddress() || addresses[0]);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<typeof VOUCHERS[0] | null>(null);
  const [affiliateCode, setAffiliateCode] = useState("");
  const [appliedAffiliateCode, setAppliedAffiliateCode] = useState<string | null>(null);
  const [giftCardCode, setGiftCardCode] = useState("");
  const [appliedGiftCard, setAppliedGiftCard] = useState<{code: string; amount: number} | null>(null);
  const [note, setNote] = useState("");

  const shippingFee = 30000;
  const voucherDiscount = appliedVoucher
    ? appliedVoucher.type === "percentage"
      ? (totalPrice * appliedVoucher.discount) / 100
      : appliedVoucher.type === "fixed"
      ? appliedVoucher.discount
      : appliedVoucher.type === "shipping"
      ? shippingFee
      : 0
    : 0;

  const giftCardDiscount = appliedGiftCard ? appliedGiftCard.amount : 0;
  const discount = voucherDiscount + giftCardDiscount;
  const finalTotal = totalPrice + shippingFee - discount;

  const handleApplyVoucher = () => {
    const voucher = VOUCHERS.find((v) => v.id === voucherCode.toUpperCase());
    if (voucher && totalPrice >= voucher.minOrder) {
      setAppliedVoucher(voucher);
    }
  };

  const handleApplyAffiliateCode = () => {
    if (validateAffiliateCode(affiliateCode.toUpperCase())) {
      setAppliedAffiliateCode(affiliateCode.toUpperCase());
    } else {
      alert("Mã giới thiệu không hợp lệ");
    }
  };

  const handleApplyGiftCard = () => {
    const validation = validateGiftCard(giftCardCode.toUpperCase());
    if (validation.valid && validation.card) {
      const maxDiscount = Math.min(validation.card.balance, finalTotal);
      setAppliedGiftCard({
        code: giftCardCode.toUpperCase(),
        amount: maxDiscount,
      });
    } else {
      alert(validation.error || "Mã gift card không hợp lệ");
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) return;

    const orderItems = items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
      price: item.product.price,
    }));

    if (appliedGiftCard) {
      const success = redeemGiftCard(
        appliedGiftCard.code,
        appliedGiftCard.amount,
        `ORDER${Date.now()}`
      );
      if (!success) {
        alert("Không thể áp dụng gift card");
        return;
      }
    }

    const order = createOrder(
      orderItems,
      selectedAddress,
      selectedPayment,
      shippingFee,
      discount,
      appliedAffiliateCode
    );
    clearCart();
    router.push(`/order-success?orderId=${order.id}`);
  };

  return (
    <div className="min-h-screen bg-backgroundGray pb-32">
      <div className="bg-white px-5 py-5">
        <h1 className="text-3xl font-black tracking-tight">Thanh Toán</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Address */}
        <div className="bg-white p-5 mb-3">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-black">Địa Chỉ Giao Hàng</h2>
          </div>
          {selectedAddress ? (
            <Link
              href="/address-select"
              className="flex items-center justify-between p-4 bg-backgroundGray rounded-lg border border-primary"
            >
              <div>
                <p className="text-base font-bold text-black mb-1">{selectedAddress.name}</p>
                <p className="text-sm text-textGray mb-2">{selectedAddress.phone}</p>
                <p className="text-sm text-textGray line-clamp-2">
                  {selectedAddress.address}, {selectedAddress.ward}, {selectedAddress.district}, {selectedAddress.city}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-textGray" />
            </Link>
          ) : (
            <Link
              href="/address-add"
              className="block p-5 bg-backgroundGray rounded-lg border border-dashed border-border text-center"
            >
              <p className="text-base font-semibold text-primary">+ Thêm Địa Chỉ Giao Hàng</p>
            </Link>
          )}
        </div>

        {/* Products */}
        <div className="bg-white p-5 mb-3">
          <h2 className="text-lg font-bold text-black mb-4">Sản Phẩm ({items.length})</h2>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between py-3 border-b border-border last:border-0">
              <div className="flex-1">
                <p className="text-sm font-semibold text-black mb-1 line-clamp-2">{item.product.name}</p>
                <p className="text-xs text-textGray">
                  Màu: {item.selectedColor} | Size: {item.selectedSize}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-textGray mb-1">x{item.quantity}</p>
                <p className="text-base font-bold text-primary">
                  {(item.product.price * item.quantity).toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Voucher */}
        <div className="bg-white p-5 mb-3">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-black">Mã Giảm Giá</h2>
          </div>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="flex-1 h-12 bg-backgroundGray rounded-lg px-4 text-base font-semibold outline-none"
            />
            <button
              onClick={handleApplyVoucher}
              className="bg-primary text-white font-bold px-6 rounded-lg"
            >
              Áp Dụng
            </button>
          </div>
          {appliedVoucher && (
            <div className="flex items-center gap-2 p-3 bg-backgroundGray rounded-lg border border-primary mb-4">
              <Check className="w-4 h-4 text-primary" />
              <p className="text-sm text-primary font-semibold">{appliedVoucher.description}</p>
            </div>
          )}
          <div className="space-y-3">
            {VOUCHERS.map((voucher) => (
              <button
                key={voucher.id}
                onClick={() => setVoucherCode(voucher.id)}
                className="w-full p-3 bg-backgroundGray rounded-lg border border-border text-left"
              >
                <p className="text-sm font-bold text-primary mb-1">{voucher.id}</p>
                <p className="text-xs text-textGray">{voucher.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-5 mb-3">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-black">Phương Thức Thanh Toán</h2>
          </div>
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={`w-full flex items-center p-4 bg-backgroundGray rounded-lg mb-3 border ${
                selectedPayment === method.id ? "border-primary bg-white" : "border-border"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4">
                <method.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base font-semibold text-black mb-1">{method.name}</p>
                <p className="text-xs text-textGray">{method.description}</p>
              </div>
              {selectedPayment === method.id && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-5 mb-3">
          <h2 className="text-lg font-bold text-black mb-4">Chi Tiết Thanh Toán</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-textGray">Tạm tính</span>
              <span className="text-sm font-semibold text-black">{totalPrice.toLocaleString("vi-VN")}₫</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-textGray">Phí vận chuyển</span>
              <span className="text-sm font-semibold text-black">{shippingFee.toLocaleString("vi-VN")}₫</span>
            </div>
            {voucherDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-textGray">Giảm giá voucher</span>
                <span className="text-sm font-semibold text-[#ff4444]">
                  -{voucherDiscount.toLocaleString("vi-VN")}₫
                </span>
              </div>
            )}
            {giftCardDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-textGray">Gift card</span>
                <span className="text-sm font-semibold text-[#ff4444]">
                  -{giftCardDiscount.toLocaleString("vi-VN")}₫
                </span>
              </div>
            )}
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="text-base font-bold text-black">Tổng cộng</span>
              <span className="text-xl font-black text-primary">{finalTotal.toLocaleString("vi-VN")}₫</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-2xl z-30">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-textGray">Tổng Thanh Toán</p>
            <p className="text-2xl font-black text-primary">{finalTotal.toLocaleString("vi-VN")}₫</p>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedAddress}
            className="bg-primary hover:bg-primaryDark text-white font-bold px-9 py-4 rounded-lg shadow-lg transition-colors disabled:bg-textLight disabled:cursor-not-allowed"
          >
            Đặt Hàng
          </button>
        </div>
      </div>
    </div>
  );
}