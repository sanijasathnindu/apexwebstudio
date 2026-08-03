"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("apex-ready");

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      const completeLoading = () => {
        document.documentElement.classList.add("apex-ready");
        window.dispatchEvent(new Event("apex:ready"));
        setHidden(true);
      };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: completeLoading,
      });

      tl.fromTo(
        brand.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.62 }
      )
        .to(
          counter,
          {
            value: 100,
            duration: 1.32,
            ease: "power2.inOut",
            onUpdate: () => {
              if (number.current) {
                number.current.textContent = String(
                  Math.round(counter.value)
                ).padStart(3, "0");
              }
            },
          },
          0.1
        )
        .to(
          line.current,
          { scaleX: 1, duration: 1.32, ease: "power2.inOut" },
          0.1
        )
        .to(brand.current, { yPercent: -110, duration: 0.46 }, "+=0.02")
        .to(root.current, {
          yPercent: -100,
          duration: 0.82,
          ease: "expo.inOut",
        });
    }, root);

    return () => ctx.revert();
  }, []);

  if (hidden) return null;

  return (
    <div ref={root} className="preloader" aria-label="Loading website">
      <div className="preloaderGrid" aria-hidden="true" />
      <div className="preloaderInner">
        <div className="preloaderClip">
          <div ref={brand} className="preloaderBrand">
            <img src="/logo.svg" alt="" />
            <div>
              <strong>APEX</strong>
              <span>WEB STUDIO</span>
            </div>
          </div>
        </div>

        <div className="preloaderBottom">
          <span ref={number} className="preloaderNumber">
            000
          </span>
          <div className="preloaderLine">
            <div ref={line} />
          </div>
          <span className="preloaderLabel">INITIALISING EXPERIENCE</span>
        </div>
      </div>
    </div>
  );
}
