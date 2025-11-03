export type ProductDescriptionItem = 
  | { type: 'text'; content: string }
  | { type: 'image'; url: string };

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string | ProductDescriptionItem[];
  category: string;
  badge?: string;
  colors: string[];
  sizes: string[];
  gradient: string[];
  image?: string;
  images?: string[];
  features?: string[];
  stock?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  parentCategoryId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  isDefault: boolean;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export interface OrderItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  shippingFee: number;
  discount: number;
  status: OrderStatus;
  address: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  affiliateCode?: string | null;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface AffiliateReferral {
  id: string;
  orderId: string;
  orderTotal: number;
  commission: number;
  status: 'pending' | 'confirmed' | 'paid';
  date: string;
  customerName: string;
}

export interface AffiliateStats {
  totalReferrals: number;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
  conversionRate: number;
  clicks: number;
}
