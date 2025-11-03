"use client";

import { useAnimation } from "@/contexts/AnimationContext";
import Image from "next/image";

export default function FlyToCartAnimator() {
  const { animationState } = useAnimation();
  const { isAnimating, image, startRect, endRect } = animationState;

  if (!isAnimating || !image || !startRect || !endRect) {
    return null;
  }

  const style = {
    '--start-top': `${startRect.top}px`,
    '--start-left': `${startRect.left}px`,
    '--start-width': `${startRect.width}px`,
    '--start-height': `${startRect.height}px`,
    '--end-top': `${endRect.top + endRect.height / 2}px`,
    '--end-left': `${endRect.left + endRect.width / 2}px`,
  } as React.CSSProperties;

  return (
    <div
      className="fly-to-cart-animation fixed z-[9999] rounded-lg overflow-hidden"
      style={style}
    >
      <Image src={image} alt="animating product" fill className="object-cover" />
    </div>
  );
}