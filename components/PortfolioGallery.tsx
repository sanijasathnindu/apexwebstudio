"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import {
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
  type PortfolioProject,
  type PortfolioVisual,
} from "@/data/portfolio";

function GeneratedVisual({ type }: { type: PortfolioVisual }) {
  return (
    <div className={`portfolioGenerated portfolioGenerated-${type}`}>
      <div className="portfolioWindowBar">
        <i />
        <i />
        <i />
        <span>apex / selected work</span>
      </div>

      {type === "property" && (
        <div className="pfProperty">
          <div>
            <small>EXCEPTIONAL LIVING</small>
            <strong>Space with a different perspective.</strong>
          </div>
          <i className="pfBuilding pfBuildingOne" />
          <i className="pfBuilding pfBuildingTwo" />
          <i className="pfBuilding pfBuildingThree" />
        </div>
      )}

      {type === "commerce" && (
        <div className="pfCommerce">
          <div className="pfCommerceWords">FORM / OBJECT / MOTION</div>
          <div className="pfPhone">
            <span>FORMA</span>
            <div className="pfProduct">F</div>
            <strong>Future Form</strong>
          </div>
        </div>
      )}

      {type === "dashboard" && (
        <div className="pfDashboard">
          <aside>
            <b>A</b>
            <i />
            <i />
            <i />
          </aside>
          <div>
            <small>PERFORMANCE OVERVIEW</small>
            <div className="pfMetrics">
              <span><b>84.2K</b> REVENUE</span>
              <span><b>96.8</b> OPERATIONS</span>
            </div>
            <svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 160 C70 150 86 105 145 123 C202 140 229 61 291 87 C350 111 397 33 458 53 C510 70 549 20 600 10" fill="none" stroke="currentColor" strokeWidth="5" />
            </svg>
          </div>
        </div>
      )}

      {type === "hospitality" && (
        <div className="pfHospitality">
          <div className="pfMoon" />
          <span>LUNAR</span>
          <strong>Ocean nights.<br />Elevated.</strong>
          <i>RESERVE ↗</i>
        </div>
      )}

      {type === "corporate" && (
        <div className="pfCorporate">
          <nav>NEXORA <span>Services · Insights · Contact</span></nav>
          <strong>Clarity that moves business forward.</strong>
          <div className="pfCorporateCards"><i /><i /><i /></div>
        </div>
      )}

      {type === "technology" && (
        <div className="pfTechnology">
          <div className="pfTechOrb"><i /><i /><i /></div>
          <small>QUANTUM / SYSTEM 01</small>
          <strong>Complex technology.<br />Clear experience.</strong>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <article
      id={project.slug}
      className={`portfolioCard ${project.featured ? "portfolioCardFeatured" : ""}`}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div className="portfolioCardVisual" data-cursor="active">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} website project by APEX WEB Studio`}
            fill
            sizes="(max-width: 1180px) 100vw, 65vw"
            className="portfolioProjectImage"
          />
        ) : (
          <GeneratedVisual type={project.visual} />
        )}
        <span className="portfolioCardIndex">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="portfolioCardCopy">
        <div className="portfolioCardMeta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <div className="portfolioServices">
          {project.services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
        <div className="portfolioResult">
          <small>PROJECT OUTCOME</small>
          <strong>{project.result}</strong>
        </div>
        <a
          href={project.liveUrl || "/#contact"}
          target={project.liveUrl ? "_blank" : undefined}
          rel={project.liveUrl ? "noreferrer" : undefined}
        >
          {project.liveUrl ? "Visit project" : "Build something like this"}
          <ArrowUpRight size={18} />
        </a>
      </div>
    </article>
  );
}

export default function PortfolioGallery() {
  const [filter, setFilter] = useState<"All" | PortfolioCategory>("All");
  const grid = useRef<HTMLDivElement>(null);

  const projects = useMemo(
    () =>
      filter === "All"
        ? portfolioProjects
        : portfolioProjects.filter((project) => project.category === filter),
    [filter]
  );

  useEffect(() => {
    const cards = grid.current?.querySelectorAll(".portfolioCard") ?? [];
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.985 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.62,
        stagger: 0.065,
        ease: "power3.out",
      }
    );
  }, [filter]);

  return (
    <section className="portfolioGallery" aria-labelledby="portfolio-title">
      <div className="portfolioFilters" role="group" aria-label="Filter portfolio projects">
        {portfolioCategories.map((category) => (
          <button
            type="button"
            key={category}
            className={filter === category ? "portfolioFilterActive" : undefined}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
            <span>
              {category === "All"
                ? portfolioProjects.length
                : portfolioProjects.filter((project) => project.category === category).length}
            </span>
          </button>
        ))}
      </div>

      <div ref={grid} className="portfolioGrid">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
