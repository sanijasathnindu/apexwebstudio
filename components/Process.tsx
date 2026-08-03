"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover the leverage",
    text: "We interrogate the business, users, market, content and technical reality until the strongest opportunity becomes clear.",
  },
  {
    number: "02",
    title: "Define the experience",
    text: "Information architecture, user journeys and interface direction are designed around attention, trust and action.",
  },
  {
    number: "03",
    title: "Engineer the system",
    text: "We develop the product with maintainable architecture, responsive behaviour, performance and accessibility built in.",
  },
  {
    number: "04",
    title: "Launch with control",
    text: "Testing, analytics, deployment and training create a controlled launch instead of a risky handover.",
  },
  {
    number: "05",
    title: "Evolve through evidence",
    text: "Real usage data guides optimisation, new capabilities and the next stage of digital growth.",
  },
];

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".processSteps",
            start: "top 68%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".processStep").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.22 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: step,
              start: "top 63%",
              end: "bottom 47%",
              scrub: true,
              toggleActions: "play reverse play reverse",
            },
          }
        );

        gsap.fromTo(
          step.querySelectorAll("h3, p"),
          { y: 34 },
          {
            y: 0,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              end: "top 48%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: section }
  );

  return (
    <section ref={section} className="process" id="process">
      <div className="processSticky">
        <span className="sectionCode">03 / PROCESS</span>
        <h2>
          Precision before
          <br />
          <em>decoration.</em>
        </h2>
        <p>
          Our process removes ambiguity early, protects quality during
          development and keeps every decision tied to business value.
        </p>

        <div className="processSignal">
          <i />
          <span>STRUCTURED FOR SPEED, QUALITY AND CONTROL</span>
        </div>
      </div>

      <div className="processSteps">
        <div className="processRail">
          <div ref={fill} className="processFill" />
        </div>

        {steps.map((step) => (
          <article className="processStep" key={step.number}>
            <span className="processNumber">{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
