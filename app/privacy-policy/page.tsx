import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import { absoluteUrl, siteConfig } from "@/lib/site";

const POLICY_DATE = "August 8, 2026";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy, Refund Policy & Terms | APEX WEB STUDIO",
  },
  description:
    "Read the APEX WEB STUDIO privacy, refund, cancellation, payment, project delivery and business terms for web design and development services.",
  alternates: {
    canonical: "/privacy-policy",
    languages: {
      "en-LK": "/privacy-policy",
      en: "/privacy-policy",
      "x-default": "/privacy-policy",
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/privacy-policy"),
    title: "Privacy Policy, Refund Policy & Terms | APEX WEB STUDIO",
    description:
      "APEX WEB STUDIO policies covering privacy, refunds, cancellations, payments and web development services.",
    siteName: siteConfig.name,
    locale: "en_LK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy, Refund Policy & Terms | APEX WEB STUDIO",
    description:
      "APEX WEB STUDIO policies covering privacy, refunds, cancellations, payments and web development services.",
  },
};

const policySections = [
  ["privacy", "Privacy Policy"],
  ["refunds", "Refund & Cancellation Policy"],
  ["terms", "Terms & Conditions"],
  ["payments", "Payment Terms"],
  ["project-cancellation", "Project Cancellation Policy"],
  ["digital-deliverables", "Source Code / Digital Deliverables"],
  ["delivery", "Project Delivery Policy"],
  ["revisions", "Revision Policy"],
  ["client-responsibilities", "Client Responsibilities"],
  ["ownership", "Intellectual Property / Ownership"],
  ["third-party", "Third-Party Services"],
  ["hosting-domains", "Hosting & Domain Services"],
  ["maintenance", "Maintenance & Support"],
  ["liability", "Limitation of Liability"],
  ["satisfaction", "Customer Satisfaction"],
  ["disputes", "Disputes & Chargebacks"],
  ["contact-information", "Contact Information"],
] as const;

