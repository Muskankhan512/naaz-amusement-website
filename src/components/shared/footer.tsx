import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/lib/site";

const quick = [
  { label: "Jhoolas", href: "#rides" },
  { label: "Tour cities", href: "#tour" },
  { label: "Gallery", href: "#gallery" },
  { label: "Our story", href: "#about" },
  { label: "Book a ride", href: "/book" },
];

const rideQuick = [
  { label: "Giant Wheel", href: "/rides/giant-wheel" },
  { label: "Columbus", href: "/rides/columbus" },
  { label: "Break Dance", href: "/rides/break-dance" },
  { label: "Dragon Train", href: "/rides/dragon-train" },
  { label: "Toy Train", href: "/rides/toy-train" },
];

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.6c0-.86.24-1.45 1.49-1.45h1.6V4.45A21 21 0 0 0 14.27 4.3C12.05 4.3 10.5 5.66 10.5 8.16V10.5H8v3h2.5V21h3z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 8s-.2-1.4-.8-2c-.8-.85-1.7-.85-2.1-.9C16.1 4.9 12 4.9 12 4.9s-4.1 0-7.1.2c-.4.05-1.3.05-2.1.9C2.2 6.6 2 8 2 8s-.2 1.7-.2 3.4v1.6c0 1.7.2 3.4.2 3.4s.2 1.4.8 2c.8.85 1.85.83 2.3.92C6.6 19.5 12 19.6 12 19.6s4.1 0 7.1-.2c.4-.05 1.3-.05 2.1-.9.6-.6.8-2 .8-2s.2-1.7.2-3.4v-1.6c0-1.7-.2-3.4-.2-3.4zM10 14.6V8.8l5.2 2.9-5.2 2.9z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink pt-20 pb-10 text-cream/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-festival via-marigold to-mehendi"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-10 h-72 w-72 rounded-full bg-festival/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-festival text-cream ring-2 ring-marigold">
              <span className="font-display text-xl leading-none">न</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base tracking-wide text-cream">
                NAAZ <span className="text-marigold">AMUSEMENT</span>
              </span>
              <span className="font-display text-[0.72rem] text-cream/55">
                तीन पीढ़ियों की रौनक़
              </span>
            </span>
          </Link>

          <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-cream/65">
            India&rsquo;s most loved travelling mela. Family entertainment for
            cities, weddings, schools and corporate events since 1968.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <Link
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/75 transition hover:border-marigold hover:text-marigold"
            >
              <InstagramIcon className="h-4 w-4" />
            </Link>
            <Link
              href={`https://facebook.com/${site.facebook}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/75 transition hover:border-marigold hover:text-marigold"
            >
              <FacebookIcon className="h-4 w-4" />
            </Link>
            <Link
              href={`https://youtube.com/@${site.instagram}`}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/75 transition hover:border-marigold hover:text-marigold"
            >
              <YoutubeIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <FooterColumn title="Explore" titleHi="जाँचें">
          {quick.map((q) => (
            <FooterLink key={q.href} {...q} />
          ))}
        </FooterColumn>

        <FooterColumn title="Rides" titleHi="झूले">
          {rideQuick.map((q) => (
            <FooterLink key={q.href} {...q} />
          ))}
        </FooterColumn>

        <FooterColumn title="Reach us" titleHi="संपर्क">
          <li>
            <a
              href={`tel:${site.whatsapp}`}
              className="group inline-flex items-start gap-2.5 text-[0.92rem] text-cream/75 transition hover:text-marigold"
            >
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
              {site.whatsapp}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-start gap-2.5 text-[0.92rem] text-cream/75 transition hover:text-marigold"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
              {site.email}
            </a>
          </li>
          <li className="inline-flex items-start gap-2.5 text-[0.92rem] text-cream/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
            <span className="max-w-[14rem]">{site.address}</span>
          </li>
        </FooterColumn>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-start justify-between gap-3 border-t border-cream/10 px-5 pt-6 text-[0.78rem] text-cream/50 md:flex-row md:items-center md:px-8">
        <p>
          © {new Date().getFullYear()} {site.name} · Crafted with{" "}
          <span className="text-festival">♥</span> in Lucknow.
        </p>
        <p className="font-display devanagari">
          रौनक़ ज़िंदाबाद ·{" "}
          <span className="font-body italic not-italic">
            est. {site.established}
          </span>
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  titleHi,
  children,
}: {
  title: string;
  titleHi: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-display text-[0.74rem] uppercase tracking-[0.28em] text-marigold">
        {title} · <span className="devanagari">{titleHi}</span>
      </h4>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.92rem] text-cream/75 transition hover:text-marigold"
      >
        {label}
      </Link>
    </li>
  );
}
