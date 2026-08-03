import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="notFound">
      <span>404 / ROUTE NOT FOUND</span>
      <h1>This page left the grid.</h1>
      <p>The requested page does not exist or has been moved.</p>
      <Link href="/">
        Return to APEX WEB Studio <ArrowUpRight size={18} />
      </Link>
    </main>
  );
}
