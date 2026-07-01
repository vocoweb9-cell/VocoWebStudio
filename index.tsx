import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useId, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight, Check, Sparkles, Zap, Globe, Headphones, Rocket,
  Code2, Bot, Search, Wrench, Star, Menu, X, Briefcase,
  Instagram, Mail, Send, Calendar, MessageCircle,
} from "lucide-react";
import logoAsset from "@/assets/voco-logo-v2.asset.json";
import coverBoba from "@/assets/portfolio/boba.jpg";
import coverEstate from "@/assets/portfolio/estate.jpg";
import coverCare from "@/assets/portfolio/care.jpg";
import coverCoach from "@/assets/portfolio/coach.jpg";
import coverStartup from "@/assets/portfolio/startup.jpg";
import coverConsulting from "@/assets/portfolio/consulting.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookingModal } from "@/components/BookingModal";
import { COUNTRIES } from "@/lib/countries";
import { Reveal } from "@/components/Reveal";
import { Loader } from "@/components/Loader";
import { AmbientBackground } from "@/components/AmbientBackground";

const FAQ_ITEMS = [
  { q: "How long does it take to build a website?", a: "Most business websites are completed within 48–72 hours, depending on project scope and revisions." },
  { q: "Do you work globally?", a: "Yes — we serve clients in North America, Europe, the Middle East, and Asia. All work is conducted remotely with async + scheduled calls." },
  { q: "Do you provide support after launch?", a: "Every plan includes post-launch support, and we offer ongoing maintenance retainers for security, updates, and growth." },
  { q: "Can you redesign existing websites?", a: "Absolutely. We frequently rebuild outdated sites into modern, conversion-optimized experiences without disrupting your brand." },
  { q: "Can you build AI automations?", a: "Yes — chat assistants, lead qualification, WhatsApp flows, CRM workflows, and custom AI features are core offerings." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VOCO Web Solutions — AI Web Design & Automation" },
      { name: "description", content: "VOCO Web Solutions builds premium websites, AI automations, and digital growth systems for startups, businesses and brands worldwide." },
      { property: "og:title", content: "VOCO Web Solutions — AI Web Design & Automation" },
      { property: "og:description", content: "Elite digital studio for premium websites, development & business automation." },
      { property: "og:url", content: "https://vocoweb.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://vocoweb.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "VOCO Web Solutions",
          url: "https://vocoweb.lovable.app/",
          logo: "https://vocoweb.lovable.app/favicon.ico",
          sameAs: ["https://www.instagram.com/voco.web/"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const LOGO = logoAsset.url;
const INSTAGRAM_URL = "https://www.instagram.com/voco.web/";
const WHATSAPP_NUMBER = "+91 72069 55571";
const WHATSAPP_URL = "https://wa.me/917206955571?text=Hi%20VOCO%20WEB!%20I'm%20interested%20in%20getting%20a%20professional%20website%20for%20my%20business.%20Please%20share%20the%20details.";
const EMAIL = "voco.web9@gmail.com";

function Logo({ className = "h-8" }: { className?: string }) {
  return <img src={LOGO} alt="VOCO Web Solutions" className={`${className} drop-shadow-[0_0_25px_rgba(236,72,153,0.25)] animate-float-orb`} style={{ animationDuration: "8s" }} />;
}

/* ---------------- MOUSE GLOW ---------------- */
function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-screen hidden md:block"
      style={{
        background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, oklch(0.65 0.22 255 / 0.10), transparent 60%)`,
      }}
    />
  );
}

/* ---------------- NAV ---------------- */
function Nav({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const sections = ["services", "portfolio", "pricing", "process", "contact"];
      const y = window.scrollY + 120;
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#services", label: "Services", id: "services" },
    { href: "#portfolio", label: "Portfolio", id: "portfolio" },
    { href: "#pricing", label: "Pricing", id: "pricing" },
    { href: "#process", label: "Process", id: "process" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];
  return (
    <header className="fixed top-3 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div
          className={`flex items-center justify-between gap-2 rounded-full pl-3 pr-2 py-1.5 transition-all duration-500 ${
            scrolled
              ? "bg-background/55 backdrop-blur-2xl border border-white/[0.08] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)]"
              : "bg-background/30 backdrop-blur-xl border border-white/[0.05]"
          }`}
        >
          <a href="#top" className="flex items-center shrink-0" aria-label="VOCO Home">
            <Logo className="h-14 sm:h-16 md:h-20 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative px-4 py-2 text-sm tracking-wide transition-colors group ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l.label}
                  <span className={`pointer-events-none absolute left-4 right-4 -bottom-0.5 h-px bg-gradient-brand transition-transform origin-left duration-500 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </a>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full grid place-items-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <Button onClick={onBook} className="btn-premium border-0 rounded-full h-10 px-5 text-sm">
              Book Free Consultation
            </Button>
          </div>
          <button className="md:hidden text-foreground h-10 w-10 grid place-items-center rounded-full hover:bg-white/5" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden glass-card rounded-3xl my-2 p-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-1">
                {l.label}
              </a>
            ))}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground py-1 inline-flex items-center gap-2">
              <Instagram className="h-4 w-4" /> @voco.web
            </a>
            <Button onClick={() => { setOpen(false); onBook(); }} className="w-full btn-premium border-0 rounded-full">Book Free Consultation</Button>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-brand-blue/30 blur-[120px] animate-float-orb" />
      <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-brand-pink/30 blur-[120px] animate-float-orb" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-x-0 top-1/3 -z-0 h-[400px] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0deg,oklch(0.65_0.22_255/0.12)_90deg,transparent_180deg,oklch(0.68_0.26_0/0.10)_270deg,transparent_360deg)] animate-pulse-glow pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-8 animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-pink animate-pulse-glow" />
          AI-Powered Digital Agency · Serving Globally
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="text-gradient-brand">VOCO WEB SOLUTIONS</span>
          <span className="sr-only"> — AI-Powered Web Design, Development & Business Automation</span>
        </h1>
        <p className="mt-5 text-xl sm:text-2xl md:text-3xl font-display font-medium text-foreground/90 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.15s" }}>
          Elite Digital Studio for Websites, Development & Automation
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
          We help startups, businesses and brands build premium websites, automate workflows and establish a powerful online presence with modern technology.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button onClick={onBook} size="lg" className="btn-premium border-0 rounded-full h-12 px-7">
            <Calendar className="mr-2 h-4 w-4" /> Book Free Consultation
          </Button>
          <a href="#portfolio">
            <Button size="lg" variant="outline" className="rounded-full h-12 px-7 bg-white/[0.02] backdrop-blur-xl border-white/15 hover:bg-white/[0.06] hover:border-white/25 transition-all">
              View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {["Fast Delivery", "Mobile Optimized", "SEO Ready", "Global Support"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-brand-pink" />
              <span>{t}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 mx-auto max-w-5xl animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="relative overflow-hidden rounded-3xl glass-card premium-tilt p-3 sm:p-4">
            <div className="absolute inset-0 animated-mesh opacity-70" />
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative rounded-2xl border border-border bg-background/55 p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-pink" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-purple" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-blue" />
                </div>
                <div className="text-xs text-muted-foreground">Live brand command center</div>
              </div>
              <div className="grid gap-4 pt-5 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-border bg-card/70 p-5">
                  <div className="absolute inset-0 grid-bg opacity-50" />
                  <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue/25 brand-orbit" />
                  <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-pink/25 brand-orbit-reverse" />
                  <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-brand-pink" /> Conversion-ready interface
                      </div>
                      <h3 className="mt-6 max-w-md text-left text-3xl font-display font-bold tracking-tight sm:text-4xl">
                        Designed to feel premium before the first click.
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-left">
                      {["Speed", "Trust", "Sales"].map((label, index) => (
                        <div key={label} className="rounded-xl border border-border bg-white/[0.03] p-3">
                          <div className="h-1.5 rounded-full bg-gradient-brand" style={{ width: `${90 - index * 12}%` }} />
                          <div className="mt-3 text-xs text-muted-foreground">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  {["Strategy", "Design", "Automation"].map((label, index) => (
                    <div key={label} className="group rounded-2xl border border-border bg-card/70 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/40">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{label}</span>
                        <span className="text-xs text-muted-foreground">0{index + 1}</span>
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.04]">
                        <div className="h-full rounded-full bg-gradient-brand transition-all duration-700 group-hover:w-full" style={{ width: `${76 + index * 8}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandTicker() {
  const items = ["Premium Web Design", "Conversion Systems", "WhatsApp Leads", "Fast Launches", "Global Support", "SEO Ready"];
  return (
    <section className="relative overflow-hidden border-y border-border py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="marquee-track flex w-max gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {[...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-4">
            <span>{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
const services = [
  { icon: Code2, title: "Website Design", desc: "Premium UI/UX, landing pages, and on-brand designs that convert visitors into customers.", items: ["Premium UI/UX", "Responsive Design", "Landing Pages", "Brand-First Design"] },
  { icon: Briefcase, title: "Business Websites", desc: "Multi-page business sites with the structure, copy, and clarity modern brands need.", items: ["5–10 Page Sites", "Custom CMS", "Lead Generation", "Booking Flows"] },
  { icon: Bot, title: "AI Automation", desc: "Intelligent workflows that capture leads, qualify prospects, and serve customers 24/7.", items: ["AI Chat Assistants", "Lead Qualification", "WhatsApp Automation", "CRM Workflows"] },
  { icon: Search, title: "SEO Optimization", desc: "Technical SEO and content strategy that gets you found and ranked on Google.", items: ["Technical SEO", "On-Page Optimization", "Schema & Performance", "Analytics Setup"] },
  { icon: Wrench, title: "Website Maintenance", desc: "Ongoing security, updates, and monitoring so your site never sleeps.", items: ["Security & Updates", "Performance Monitoring", "Backups", "Priority Support"] },
];

function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Services" title="What We Do" sub="A full-stack creative & engineering team building digital products end-to-end." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map(({ icon: Icon, title, desc, items }) => (
            <div key={title} className="group relative glass-card rounded-2xl p-6 hover:border-white/20 transition-all hover:-translate-y-1">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-brand-blue/10 via-brand-purple/5 to-brand-pink/10 pointer-events-none" />
              <div className="relative">
                <div className="h-11 w-11 rounded-xl bg-gradient-brand grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                <ul className="mt-5 space-y-2">
                  {items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-brand-pink shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PORTFOLIO ---------------- */
const portfolio = [
  { name: "Boba Tea Website", industry: "Restaurant / Beverage", desc: "Vibrant beverage brand site with menu and ordering.", grad: "from-fuchsia-500/40 to-rose-500/40", url: "https://boba-bloom-vibes.lovable.app", cover: coverBoba },
  { name: "Lumen Estates", industry: "Real Estate", desc: "Luxury property platform with cinematic listings.", grad: "from-sky-400/40 to-indigo-500/40", url: "https://www.compass.com", cover: coverEstate },
  { name: "Vitalis Care", industry: "Healthcare Clinic", desc: "Patient-first clinic site with online booking.", grad: "from-teal-400/40 to-emerald-500/40", url: "https://www.onemedical.com", cover: coverCare },
  { name: "Mindshift Academy", industry: "Business Coach", desc: "Coaching brand with cohort & 1:1 application flow.", grad: "from-fuchsia-500/40 to-purple-600/40", url: "https://www.tonyrobbins.com", cover: coverCoach },
  { name: "Orbit Labs", industry: "Technology Startup", desc: "Modern SaaS product site with trial signup.", grad: "from-cyan-400/40 to-blue-600/40", url: "https://linear.app", cover: coverStartup },
  { name: "North & Co.", industry: "Consulting Agency", desc: "Strategy-led consulting brand with lead intake.", grad: "from-violet-500/40 to-indigo-600/40", url: "https://www.mckinsey.com", cover: coverConsulting },
];

function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Portfolio" title="Selected Work" sub="Premium live websites — click any project to view the live experience." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((p, i) => (
            <Reveal key={p.name} variant="up" delay={i * 80}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative glass-card grad-border rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-20px_rgba(236,72,153,0.35)] block"
              >
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.grad} overflow-hidden`}>
                  <img
                    src={p.cover}
                    alt={`${p.name} — ${p.industry} cover`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  {/* dark bottom gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  {/* moving shine */}
                  <div className="pointer-events-none absolute -inset-x-1 -top-1 h-24 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out" />
                  {/* industry chip */}
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/85 border border-white/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-pink animate-pulse-glow" />
                    {p.industry}
                  </span>
                  {/* hover CTA */}
                  <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="inline-flex items-center gap-1.5 bg-white text-black rounded-full px-4 py-2 text-sm font-medium shadow-xl">
                      View Live <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
                <div className="relative p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-foreground truncate group-hover:text-gradient-brand transition-colors">{p.name}</h3>
                    <span className="text-xs text-muted-foreground shrink-0">{p.industry}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- COUNTERS / STATS ---------------- */
function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{n}{suffix}</>;
}

function WhyChoose() {
  const stats = [
    { v: 120, suffix: "+", l: "Happy Clients" },
    { v: 100, suffix: "%", l: "Responsive" },
    { v: 24, suffix: "/7", l: "Support" },
    { v: 18, suffix: "+", l: "Countries Served" },
  ];
  const benefits = [
    { icon: Zap, t: "Fast Delivery" }, { icon: Sparkles, t: "Premium Design" }, { icon: Code2, t: "Modern Tech" },
    { icon: Search, t: "SEO Ready" }, { icon: Rocket, t: "Conversion Focused" }, { icon: Globe, t: "Global Support" },
  ];
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Why VOCO" title="Built for ambitious brands" sub="The blend of design, engineering and AI that scales your business." />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.l} className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl sm:text-4xl font-display font-bold text-gradient-brand"><Counter to={s.v} suffix={s.suffix} /></div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, t }) => (
            <div key={t} className="glass-card rounded-2xl p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform">
              <div className="h-9 w-9 rounded-lg bg-gradient-brand grid place-items-center shrink-0">
                <Icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
const steps = [
  { n: "01", t: "Discovery", d: "We dig into your business, goals, and audience." },
  { n: "02", t: "Strategy", d: "Define scope, sitemap, and conversion roadmap." },
  { n: "03", t: "Design", d: "Craft a premium, on-brand visual system." },
  { n: "04", t: "Development", d: "Build clean, fast, scalable code." },
  { n: "05", t: "Launch", d: "Ship globally with monitoring and analytics." },
  { n: "06", t: "Support", d: "Ongoing iteration, growth, and maintenance." },
];

function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Process" title="How We Build" sub="A proven six-step path from idea to growth." />
        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((s) => (
              <div key={s.n} className="glass-card rounded-2xl p-5 relative hover:-translate-y-1 transition-transform">
                <div className="h-10 w-10 rounded-xl bg-gradient-brand grid place-items-center text-xs font-bold text-white mb-4">{s.n}</div>
                <h3 className="font-semibold text-foreground">{s.t}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
const plans = [
  {
    name: "VOCO START", tag: null,
    description: "Perfect for Landing Pages & Small Businesses",
    orig: "$399", price: "$199",
    cta: "Launch My Website",
    features: ["1–2 Pages", "Mobile Responsive", "Premium Design", "Contact Form", "SSL Ready", "Basic SEO", "Social Media Links", "Fast Loading", "Domain Setup Assistance", "7 Days Support"],
  },
  {
    name: "VOCO FLOW", tag: "⭐ Most Popular",
    description: "Built for growing businesses ready to scale",
    orig: "$799", price: "$499",
    cta: "Scale My Business", featured: true,
    features: ["5–10 Pages", "WhatsApp Integration", "Booking System", "Lead Capture System", "Email Automation", "CRM Integration", "Google Analytics", "Advanced SEO", "Conversion Optimization", "Priority Support"],
  },
  {
    name: "VOCO AI ELITE", tag: "🏆 Best Value",
    description: "Full AI-powered business stack",
    orig: "$3999", price: "$1999",
    cta: "Build My AI Business",
    features: ["Everything in Flow, plus:", "AI Chat Assistant", "AI Lead Qualification", "AI Support Automation", "Sales Funnel", "Database Integration", "Payment Gateway", "Advanced Analytics", "Custom Workflows", "30 Days Support"],
  },
];

function Pricing({ onBook }: { onBook: () => void }) {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Pricing" title="Transparent Pricing. Premium Results." sub="Launch pricing — locked in for a limited time." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-7 flex flex-col transition-all hover:-translate-y-1 ${
                p.featured ? "glass-card border-white/20 bg-gradient-to-b from-white/[0.07] to-white/[0.02] glow-pink scale-[1.02]" : "glass-card"
              }`}
            >
              {p.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-brand text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">{p.tag}</span>
                </div>
              )}
              <h3 className="text-lg font-display font-bold text-foreground tracking-wide">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
              <div className="mt-4 space-y-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Original Price</div>
                <div className="text-sm text-muted-foreground line-through">{p.orig}</div>
                <div className="pt-1 text-xs uppercase tracking-wider text-brand-pink">Launch Offer</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gradient-brand">{p.price}</span>
                </div>
              </div>
              <ul className="mt-6 space-y-2.5 flex-1">
                {p.features.map((f, i) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${i === 0 && f.startsWith("Everything") ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    <Check className="h-4 w-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.name === "VOCO AI ELITE" ? (
                <Button onClick={onBook} className={`mt-8 w-full rounded-xl h-11 ${p.featured ? "bg-gradient-brand text-white border-0 hover:opacity-90" : "bg-white text-black hover:bg-white/90"}`}>
                  {p.cta} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <a
                  href={`https://wa.me/917206955571?text=${encodeURIComponent(
                    `Hi VOCO WEB! I'd like to book the ${p.name} plan (${p.price}). Please share the payment link to get started.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 w-full rounded-xl h-11 inline-flex items-center justify-center text-sm font-medium ${p.featured ? "bg-gradient-brand text-white border-0 hover:opacity-90" : "bg-white text-black hover:bg-white/90"}`}
                >
                  {p.cta} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const testimonials = [
  { q: "VOCO rebuilt our booking site in under three weeks. Online reservations jumped 60% the first month — well above what we expected.", a: "Daniela Marchetti", r: "Owner, Trattoria Verde", c: "Milan, Italy", industry: "Hospitality", rating: 5 },
  { q: "The AI assistant they built handles around 70% of incoming questions. Our small team finally has breathing room.", a: "Omar Al-Farsi", r: "CEO, GulfStream Realty", c: "Dubai, UAE", industry: "Real Estate", rating: 5 },
  { q: "Clean communication, fast turnaround, and a site that actually looks expensive. Worth every dollar.", a: "Megan O'Connor", r: "Founder, Bloomwell Studio", c: "Dublin, Ireland", industry: "Wellness", rating: 5 },
  { q: "We compared agencies on three continents. VOCO delivered the cleanest build at the most honest price. No surprises.", a: "Rohit Bansal", r: "COO, Trellis Logistics", c: "Bengaluru, India", industry: "Logistics", rating: 4 },
  { q: "The new site feels like a much larger company. Our enterprise pipeline doubled in 90 days.", a: "Lucía Hernández", r: "Marketing Lead, Atlas Fintech", c: "Mexico City, Mexico", industry: "Fintech", rating: 5 },
  { q: "Honest team. They pushed back on a few of our ideas in a good way and the result is better for it.", a: "James Whitaker", r: "Director, Whitaker & Sons", c: "Manchester, UK", industry: "Manufacturing", rating: 4 },
];

function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Testimonials" title="Trusted by founders worldwide" sub="" />
        <div className="mt-8 flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < 4; const half = i === 4;
                return (
                  <div key={i} className="relative">
                    <Star className={`h-5 w-5 ${filled ? "fill-yellow-400 text-yellow-400" : "text-yellow-400/30"}`} />
                    {half && <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 absolute inset-0 [clip-path:inset(0_30%_0_0)]" />}
                  </div>
                );
              })}
            </div>
            <span className="text-2xl font-display font-bold text-gradient-brand">4.7 / 5</span>
          </div>
          <div className="text-sm text-muted-foreground">Based on 120+ Happy Clients Worldwide</div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.a} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="font-semibold text-foreground text-sm">{t.a}</div>
                    <span title="Verified Client" className="text-[10px] bg-brand-blue/20 text-brand-blue px-1.5 py-0.5 rounded-full font-semibold">✓ Verified</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{t.r} · {t.c}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-yellow-400/30"}`} />
                  ))}
                </div>
              </div>
              <blockquote className="text-sm text-foreground/90 leading-relaxed">"{t.q}"</blockquote>
              <div className="mt-4 text-[10px] uppercase tracking-wider text-muted-foreground">{t.industry}</div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const faqs = FAQ_ITEMS;

function FAQ() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" sub="" />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`} className="glass-card rounded-2xl mb-3 px-5 border-0">
              <AccordionTrigger className="text-left hover:no-underline text-foreground font-medium py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255),
  country: z.string().min(1, "Select your country"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().min(1, "Select a budget"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(2000),
});

const SHEET_WEBHOOK = (import.meta.env.VITE_VOCO_SHEET_WEBHOOK as string | undefined) ?? "";

function Contact({ onBook }: { onBook: () => void }) {
  const [form, setForm] = useState({ name: "", business: "", email: "", country: "IN", phone: "", projectType: "", budget: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) { toast.error(result.error.issues[0]?.message ?? "Please check the form"); return; }
    setSubmitting(true);

    const country = COUNTRIES.find((c) => c.code === form.country);
    const payload = {
      type: "contact",
      ...form,
      countryName: country?.name,
      dialCode: country?.dial,
      submittedAt: new Date().toISOString(),
      source: "voco-website",
    };

    let saved = false;
    if (SHEET_WEBHOOK) {
      try {
        await fetch(SHEET_WEBHOOK, {
          method: "POST", mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        saved = true;
      } catch { /* fallback */ }
    }

    const subject = encodeURIComponent(`New project inquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nCountry: ${country?.name}\nPhone: ${country?.dial} ${form.phone}\nProject: ${form.projectType}\nBudget: ${form.budget}\n\n${form.message}`
    );

    if (saved) {
      toast.success("Thanks! Your inquiry was received. We'll reply within 24 hours.");
    } else {
      toast.success("Opening your email client to send the inquiry to VOCO.");
      window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_blank");
    }
    setForm({ name: "", business: "", email: "", country: "IN", phone: "", projectType: "", budget: "", message: "" });
    setSubmitting(false);
  };

  const dial = COUNTRIES.find((c) => c.code === form.country)?.dial ?? "";

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-purple/20 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-brand-pink mb-4">Contact</div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-display">
              Let's build <span className="text-gradient-brand">something amazing</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              Tell us about your project. We respond within 24 hours with a tailored proposal and next steps.
            </p>
            <div className="mt-8 space-y-4">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-foreground hover:text-brand-pink transition-colors">
                <div className="h-10 w-10 rounded-xl glass-card grid place-items-center"><Mail className="h-4 w-4" /></div>
                {EMAIL}
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-brand-pink transition-colors">
                <div className="h-10 w-10 rounded-xl glass-card grid place-items-center"><Instagram className="h-4 w-4" /></div>
                @voco.web
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-brand-pink transition-colors">
                <div className="h-10 w-10 rounded-xl glass-card grid place-items-center"><MessageCircle className="h-4 w-4" /></div>
                WhatsApp {WHATSAPP_NUMBER}
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="h-10 w-10 rounded-xl glass-card grid place-items-center"><Headphones className="h-4 w-4" /></div>
                24/7 support
              </div>
            </div>
            <Button onClick={onBook} className="mt-8 bg-gradient-brand text-white border-0 hover:opacity-90 rounded-full h-11 px-6">
              <Calendar className="mr-2 h-4 w-4" /> Book Free Consultation
            </Button>
          </div>

          <form onSubmit={onSubmit} className="glass-card rounded-3xl p-7 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="bg-white/[0.03] border-border h-11" /></Field>
              <Field label="Business Name"><Input value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} placeholder="Optional" className="bg-white/[0.03] border-border h-11" /></Field>
            </div>
            <Field label="Email"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="bg-white/[0.03] border-border h-11" /></Field>
            <div className="grid sm:grid-cols-[1fr_1.4fr] gap-4">
              <Field label="Country">
                <Select value={form.country} onValueChange={(v) => setForm({ ...form, country: v })}>
                  <SelectTrigger className="bg-white/[0.03] border-border h-11"><SelectValue /></SelectTrigger>
                  <SelectContent className="max-h-72">
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}><span className="mr-2">{c.flag}</span>{c.name} <span className="text-muted-foreground">({c.dial})</span></SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Phone">
                <div className="flex items-center gap-2">
                  <div className="h-11 px-3 rounded-md border border-border bg-white/[0.03] flex items-center text-sm text-foreground shrink-0">{dial}</div>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className="bg-white/[0.03] border-border h-11" />
                </div>
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Project Type">
                <Select value={form.projectType} onValueChange={(v) => setForm({ ...form, projectType: v })}>
                  <SelectTrigger className="bg-white/[0.03] border-border h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website Design</SelectItem>
                    <SelectItem value="business">Business Website</SelectItem>
                    <SelectItem value="ai">AI Automation</SelectItem>
                    <SelectItem value="seo">SEO Optimization</SelectItem>
                    <SelectItem value="maintenance">Website Maintenance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Budget">
                <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
                  <SelectTrigger className="bg-white/[0.03] border-border h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lt500">Under $500</SelectItem>
                    <SelectItem value="500to2k">$500 – $2,000</SelectItem>
                    <SelectItem value="2to5k">$2,000 – $5,000</SelectItem>
                    <SelectItem value="5kplus">$5,000+</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Message">
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project, goals, and timeline…" rows={5} className="bg-white/[0.03] border-border resize-none" />
            </Field>
            <Button type="submit" disabled={submitting} className="w-full h-12 bg-gradient-brand text-white border-0 hover:opacity-90 rounded-xl">
              {submitting ? "Sending…" : (<>Send Message <Send className="ml-2 h-4 w-4" /></>)}
            </Button>
            <p className="text-xs text-muted-foreground text-center">We typically reply within 24 hours.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const id = useId();
  let injected = children;
  if (
    Array.isArray(children) === false &&
    typeof children === "object" &&
    children !== null &&
    "props" in (children as object)
  ) {
    const el = children as React.ReactElement<{ id?: string }>;
    if (el.type === Input || el.type === Textarea) {
      injected = React.cloneElement(el, { id: el.props.id ?? id });
    }
  }
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">{label}</Label>
      {injected}
    </div>
  );
}

/* ---------------- FLOATING WHATSAPP ---------------- */
function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-whatsapp text-white grid place-items-center shadow-[0_10px_30px_-5px_var(--whatsapp-glow)] hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full bg-whatsapp/40 animate-ping pointer-events-none" />
    </a>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ onBook }: { onBook: () => void }) {
  return (
    <footer className="relative border-t border-border mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo className="h-12" />
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Elite Digital Studio for Websites, Development & Automation for global brands.
            </p>
            <Button onClick={onBook} className="mt-5 bg-gradient-brand text-white border-0 hover:opacity-90 rounded-full h-10 px-5 text-sm">
              <Calendar className="mr-2 h-4 w-4" /> Book Free Consultation
            </Button>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Navigate</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[["#top", "Home"], ["#services", "Services"], ["#portfolio", "Portfolio"], ["#pricing", "Pricing"], ["#contact", "Contact"]].map(([h, l]) => (
                <li key={h}><a href={h} className="hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Connect</h4>
            <div className="flex gap-2">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-lg glass-card grid place-items-center text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-9 w-9 rounded-lg glass-card grid place-items-center text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="Email" className="h-9 w-9 rounded-lg glass-card grid place-items-center text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <a href={`mailto:${EMAIL}`} className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">{EMAIL}</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm text-muted-foreground hover:text-foreground">{WHATSAPP_NUMBER}</a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} VOCO Web Solutions. All rights reserved.</div>
          <div>Crafted globally · Designed in the dark.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SHARED ---------------- */
function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <Reveal variant="up" className="max-w-2xl mx-auto text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-brand-pink">{eyebrow}</div>
      <h2 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight font-display">{title}</h2>
      {sub && <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

/* ---------------- PAGE ---------------- */
function Home() {
  const [booking, setBooking] = useState(false);
  const onBook = () => setBooking(true);
  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <Loader />
      <AmbientBackground />
      <div className="relative z-10">
      <MouseGlow />
      <Nav onBook={onBook} />
      <Hero onBook={onBook} />
      <BrandTicker />
      <Services />
      <Portfolio />
      <WhyChoose />
      <Process />
      <Pricing onBook={onBook} />
      <Testimonials />
      <FAQ />
      <Contact onBook={onBook} />
      <Footer onBook={onBook} />
      <WhatsAppFloat />
      <BookingModal open={booking} onOpenChange={setBooking} />
      </div>
    </main>
  );
}
