"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";

export default function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);

  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = element.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(node, {
      x: x * strength,
      y: y * strength,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const reset = () => {
    gsap.to(element.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.35)",
    });
  };

  return (
    <div
      ref={element}
      className={className}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}
