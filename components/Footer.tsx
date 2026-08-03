import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerTop">
        <Link className="brand footerBrand" href="/">
          <img src="/logo.svg" alt="" />
          <span>
            <strong>APEX</strong>
            <small>WEB STUDIO</small>
          </span>
        </Link>

        <p>
          Web design and development in Sri Lanka for businesses ready to lead
          locally and worldwide.
        </p>

        <div className="footerSocial">
          <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer">
            Facebook ↗
          </a>
          <Link href="/portfolio">Portfolio ↗</Link>
          <a href={`mailto:${siteConfig.email}`}>Email ↗</a>
        </div>
      </div>

      <div className="footerWordmark">APEX</div>

      <div className="footerBottom">
        <span>© 2026 APEX WEB Studio. All rights reserved.</span>
        <span>WEB DEVELOPMENT · SRI LANKA · WORLDWIDE</span>
        <a href="#top" aria-label="Back to top">
          BACK TO TOP
          <i>
            <ArrowUp size={14} />
          </i>
        </a>
      </div>
    </footer>
  );
}
