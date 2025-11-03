"use client";

import createContextHook from "@/lib/create-context-hook";
import { useState, useMemo, RefObject } from "react";

interface AnimationState {
  isAnimating: boolean;
  image: string | null;
  startRect: DOMRect | null;
  endRect: DOMRect | null;
}

export const [AnimationProvider, useAnimation] = createContextHook(() => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isAnimating: false,
    image: null,
    startRect: null,
    endRect: null,
  });
  const [cartIconRect, setCartIconRect] = useState<DOMRect | null>(null);

  const flyToCart = (image: string, startElementRef: RefObject<HTMLElement>) => {
    if (startElementRef.current && cartIconRect) {
      setAnimationState({
        isAnimating: true,
        image,
        startRect: startElementRef.current.getBoundingClientRect(),
        endRect: cartIconRect,
      });

      setTimeout(() => {
        setAnimationState({
          isAnimating: false,
          image: null,
          startRect: null,
          endRect: null,
        });
      }, 800);
    }
  };

  return useMemo(
    () => ({
      animationState,
      flyToCart,
      setCartIconRect,
    }),
    [animationState]
  );
});