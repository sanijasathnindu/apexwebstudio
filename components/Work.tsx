"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsap";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Luxury property platform",
    category: "STRATEGY · WEB DESIGN · DEVELOPMENT",
    description:
      "A cinematic discovery experience designed to turn premium listings into high-intent enquiries.",
    metrics: [
      ["+41%", "Qualified leads"],
      ["1.3s", "Core page load"],
    ],
    type: "property",
  },
  {
    number: "02",
    title: "Next-generation commerce",
    category: "E-COMMERCE · UI/UX · MOTION",
    description:
      "A high-speed retail experience balancing editorial storytelling with a direct, effortless purchase path.",
    metrics: [
      ["+33%", "Conversion rate"],
      ["+24%", "Average order value"],
    ],
    type: "commerce",
  },
  {
    number: "03",
    title: "Operational intelligence",
    category: "PLATFORM · AUTOMATION · DATA",
    description:
      "A custom control centre that turns fragmented activity into real-time decisions, accountability and clarity.",
    metrics: [
      ["-62%", "Manual reporting"],
      ["24/7", "Live visibility"],
    ],
    type: "dashboard",
  },
];

function ProjectVisual({ type }: { type: string }) {
  if (type === "property") {
    return (
      <div className="propertyVisual">
        <div className="visualBrowserBar">
          <i />
          <i />
          <i />
          <span>living.apex</span>
        </div>
        <div className="propertyScene">
          <div className="propertyNav">
            <strong>MONOLITH</strong>
            <span>Residences · Journal · Contact</span>
          </div>
          <div className="propertyHeadline">
            <small>ARCHITECTURE FOR LIVING</small>
            <strong>Space that changes your perspective.</strong>
            <button>Explore residences ↗</button>
          </div>
          <div className="propertyBuilding p1" />
          <div className="propertyBuilding p2" />
          <div className="propertyBuilding p3" />
          <div className="propertySun" />
        </div>
      </div>
    );
  }

  if (type === "commerce") {
    return (
      <div className="commerceVisual">
        <div className="commerceBackdrop">
          <span>NEW FORM / 26</span>
          <strong>OBJECTS<br />FOR MOTION</strong>
        </div>
        <div className="commercePhone">
          <div className="phoneTop">
            <strong>FORMA</strong>
            <span>••</span>
          </div>
          <div className="productStage">
            <div className="productHalo" />
            <div className="productObject">
              <i />
              <span>F</span>
            </div>
          </div>
          <div className="productDetails">
            <small>FORM 01 · GRAPHITE</small>
            <strong>Everyday carry, redefined.</strong>
            <div>
              <b>$120</b>
              <button>ADD TO BAG</button>
            </div>
          </div>
        </div>
        <div className="commerceMetric">
          <span>LIVE CONVERSION</span>
          <strong>4.82%</strong>
          <div>
            {Array.from({ length: 9 }).map((_, index) => (
              <i key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboardVisual">
      <div className="dashSidebar">
        <img src="/logo.svg" alt="" />
        {Array.from({ length: 5 }).map((_, index) => (
          <i key={index} className={index === 0 ? "active" : ""} />
        ))}
      </div>
      <div className="dashContent">
        <div className="dashTop">
          <div>
            <small>COMMAND CENTRE</small>
            <strong>Performance overview</strong>
          </div>
          <span>LIVE · 16:24</span>
        </div>
        <div className="dashMetrics">
          <div>
            <small>REVENUE</small>
            <strong>84.2K</strong>
            <span>+18.4%</span>
          </div>
          <div>
            <small>PIPELINE</small>
            <strong>217K</strong>
            <span>+31.7%</span>
          </div>
          <div>
            <small>OPERATIONS</small>
            <strong>96.8</strong>
            <span>OPTIMAL</span>
          </div>
        </div>
        <div className="dashGraph">
          <span>GROWTH VELOCITY</span>
          <svg viewBox="0 0 700 230" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a86cff" stopOpacity=".52" />
                <stop offset="100%" stopColor="#a86cff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 194 C48 185 68 154 112 165 C157 176 177 111 232 123 C285 134 303 78 356 97 C410 116 440 48 493 63 C545 77 586 22 630 38 C664 50 680 27 700 12 L700 230 L0 230 Z"
              fill="url(#area)"
            />
            <path
              d="M0 194 C48 185 68 154 112 165 C157 176 177 111 232 123 C285 134 303 78 356 97 C410 116 440 48 493 63 C545 77 586 22 630 38 C664 50 680 27 700 12"
              fill="none"
              stroke="#bc8cff"
              strokeWidth="5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project");

      cards.forEach((card) => {
        const visual = card.querySelector(".projectVisual");
        const copy = card.querySelector(".projectCopy");

        gsap.fromTo(
          visual,
          { clipPath: "inset(10% 10% 10% 10% round 34px)", scale: 0.9 },
          {
            clipPath: "inset(0% 0% 0% 0% round 34px)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 32%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          copy,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 76%",
              end: "top 48%",
              scrub: 1,
            },
          }
        );

        gsap.to(visual, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: section }
  );

  const tilt = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(element, {
      rotateY: x * 4,
      rotateX: y * -3,
      transformPerspective: 1200,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const resetTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, .45)",
    });
  };

  return (
    <section ref={section} className="work" id="work">
      <div className="workHeading">
        <span className="sectionCode">02 / SELECTED WORK</span>
        <h2>
          Proof, not
          <br />
          <em>promises.</em>
        </h2>
        <p>
          Join with us on a journey through our most impactful projects, where strategy meets design and innovation drives results. Each case study showcases our commitment to excellence and the tangible outcomes we deliver for our clients.
        </p>
      </div>

      <div className="projectList">
        {projects.map((project) => (
          <article className={`project project-${project.type}`} key={project.number}>
            <div className="projectCopy">
              <div className="projectTopline">
                <span>{project.number}</span>
                <span>{project.category}</span>
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="projectMetrics">
                {project.metrics.map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <Link href="/portfolio">
                View case study
                <ArrowUpRight size={18} />
              </Link>
            </div>

            <div
              className="projectVisual"
              data-cursor="active"
              onMouseMove={tilt}
              onMouseLeave={resetTilt}
            >
              <ProjectVisual type={project.type} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
