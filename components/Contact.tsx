"use client";

import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  LoaderCircle,
  Send,
  TriangleAlert,
} from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGsap";
import Magnetic from "./Magnetic";
import { siteConfig } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SubmitState = "idle" | "sending" | "success" | "error";

type ContactApiResponse = {
  ok?: boolean;
  deliveryConfirmed?: boolean;
  reference?: string;
  ownerSent?: boolean;
  receiptSent?: boolean;
  error?: string;
  code?: string;
};

export default function Contact() {
  const section = useRef<HTMLElement>(null);

  const [status, setStatus] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useGSAP(
    () => {
      gsap.fromTo(
        ".contactReveal",
        {
          y: 70,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 72%",
            end: "top 38%",
            scrub: 1,
          },
        }
      );
    },
    {
      scope: section,
    }
  );

  const submit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      page: window.location.href,
    };

    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      /*
       * Read the response as text first.
       * This lets us detect empty or invalid responses properly
       * instead of silently replacing them with {}.
       */
      const responseText = await response.text();

      let result: ContactApiResponse = {};

      if (responseText.trim()) {
        try {
          result = JSON.parse(
            responseText
          ) as ContactApiResponse;
        } catch {
          throw new Error(
            "The contact server returned an invalid response."
          );
        }
      } else {
        throw new Error(
          "The contact server returned an empty response."
        );
      }

      /*
       * When the API returns an error status,
       * show its real error message.
       */
      if (!response.ok) {
        throw new Error(
          result.error ||
            `The email service returned an error (${response.status}).`
        );
      }

      const reference =
        typeof result.reference === "string"
          ? result.reference.trim()
          : "";

      /*
       * Supports both API response formats:
       *
       * New:
       * deliveryConfirmed: true
       *
       * Existing:
       * ownerSent: true
       * receiptSent: true
       */
      const deliveryConfirmed =
        result.ok === true &&
        Boolean(reference) &&
        (result.deliveryConfirmed === true ||
          (result.ownerSent === true &&
            result.receiptSent === true));

      if (!deliveryConfirmed) {
        /*
         * Use console.warn instead of console.error.
         * console.error creates the large Next.js dev overlay.
         */
        console.warn(
          "Contact API did not provide full confirmation:",
          result
        );

        throw new Error(
          result.error ||
            "Your enquiry may have been sent, but the server did not return a valid confirmation."
        );
      }

      form.reset();
      setStatus("success");
      setStatusMessage(
        `Enquiry sent successfully. Reference: ${reference}. Please check your inbox.`
      );

      window.setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 9000);
    } catch (error) {
      /*
       * Avoid console.error in development because
       * Next.js can display it as an error overlay.
       */
      console.warn("Contact form submission issue:", error);

      setStatus("error");

      setStatusMessage(
        error instanceof Error
          ? error.message
          : "The message could not be sent. Please try again."
      );
    }
  };

  return (
    <section
      ref={section}
      className="contact"
      id="contact"
    >
      <div className="contactHeader">
        <span className="sectionCode contactReveal">
          05 / START A PROJECT
        </span>

        <h2 className="contactReveal">
          Ready to become
          <br />
          <em>the reference?</em>
        </h2>

        <p className="contactReveal">
          Share the ambition, problem or opportunity. We will
          respond with clear next steps—not a generic sales
          message.
        </p>
      </div>

      <div className="contactLayout">
        <div className="contactInfo contactReveal">
          <div className="contactAvailability">
            <i />
            <span>ACCEPTING SELECTED PROJECTS</span>
          </div>

          <div className="contactDirect">
            <small>DIRECT ENQUIRIES</small>

            <a href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
              <ArrowUpRight size={21} />
            </a>

            <span>
              We usually reply within one business day.
            </span>
          </div>

          <div className="contactDetails">
            <div>
              <small>BASED IN</small>
              <strong>Sri Lanka</strong>
            </div>

            <div>
              <small>WORKING WITH</small>
              <strong>Ambitious teams worldwide</strong>
            </div>
          </div>
        </div>

        <form
          className="contactForm contactReveal"
          onSubmit={submit}
        >
          <div className="fieldRow">
            <label>
              <span>YOUR NAME *</span>

              <input
                type="text"
                name="name"
                placeholder="John Smith"
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>COMPANY</span>

              <input
                type="text"
                name="company"
                placeholder="Company name"
                autoComplete="organization"
              />
            </label>
          </div>

          <label>
            <span>EMAIL ADDRESS *</span>

            <input
              type="email"
              name="email"
              placeholder="john@company.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            <span>PROJECT TYPE *</span>

            <select
              name="service"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select what you need
              </option>

              <option>
                Premium business website
              </option>

              <option>
                E-commerce platform
              </option>

              <option>
                Custom web application
              </option>

              <option>
                Website redesign
              </option>

              <option>
                SEO and performance
              </option>

              <option>
                Something unconventional
              </option>
            </select>
          </label>

          <label>
            <span>PROJECT BRIEF *</span>

            <textarea
              name="message"
              rows={5}
              minLength={20}
              maxLength={5000}
              placeholder="What are you building, what needs to change, and what would success look like?"
              required
            />
          </label>

          <div className="formBottom">
            <span>
              Your enquiry is sent securely to APEX WEB
              Studio. A confirmation receipt is emailed to
              the address entered above.
            </span>

            <Magnetic>
              <button
                className="submitButton"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Sending"
                  : "Send enquiry"}

                <i>
                  {status === "sending" ? (
                    <LoaderCircle
                      className="buttonSpinner"
                      size={17}
                    />
                  ) : (
                    <Send size={17} />
                  )}
                </i>
              </button>
            </Magnetic>
          </div>

          <div
            className="formStatus"
            aria-live="polite"
            aria-atomic="true"
          >
            {status === "success" && (
              <span className="formStatusSuccess">
                <Check size={17} />
                {statusMessage}
              </span>
            )}

            {status === "error" && (
              <span className="formStatusError">
                <TriangleAlert size={17} />
                {statusMessage}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}