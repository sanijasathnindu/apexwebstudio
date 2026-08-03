"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,

      // Enables links such as #services and #contact
      anchors: {
        // Prevents the fixed navigation from covering the section title
        offset: -110,
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const scrollToCurrentHash = () => {
      const hash = window.location.hash;

      if (!hash) {
        return;
      }

      const target = document.querySelector(hash);

      if (!target) {
        return;
      }

      window.requestAnimationFrame(() => {
        lenis.scrollTo(target as HTMLElement, {
          offset: -110,
          duration: 1.15,
        });
      });
    };

    // Handles links coming from /portfolio to /#services
    const hashTimer = window.setTimeout(
      scrollToCurrentHash,
      150
    );

    window.addEventListener(
      "hashchange",
      scrollToCurrentHash
    );

    return () => {
      window.clearTimeout(hashTimer);

      window.removeEventListener(
        "hashchange",
        scrollToCurrentHash
      );

      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}