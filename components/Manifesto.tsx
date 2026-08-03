"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const words = [
  "WE",
  "CREATE",
  "THE",
  "KIND",
  "OF",
  "DIGITAL",
  "PRESENCE",
  "YOUR",
  "COMPETITORS",
  "WISH",
  "THEY",
  "HAD.",
];

const sentence = words.join(" ");

export default function Manifesto() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const letters = section.current?.querySelectorAll(".manifestoLetter");

      gsap.fromTo(
        letters ?? [],
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.015,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top 72%",
            end: "bottom 58%",
            scrub: true,
          },
        }
      );

      gsap.to(".manifestoOrb", {
        rotate: 240,
        xPercent: 20,
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: section }
  );

  return (
    <section ref={section} className="manifesto" id="studio">
      <div className="manifestoGrid" />
      <div className="manifestoOrb">
        <i />
        <i />
        <i />
      </div>

      <div className="manifestoTop">
        <span>04 / THE STANDARD</span>
        <span>APEX WEB STUDIO · 2026</span>
      </div>

      <h2 aria-label={sentence}>
        {words.map((word, wordIndex) => (
          <span className="manifestoWord" key={`${word}-${wordIndex}`}>
            {word.split("").map((character, characterIndex) => (
              <span
                className="manifestoLetter"
                key={`${character}-${wordIndex}-${characterIndex}`}
              >
                {character}
              </span>
            ))}
          </span>
        ))}
      </h2>

      <div className="manifestoStats">
        <div>
          <strong>01</strong>
          <span>
            ORIGINAL
            <br />
            CREATIVE DIRECTION
          </span>
        </div>
        <div>
          <strong>02</strong>
          <span>
            SENIOR-LEVEL
            <br />
            TECHNICAL THINKING
          </span>
        </div>
        <div>
          <strong>03</strong>
          <span>
            BUSINESS-FIRST
            <br />
            DIGITAL EXECUTION
          </span>
        </div>
      </div>
    </section>
  );
}