export default function PrivacyPolicyPage() {
  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <Navigation />

      <main className="policyPage" id="top">
        <header className="policyHero">
          <div className="policyHeroGrid" aria-hidden="true" />

          <div className="policyHeroTop">
            <span>BUSINESS POLICIES · APEX WEB STUDIO</span>
            <Link href="/">
              <ArrowDownLeft size={16} />
              Return to studio
            </Link>
          </div>

          <div className="policyHeroContent">
            <div>
              <span className="sectionCode">POLICIES / TERMS / CLIENT CARE</span>
              <h1>
                PRIVACY, REFUNDS
                <span>&amp; TERMS.</span>
              </h1>
            </div>

            <div className="policyHeroSummary">
              <p>
                Clear and transparent policies for APEX WEB STUDIO web design,
                development and related digital services.
              </p>
              <dl>
                <div>
                  <dt>Effective Date</dt>
                  <dd>{POLICY_DATE}</dd>
                </div>
                <div>
                  <dt>Last Updated</dt>
                  <dd>{POLICY_DATE}</dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <div className="policyLayout">
          <aside className="policyIndex" aria-label="Policy contents">
            <span>ON THIS PAGE</span>
            <nav>
              {policySections.map(([id, label], index) => (
                <a href={`#${id}`} key={id}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="policyDocument">
            <div className="policyIntroduction">
              <p>
                APEX WEB STUDIO is a web design and development business based
                in {siteConfig.location.city}, {siteConfig.location.country}.
                Services may include business websites, e-commerce websites,
                custom web applications, website redesign, maintenance,
                deployment, hosting or domain assistance, technical support,
                web development packages and other related digital services.
              </p>
              <p>
                These policies form a general framework for our services. A
                package, quotation, proposal, invoice, written conversation or
                project-specific agreement may contain additional terms. If a
                project-specific term differs, that term will apply to the
                relevant project to the extent permitted by applicable law.
              </p>
            </div>

            <section id="privacy" className="policySection">
              <span className="policyNumber">01</span>
              <h2>Privacy Policy</h2>
              <p>
                We collect only information that is reasonably needed to
                respond to enquiries, understand requirements and provide our
                services. Depending on how a client contacts or works with us,
                this may include:
              </p>
              <ul>
                <li>Name, email address and telephone or WhatsApp details.</li>
                <li>Company, business and billing information.</li>
                <li>Project requirements, content, files and technical details.</li>
                <li>Messages, feedback and other project communications.</li>
                <li>
                  Payment-related information, transaction references and
                  invoice records.
                </li>
                <li>
                  Website usage and technical information such as device,
                  browser, approximate location, pages viewed and performance
                  or security logs.
                </li>
              </ul>

              <h3>How information may be used</h3>
              <p>
                Information may be used to respond to enquiries, prepare
                quotations, provide and manage services, process payments,
                deliver customer support, send project-related communications,
                improve our website and services, prevent misuse, and meet
                reasonable legal, accounting and security obligations.
              </p>

              <h3>Payments and information sharing</h3>
              <p>
                Payments may be processed by approved third-party payment
                providers. Full payment-card details are generally entered into
                and handled by the payment provider rather than stored by APEX
                WEB STUDIO. We may receive limited transaction information,
                such as payment status, amount and reference number.
              </p>
              <p>
                APEX WEB STUDIO does not sell personal information to
                advertisers. Information may be shared only where reasonably
                necessary with service providers involved in operating the
                website or delivering a client project, or where disclosure is
                required by law. Those providers may have their own privacy
                terms.
              </p>

              <h3>Cookies, analytics and security</h3>
              <p>
                The website may use essential browser storage, cookies,
                analytics or performance tools to keep the site working,
                understand general usage and improve reliability. Browser
                settings can be used to control cookies, although disabling
                essential technologies may affect some features.
              </p>
              <p>
                We use reasonable administrative and technical measures to
                protect information. No website, transmission or storage system
                can be guaranteed to be completely secure, so clients should
                avoid sending unnecessary sensitive information through open
                communication channels.
              </p>

              <h3>Retention and requests</h3>
              <p>
                Information is retained only for as long as reasonably needed
                for enquiries, active services, support, records, security and
                applicable legal or accounting requirements. Clients may
                contact us to ask about, correct or request deletion of their
                personal information. Requests will be reviewed subject to
                identity verification and any records we are required or
                reasonably entitled to retain.
              </p>
            </section>

            <section id="refunds" className="policySection">
              <span className="policyNumber">02</span>
              <h2>Refund &amp; Cancellation Policy</h2>
              <p>
                Customer satisfaction is important to APEX WEB STUDIO. We aim
                to consider cancellation and refund requests fairly, based on
                the stage of the project, what has been delivered and the terms
                agreed for that project.
              </p>

              <div className="policyNotice">
                <strong>The key digital-delivery rule</strong>
                <p>
                  If a client no longer wants a project and informs APEX WEB
                  STUDIO before final source code, project files, credentials
                  or completed digital deliverables have been provided, we may
                  cancel the project and issue any eligible refund after
                  reviewing the circumstances.
                </p>
                <p>
                  Once the client has received, accessed, downloaded, copied or
                  been provided with source code, final project files, website
                  files, application files, credentials or other final digital
                  deliverables, payments are non-refundable. This is because
                  delivered digital assets can be copied, stored and used after
                  access has been provided.
                </p>
              </div>

              <h3>Before final digital delivery</h3>
              <p>
                A client wishing to cancel should contact us as soon as
                possible. We will review the current stage of development, work
                already completed, payments received and the written project
                terms. Where appropriate, an eligible refund may be issued.
              </p>
              <p>
                Clearly disclosed costs already paid to third parties for that
                client may be excluded from the refundable amount when
                applicable. These can include domain registration, hosting,
                premium plugins, paid APIs, templates, licences or external
                software and services purchased specifically for the project.
                A deduction will apply only where the cost is relevant and was
                clearly communicated.
              </p>

              <h3>After source code or final delivery</h3>
              <p>
                When final digital deliverables have been supplied or access
                has been granted, the service and digital assets are considered
                delivered and the related payment becomes non-refundable. A
                client cannot receive the completed source code or project
                files and then obtain a refund solely because they later decide
                not to launch, use or continue with the project.
              </p>

              <h3>Genuine issues with delivered work</h3>
              <p>
                If delivered work has a genuine issue within the agreed scope,
                the client should tell us promptly and provide enough detail to
                reproduce or understand the issue. APEX WEB STUDIO will first
                make a reasonable attempt to correct it under the applicable
                requirements, revision or support terms. This policy does not
                remove any rights or remedies that cannot be excluded under
                applicable law.
              </p>
            </section>

            <section id="terms" className="policySection">
              <span className="policyNumber">03</span>
              <h2>Terms &amp; Conditions</h2>
              <h3>Project scope</h3>
              <p>
                The scope of each project is based on the selected package,
                quotation, proposal, invoice, written conversation or agreed
                project requirements. Only items reasonably included in that
                scope form part of the agreed service.
              </p>

              <h3>Changes to scope</h3>
              <p>
                Additional features, major design changes, new integrations or
                other requests outside the agreed scope may require additional
                charges, a revised timeline or a separate quotation. We will
                communicate material changes before proceeding with the extra
                work.
              </p>

              <h3>Cooperation and timing</h3>
              <p>
                Clients are responsible for providing the content, assets,
                information, access and feedback reasonably required for the
                project. Completion estimates depend on scope, complexity,
                client response time, third-party services and technical
                dependencies. A date is not guaranteed unless it has been
                specifically agreed as a firm commitment in writing.
              </p>

              <h3>Website and service use</h3>
              <p>
                Clients must not ask APEX WEB STUDIO to create, host or deploy
                content that is unlawful, infringes another party’s rights or
                is deliberately harmful. These terms operate alongside any
                mandatory rights and obligations under applicable law.
              </p>
            </section>

            <section id="payments" className="policySection">
              <span className="policyNumber">04</span>
              <h2>Payment Terms</h2>
              <ul>
                <li>
                  Prices and payment milestones vary by package, project scope
                  and written agreement. The applicable price will be shown or
                  communicated before the client proceeds.
                </li>
                <li>
                  Some projects require an advance or deposit, while others may
                  use milestone payments.
                </li>
                <li>
                  Final payment may be required before final source code,
                  project files, transferable credentials or other final
                  deliverables are released.
                </li>
                <li>
                  Invoices and agreed payments should be paid by the stated due
                  date. A delay may pause work or affect the delivery estimate.
                </li>
                <li>
                  Payment does not transfer ownership of third-party licensed
                  assets where the relevant licence belongs to another
                  provider.
                </li>
                <li>
                  Payment processing may be handled by approved third-party
                  payment providers and may also be subject to their terms.
                </li>
              </ul>
            </section>

            <section id="project-cancellation" className="policySection">
              <span className="policyNumber">05</span>
              <h2>Project Cancellation Policy</h2>
              <p>
                Clients can request cancellation by contacting APEX WEB STUDIO,
                preferably before final delivery. We may ask for the request in
                writing so that both parties have a clear record.
              </p>
              <p>
                Cancellation and any refund eligibility depend on whether final
                source code or files have been delivered, the current stage of
                development, work already completed, third-party services
                already purchased and any specific written agreement for the
                project. If cancellation is accepted, we will explain the next
                steps and any eligible refundable amount.
              </p>
              <p>
                APEX WEB STUDIO may also pause or cancel work where a client
                does not provide required materials, access, feedback or agreed
                payments after reasonable communication. Any financial outcome
                will still be assessed fairly under the project agreement and
                this Refund &amp; Cancellation Policy.
              </p>
            </section>

            <section id="digital-deliverables" className="policySection">
              <span className="policyNumber">06</span>
              <h2>Source Code / Digital Deliverables Policy</h2>
              <p>
                Final digital deliverables may include website or application
                source code, project files, databases where applicable,
                appropriate configuration files, final exported files,
                credentials specifically intended for transfer and other
                project assets expressly included in the agreement.
              </p>
              <p>
                Delivery can occur through email, a download link, a shared
                drive, repository access, hosting access, account transfer or
                another agreed method. Once the files have been provided or the
                client has been given working access to them, the service and
                digital deliverables are considered supplied. Refund eligibility
                normally ends at that point because the assets can be copied,
                retained or used.
              </p>
              <p>
                Development-only secrets, internal systems, reusable tools or
                credentials not intended for transfer are not part of the final
                deliverables unless agreed in writing. Where necessary, clients
                should update transferred passwords and store their files and
                credentials securely after delivery.
              </p>
            </section>

            <section id="delivery" className="policySection">
              <span className="policyNumber">07</span>
              <h2>Project Delivery Policy</h2>
              <p>
                Delivery estimates are based on the known scope and the
                information available when the estimate is given. Actual timing
                may be affected by project complexity, client response time,
                content availability, requested changes, third-party approvals,
                hosting, APIs and other technical dependencies.
              </p>
              <p>
                We will make reasonable efforts to communicate material delays.
                Unless a specific fixed deadline is agreed in writing, dates are
                good-faith estimates rather than absolute guarantees. Delivery
                is complete when the agreed website, files, access or other
                deliverables are made available through the agreed method.
              </p>
            </section>

            <section id="revisions" className="policySection">
              <span className="policyNumber">08</span>
              <h2>Revision Policy</h2>
              <p>
                Revisions are provided according to the selected package or
                project agreement. Minor corrections and reasonable adjustments
                within the agreed scope may be included. The client should
                provide clear, consolidated feedback within a reasonable time
                so revisions can be handled efficiently.
              </p>
              <p>
                Major redesigns, repeated changes to an approved direction, new
                functionality, replacement content or requests outside the
                original scope may require additional charges and a revised
                timeline. Any material extra work will be discussed before it
                proceeds.
              </p>
            </section>

            <section id="client-responsibilities" className="policySection">
              <span className="policyNumber">09</span>
              <h2>Client Responsibilities</h2>
              <p>The client is responsible for providing, where required:</p>
              <ul>
                <li>Accurate business, product and contact information.</li>
                <li>Content, images, logos and other brand assets.</li>
                <li>Timely feedback, approvals and project decisions.</li>
                <li>
                  Login or access credentials needed for agreed services, shared
                  through a reasonably secure method.
                </li>
                <li>
                  Confirmation that supplied content and assets may lawfully be
                  used for the project.
                </li>
              </ul>
              <p>
                Delays, incomplete information or changed instructions may
                affect delivery dates and cost. The client remains responsible
                for the legality and accuracy of their own content, business
                claims, product details and brand materials.
              </p>
            </section>

            <section id="ownership" className="policySection">
              <span className="policyNumber">10</span>
              <h2>Intellectual Property / Ownership</h2>
              <p>
                The client retains ownership of content, logos, trademarks and
                other materials they provide. After full payment, and subject
                to the project agreement, ownership of custom deliverables
                created specifically for the client may be transferred to the
                client where applicable.
              </p>
              <p>
                Frameworks, libraries, fonts, plugins, APIs, themes, stock
                assets, software licences and other third-party components
                remain subject to their own licence terms. Payment to APEX WEB
                STUDIO does not override those terms or transfer rights that a
                third-party provider does not permit us to transfer.
              </p>
              <p>
                Unless otherwise agreed in writing, APEX WEB STUDIO retains its
                rights in reusable internal tools, frameworks, development
                methods, generic code, templates and know-how. This does not
                give APEX WEB STUDIO ownership of the client’s own content or
                brand.
              </p>
            </section>

            <section id="third-party" className="policySection">
              <span className="policyNumber">11</span>
              <h2>Third-Party Services</h2>
              <p>
                Projects may rely on hosting companies, domain registrars,
                payment gateways, email providers, cloud providers, APIs,
                plugins, software platforms and other third-party services.
                Their services, fees, policies, licence terms and technical
                limits are controlled by those providers and may change
                independently.
              </p>
              <p>
                APEX WEB STUDIO cannot guarantee the uninterrupted availability
                or continued compatibility of a third-party system. We will make
                reasonable efforts to select, configure or assist with agreed
                services, but provider outages, policy changes and discontinued
                features may require an alternative service, revised scope or
                additional work.
              </p>
            </section>

            <section id="hosting-domains" className="policySection">
              <span className="policyNumber">12</span>
              <h2>Hosting &amp; Domain Services</h2>
              <p>
                If APEX WEB STUDIO assists with hosting or domain registration,
                the third-party provider’s terms and renewal fees may apply. The
                client should keep account ownership, billing details and
                contact information accurate and should review renewal notices.
              </p>
              <p>
                Failure to renew a domain, hosting plan or related service can
                result in suspension, data loss or expiry. Registration and
                hosting charges may be non-refundable when the provider does not
                permit a refund. Assistance with registration does not mean
                APEX WEB STUDIO owns the client’s domain; ownership and account
                arrangements depend on the registration details and written
                project agreement.
              </p>
            </section>

            <section id="maintenance" className="policySection">
              <span className="policyNumber">13</span>
              <h2>Maintenance &amp; Support</h2>
              <p>
                Project delivery does not automatically include unlimited or
                lifetime maintenance. Updates, backups, security monitoring,
                hosting management and ongoing technical support depend on the
                selected package or a separate maintenance agreement.
              </p>
              <p>
                Issues caused by client modifications, third-party updates,
                hosting changes, external plugins, API changes, unsupported
                software, malware or security incidents outside our reasonable
                control may require additional investigation and paid work. We
                will explain the likely scope before carrying out material work
                that is not already covered.
              </p>
            </section>

            <section id="liability" className="policySection">
              <span className="policyNumber">14</span>
              <h2>Limitation of Liability</h2>
              <p>
                APEX WEB STUDIO will provide agreed services with reasonable
                care. We are not responsible for loss caused solely by events
                outside our reasonable control, such as third-party hosting
                outages, payment or cloud-provider failures, external API
                changes, internet disruptions, unlawful attacks or changes made
                by a client or another provider after delivery.
              </p>
              <p>
                Clients should maintain appropriate backups, access controls and
                business continuity arrangements after handover. Where an issue
                is connected to work within our agreed scope, the parties should
                first allow a reasonable opportunity to investigate and correct
                it. Nothing in this section excludes responsibility or customer
                rights that cannot lawfully be excluded.
              </p>
            </section>

            <section id="satisfaction" className="policySection">
              <span className="policyNumber">15</span>
              <h2>Customer Satisfaction</h2>
              <p>
                APEX WEB STUDIO aims to maintain a high level of customer
                satisfaction and fair outcomes for both the client and the
                business. Customers experiencing a problem should contact us
                first so we can review the facts and attempt a reasonable
                solution.
              </p>
              <p>
                Depending on the circumstances and agreed scope, a solution may
                include a correction, an included revision, technical
                assistance, cancellation where appropriate or an eligible refund
                under the Refund &amp; Cancellation Policy.
              </p>
            </section>

            <section id="disputes" className="policySection">
              <span className="policyNumber">16</span>
              <h2>Disputes &amp; Chargebacks</h2>
              <p>
                If a client has a payment or service concern, we encourage them
                to contact APEX WEB STUDIO before initiating a payment dispute
                or chargeback. Direct contact gives us an opportunity to review
                project records, clarify the delivery status and try to resolve
                the matter promptly and fairly.
              </p>
              <p>
                This request does not prevent a customer from exercising rights
                available through their bank, payment provider or applicable
                law. Both parties should communicate honestly and provide
                relevant documentation when a dispute is being reviewed.
              </p>
            </section>

            <section id="contact-information" className="policySection policyContact">
              <span className="policyNumber">17</span>
              <h2>Contact Information</h2>
              <p>
                For questions, privacy requests, cancellations, project concerns
                or refund enquiries, contact APEX WEB STUDIO using the existing
                business details below.
              </p>
              <dl>
                <div>
                  <dt>Business</dt>
                  <dd>{siteConfig.legalName}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>
                    {siteConfig.location.city}, {siteConfig.location.country}
                  </dd>
                </div>
              </dl>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
