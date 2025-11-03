"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { AddressProvider } from "@/contexts/AddressContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PromoProvider } from "@/contexts/PromoContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { LoyaltyProvider } from "@/contexts/LoyaltyContext";
import { AffiliateProvider } from "@/contexts/AffiliateContext";
import { ReviewProvider } from "@/contexts/ReviewContext";
import { ChatSupportProvider } from "@/contexts/ChatSupportContext";
import { GiftCardProvider } from "@/contexts/GiftCardContext";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ChatSupportProvider>
            <AnimationProvider>
              <GiftCardProvider>
                <AffiliateProvider>
                  <LoyaltyProvider>
                    <PromoProvider>
                      <OrderProvider>
                        <ReviewProvider>
                          <AddressProvider>
                            <CartProvider>
                              <WishlistProvider>
                                <ComparisonProvider>
                                  <RecentlyViewedProvider>
                                    {children}
                                  </RecentlyViewedProvider>
                                </ComparisonProvider>
                              </WishlistProvider>
                            </CartProvider>
                          </AddressProvider>
                        </ReviewProvider>
                      </OrderProvider>
                    </PromoProvider>
                  </LoyaltyProvider>
                </AffiliateProvider>
              </GiftCardProvider>
            </AnimationProvider>
          </ChatSupportProvider>
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}