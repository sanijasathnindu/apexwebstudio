"use client";

import { useRef } from "react";
import {
  ArrowUpRight,
  Blocks,
  Boxes,
  ChartNoAxesCombined,
  ShoppingBag,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    icon: Blocks,
    title: "Web design & development",
    text: "Responsive business websites designed and developed around your market position, audience behaviour and conversion goals.",
    tags: ["Strategy", "UI/UX", "Development"],
    accent: "violet",
  },
  {
    number: "02",
    icon: Boxes,
    title: "Custom web applications",
    text: "Custom portals, dashboards and web applications engineered to simplify complex workflows and unlock scale.",
    tags: ["Architecture", "APIs", "Automation"],
    accent: "blue",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "E-commerce development",
    text: "Fast e-commerce websites combining product storytelling, frictionless buying, payment integrations and scalable operations.",
    tags: ["Commerce", "Payments", "Growth"],
    accent: "cyan",
  },
  {
    number: "04",
    icon: ChartNoAxesCombined,
    title: "Technical SEO & performance",
    text: "Technical SEO, speed, analytics and iterative optimisation that convert your platform into a long-term growth asset.",
    tags: ["SEO", "Analytics", "CRO"],
    accent: "amber",
  },
];

export default function Services() {
  const section = useRef<HTMLElement>(null);
  const pinArea = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        if (
          !section.current ||
          !pinArea.current ||
          !track.current
        ) {
          return;
        }

        const pinElement = pinArea.current;
        const trackElement = track.current;

        /*
         * The pin wrapper becomes a full-screen area.
         * This centres the service cards vertically before
         * horizontal scrolling begins.
         */
        gsap.set(pinElement, {
          position: "relative",
          width: "100%",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        });

        gsap.set(trackElement, {
          x: 0,
        });

        const getDistance = () =>
          Math.max(
            0,
            trackElement.scrollWidth -
              pinElement.clientWidth +
              90
          );

        gsap.to(trackElement, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            /*
             * Pin only the horizontal card area.
             * The section heading remains above it normally.
             */
            trigger: pinElement,
            start: "top top",
            end: () =>
              `+=${getDistance() + window.innerHeight * 1.15}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const refreshFrame = window.requestAnimationFrame(
          () => {
            ScrollTrigger.refresh();
          }
        );

        return () => {
          window.cancelAnimationFrame(refreshFrame);
        };
      });

      gsap.fromTo(
        ".servicesIntro > *",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 76%",
            end: "top 45%",
            scrub: 1,
          },
        }
      );

      return () => mm.revert();
    },
    {
      scope: section,
    }
  );

  return (
    <section
      ref={section}
      className="services"
      id="services"
    >
      <div className="servicesIntro">
        <span className="sectionCode">
          01 / CAPABILITIES
        </span>

        <h2>
          Not a supplier.
          <br />
          <em>A digital advantage.</em>
        </h2>

        <p>
          Web design, web development, e-commerce and SEO
          expertise from Sri Lanka, delivered for ambitious
          businesses locally and worldwide.
        </p>
      </div>

      <div
        ref={pinArea}
        className="servicesPin"
      >
        <div
          ref={track}
          className="servicesTrack"
        >
          <article className="serviceLeadCard">
            <span>WHAT WE BUILD</span>

            <strong>
              Digital products that look impossible to copy.
            </strong>

            <div className="serviceLeadOrb">
              <i />
              <i />
              <i />
            </div>
          </article>

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className={`serviceCard service-${service.accent}`}
                key={service.number}
              >
                <div className="serviceCardTop">
                  <span>{service.number}</span>

                  <Icon
                    size={32}
                    strokeWidth={1.35}
                  />
                </div>

                <div className="serviceCardBody">
                  <h3>{service.title}</h3>

                  <p>{service.text}</p>

                  <div className="serviceTags">
                    {service.tags.map((tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  aria-label={`Discuss ${service.title}`}
                >
                  Discuss service
                  <ArrowUpRight size={17} />
                </a>

                <div
                  className="serviceCardGlow"
                  aria-hidden="true"
                />
              </article>
            );
          })}

          <article className="serviceEndCard">
            <span>HAVE SOMETHING DIFFERENT?</span>

            <strong>Challenge us.</strong>

            <p>
              The strongest projects rarely fit inside a
              standard service list.
            </p>

            <a href="#contact">
              Tell us the idea
              <ArrowUpRight />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}