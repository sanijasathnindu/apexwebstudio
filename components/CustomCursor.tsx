"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const interactiveSelector =
  "a, button, input, textarea, select, [data-cursor='active']";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dotX = gsap.quickTo(dot.current, "x", {
      duration: 0.12,
      ease: "power3",
    });
    const dotY = gsap.quickTo(dot.current, "y", {
      duration: 0.12,
      ease: "power3",
    });
    const ringX = gsap.quickTo(ring.current, "x", {
      duration: 0.45,
      ease: "power3",
    });
    const ringY = gsap.quickTo(ring.current, "y", {
      duration: 0.45,
      ease: "power3",
    });

    const move = (event: MouseEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const over = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(interactiveSelector)) {
        ring.current?.classList.add("cursorRingActive");
      }
    };

    const out = (event: PointerEvent) => {
      const from = event.target;
      const to = event.relatedTarget;
      const leftInteractive =
        from instanceof Element && Boolean(from.closest(interactiveSelector));
      const enteredInteractive =
        to instanceof Element && Boolean(to.closest(interactiveSelector));

      if (leftInteractive && !enteredInteractive) {
        ring.current?.classList.remove("cursorRingActive");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursorDot" aria-hidden="true" />
      <div ref={ring} className="cursorRing" aria-hidden="true">
        <span>VIEW</span>
      </div>
    </>
  );
}
