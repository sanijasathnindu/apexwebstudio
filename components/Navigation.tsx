"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import Magnetic from "./Magnetic";

const navigationItems = [
  { label: "Services", homeHash: "services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", homeHash: "process" },
  { label: "Studio", homeHash: "studio" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  const resolveHref = (item: (typeof navigationItems)[number]) => {
    if (item.href) return item.href;
    return pathname === "/" ? `#${item.homeHash}` : `/#${item.homeHash}`;
  };

  const contactHref = pathname === "/" ? "#contact" : "/#contact";

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const value = height > 0 ? window.scrollY / height : 0;

      gsap.set(progress.current, { scaleX: value });
      nav.current?.classList.toggle("navScrolled", window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu.current) return;

    const items = menu.current.querySelectorAll(".mobileNavItem");

    if (open) {
      document.body.classList.add("menuOpen");
      gsap.set(menu.current, { display: "flex" });
      gsap
        .timeline()
        .fromTo(
          menu.current,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.75,
            ease: "expo.inOut",
          }
        )
        .fromTo(
          items,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.25"
        );
    } else {
      document.body.classList.remove("menuOpen");
      gsap.to(menu.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.65,
        ease: "expo.inOut",
        onComplete: () => {
          if (menu.current) gsap.set(menu.current, { display: "none" });
        },
      });
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header ref={nav} className="navigation">
        <div ref={progress} className="scrollProgress" />

        <Link className="brand" href="/" aria-label="APEX WEB Studio home">
          <img src="/logo.svg" alt="" />
          <span>
            <strong>APEX</strong>
            <small>WEB STUDIO</small>
          </span>
        </Link>

        <nav className="desktopNav" aria-label="Primary navigation">
          {navigationItems.map((item) => {
            const href = resolveHref(item);
            const active = item.href === "/portfolio" && pathname.startsWith("/portfolio");

            return (
              <Link
                key={item.label}
                href={href}
                className={active ? "navActive" : undefined}
              >
                <span>{item.label}</span>
                <i />
              </Link>
            );
          })}
        </nav>

        <Magnetic className="desktopStart">
          <Link className="navCta" href={contactHref}>
            Start a project
            <ArrowUpRight size={15} strokeWidth={1.8} />
          </Link>
        </Magnetic>

        <button
          type="button"
          className="mobileMenuButton"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div ref={menu} className="mobileMenu" aria-hidden={!open}>
        <div className="mobileMenuNoise" />
        <nav>
          {navigationItems.map((item, index) => (
            <div className="mobileNavClip" key={item.label}>
              <Link
                className="mobileNavItem"
                href={resolveHref(item)}
                onClick={() => setOpen(false)}
              >
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight />
              </Link>
            </div>
          ))}
          <div className="mobileNavClip">
            <Link
              className="mobileNavItem mobileNavContact"
              href={contactHref}
              onClick={() => setOpen(false)}
            >
              <span>05</span>
              Start a project
              <ArrowUpRight />
            </Link>
          </div>
        </nav>

        <div className="mobileMenuFooter">
          <span>NEGOMBO · SRI LANKA</span>
          <span>AVAILABLE WORLDWIDE</span>
        </div>
      </div>
    </>
  );
}
