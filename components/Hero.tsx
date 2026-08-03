"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsap";
import Magnetic from "./Magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WebGLScene = dynamic(() => import("./WebGLScene"), { ssr: false });

const headline = ["DIGITAL", "EXPERIENCES", "BUILT", "TO", "LEAD."];
const stats = [
  { value: 200, suffix: "+", label: "PROJECTS DELIVERED" },
  { value: 100, suffix: "+", label: "CLIENTS SUPPORTED" },
  { value: 5, suffix: "★", label: "CLIENT EXPERIENCE" },
];

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const visual = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = heading.current?.querySelectorAll(".heroWordInner") ?? [];
      const introItems = section.current?.querySelectorAll(".heroIntroItem") ?? [];
      const counters =
        section.current?.querySelectorAll<HTMLElement>(".heroStatValue") ?? [];
      let played = false;

      const playHero = () => {
        if (played) return;
        played = true;

        const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });

        timeline
          .fromTo(
            ".heroEyebrow",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.58, ease: "power3.out" }
          )
          .fromTo(
            words,
            { yPercent: 108, rotate: 3.5 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 1.02,
              stagger: 0.052,
              ease: "power4.out",
            },
            "-=0.3"
          )
          .fromTo(
            introItems,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.66,
              stagger: 0.07,
              ease: "power3.out",
            },
            "-=0.55"
          )
          .fromTo(
            visual.current,
            { opacity: 0, scale: 0.9, rotate: 2.5 },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 1.22,
              ease: "expo.out",
            },
            "-=1"
          );

        counters.forEach((counter, index) => {
          const target = Number(counter.dataset.value || 0);
          const suffix = counter.dataset.suffix || "";
          const state = { value: 0 };
          counter.textContent = `0${suffix}`;

          timeline.to(
            state,
            {
              value: target,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                counter.textContent = `${Math.round(state.value)}${suffix}`;
              },
            },
            index === 0 ? "-=0.78" : "<0.08"
          );
        });
      };

      const readyFallback = window.setTimeout(playHero, 2850);
      window.addEventListener("apex:ready", playHero, { once: true });

      const copyTween = gsap.to(".heroCopy", {
        yPercent: 14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const visualTween = gsap.to(visual.current, {
        yPercent: 11,
        scale: 0.91,
        rotate: -3,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        window.clearTimeout(readyFallback);
        window.removeEventListener("apex:ready", playHero);
        copyTween.kill();
        visualTween.kill();
      };
    },
    { scope: section }
  );

  return (
    <section ref={section} className="hero" id="top">
      <div className="heroGrid" aria-hidden="true" />
      <div className="heroAura heroAuraOne" aria-hidden="true" />
      <div className="heroAura heroAuraTwo" aria-hidden="true" />

      <div className="heroCopy">
        <div className="heroEyebrow">
          <span className="liveDot" />
          WEB DEVELOPMENT COMPANY · SRI LANKA · WORLDWIDE
        </div>

        <h1 ref={heading}>
          {headline.map((word, index) => (
            <span
              className={`heroWord ${
                index === 1 || index === 4 ? "heroWordGradient" : ""
              }`}
              key={word}
            >
              <span className="heroWordInner">{word}</span>
            </span>
          ))}
        </h1>

        <div className="heroBottom">
          <p className="heroLead heroIntroItem">
            APEX WEB Studio is a web development company in Sri Lanka creating
            premium websites, e-commerce platforms and custom web applications
            for ambitious businesses locally and worldwide.
          </p>

          <div className="heroActions heroIntroItem">
            <Magnetic>
              <a className="primaryButton" href="#contact">
                <span>Start a project</span>
                <i>
                  <ArrowUpRight size={19} />
                </i>
              </a>
            </Magnetic>

            <Link className="showreelButton" href="/portfolio">
              <span>
                <Play size={14} fill="currentColor" />
              </span>
              Explore selected work
            </Link>
          </div>
        </div>

        <div className="heroMeta heroIntroItem" aria-label="Business statistics">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong
                className="heroStatValue"
                data-value={stat.value}
                data-suffix={stat.suffix}
              >
                {stat.value}{stat.suffix}
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={visual} className="heroVisual">
        <div className="heroVisualFrame">
          <WebGLScene />
          <div className="visualScanline" aria-hidden="true" />
          <div className="visualCorner visualCornerTop">
            <span>APX / CORE</span>
            <span>LIVE 01</span>
          </div>
          <div className="visualCorner visualCornerBottom">
            <span>INTERACTIVE WEBGL SYSTEM</span>
            <span>MOVE CURSOR</span>
          </div>
          <div className="visualData visualDataLeft">
            <i />
            <div>
              <span>PERFORMANCE</span>
              <strong>98.7</strong>
            </div>
          </div>
          <div className="visualData visualDataRight">
            <span>REAL-TIME</span>
            <div className="miniWave">
              {Array.from({ length: 13 }).map((_, index) => (
                <i key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="heroOrbit orbitD"></div>
        <div className="heroOrbit orbitE"></div>

        <div className="coreMesh meshOne"></div>
        <div className="coreMesh meshTwo"></div>
        <div className="coreMesh meshThree"></div>

        <div className="coreNode nodeA"></div>
        <div className="coreNode nodeB"></div>
        <div className="coreNode nodeC"></div>
        <div className="coreNode nodeD"></div>
      </div>

      <a className="scrollIndicator" href="#services" aria-label="Scroll down">
        <span>SCROLL</span>
        <i>
          <ArrowDown size={15} />
        </i>
      </a>
    </section>
  );
}
