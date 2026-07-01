import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Mail, Phone, MapPin, Star, Menu, X, Send, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type DemoConfig = {
  brand: string;
  tagline: string;
  industry: string;
  hero: { eyebrow: string; title: string; subtitle: string; cta: string; image: string };
  accent: { from: string; to: string }; // tailwind gradient stops e.g. "amber-400" "rose-500"
  about: { title: string; body: string; bullets: string[] };
  services: { title: string; desc: string }[];
  contact: { email: string; phone: string; address: string };
  testimonial: { quote: string; author: string; role: string };
};

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Valid email required").max(160),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
});

export function DemoSite({ cfg }: { cfg: DemoConfig }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"home" | "about" | "services" | "contact">("home");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const go = (t: typeof tab) => { setTab(t); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { toast.error(r.error.issues[0].message); return; }
    toast.success(`Thanks ${form.name.split(" ")[0]} — ${cfg.brand} will be in touch shortly.`);
    setForm({ name: "", email: "", message: "" });
  };

  const accent = `bg-gradient-to-r from-${cfg.accent.from} to-${cfg.accent.to}`;
  const accentText = `bg-gradient-to-r from-${cfg.accent.from} to-${cfg.accent.to} bg-clip-text text-transparent`;

  const navLinks: { id: typeof tab; label: string }[] = [
    { id: "home", label: "Home" }, { id: "about", label: "About" },
    { id: "services", label: "Services" }, { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Demo badge bar */}
      <div className="sticky top-0 z-[60] bg-black/80 backdrop-blur border-b border-white/10 text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <span className="text-muted-foreground">Demo by <span className={accentText + " font-semibold"}>VOCO Web Solutions</span></span>
          <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to VOCO
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-[33px] z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={() => go("home")} className="font-display text-xl font-bold tracking-tight">
            <span className={accentText}>{cfg.brand}</span>
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className={`text-sm transition-colors ${tab === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {l.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => go("contact")} className={`hidden md:inline-flex rounded-full text-white border-0 ${accent} hover:opacity-90 h-9 px-4 text-sm`}>
            {cfg.hero.cta}
          </Button>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {open && (
          <div className="md:hidden border-t border-white/5 px-4 py-3 flex flex-col gap-2 bg-background/95">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="text-left text-sm py-2 text-muted-foreground hover:text-foreground">{l.label}</button>
            ))}
            <Button onClick={() => go("contact")} className={`w-full text-white border-0 ${accent}`}>{cfg.hero.cta}</Button>
          </div>
        )}
      </header>

      {tab === "home" && (
        <>
          <section className="relative overflow-hidden py-20 sm:py-28">
            <div className={`absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-30 blur-[120px] ${accent}`} />
            <div className={`absolute bottom-0 -right-32 h-96 w-96 rounded-full opacity-20 blur-[120px] ${accent}`} />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">{cfg.hero.eyebrow}</div>
                <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight leading-[1.05]">
                  {cfg.hero.title.split("|").map((part, i) =>
                    i === 1 ? <span key={i} className={accentText}>{part}</span> : <span key={i}>{part}</span>
                  )}
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl">{cfg.hero.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={() => go("contact")} className={`rounded-full text-white border-0 ${accent} hover:opacity-90 h-12 px-6`}>
                    {cfg.hero.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button onClick={() => go("services")} variant="outline" className="rounded-full h-12 px-6 border-border">Learn More</Button>
                </div>
              </div>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-card animate-fade-up" style={{ animationDelay: "0.15s" }}>
                <img src={cfg.hero.image} alt={cfg.brand} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className={`absolute inset-0 bg-gradient-to-tr ${accent} opacity-20 mix-blend-overlay`} />
              </div>
            </div>
          </section>

          {/* Featured Services preview */}
          <section className="py-16 sm:py-24 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">What we offer</div>
                <h2 className="mt-2 text-3xl sm:text-4xl font-display font-bold">Crafted for {cfg.industry.toLowerCase()}</h2>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cfg.services.slice(0, 3).map((s) => (
                  <div key={s.title} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform">
                    <div className={`h-10 w-10 rounded-xl ${accent} mb-4`} />
                    <h3 className="font-semibold text-lg">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="py-16 sm:py-24 border-t border-white/5">
            <div className="mx-auto max-w-3xl px-4 text-center">
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <blockquote className="text-2xl sm:text-3xl font-display tracking-tight">"{cfg.testimonial.quote}"</blockquote>
              <div className="mt-6 text-sm text-muted-foreground">— {cfg.testimonial.author}, {cfg.testimonial.role}</div>
            </div>
          </section>
        </>
      )}

      {tab === "about" && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 animate-fade-up">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">About {cfg.brand}</div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">{cfg.about.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{cfg.about.body}</p>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {cfg.about.bullets.map((b) => (
                <div key={b} className="glass-card rounded-xl p-4 flex items-start gap-3">
                  <Check className={`h-5 w-5 mt-0.5 shrink-0 ${accentText}`} />
                  <span className="text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === "services" && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl animate-fade-up">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Services</div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold">Everything we deliver</h1>
              <p className="mt-4 text-muted-foreground">A complete suite designed around {cfg.industry.toLowerCase()} clients.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {cfg.services.map((s) => (
                <div key={s.title} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform">
                  <div className={`h-10 w-10 rounded-xl ${accent} mb-4`} />
                  <h3 className="font-semibold text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === "contact" && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
            <div className="animate-fade-up">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Get in touch</div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold">Let's talk</h1>
              <p className="mt-4 text-muted-foreground max-w-md">Reach out and our team will get back within one business day.</p>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3"><Mail className={`h-4 w-4 ${accentText}`} /> {cfg.contact.email}</div>
                <div className="flex items-center gap-3"><Phone className={`h-4 w-4 ${accentText}`} /> {cfg.contact.phone}</div>
                <div className="flex items-center gap-3"><MapPin className={`h-4 w-4 ${accentText}`} /> {cfg.contact.address}</div>
              </div>
            </div>
            <form onSubmit={onSubmit} className="glass-card rounded-3xl p-7 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="h-11 bg-white/[0.03]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="h-11 bg-white/[0.03]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Message</Label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="How can we help?" className="resize-none bg-white/[0.03]" />
              </div>
              <Button type="submit" className={`w-full h-12 text-white border-0 rounded-xl ${accent} hover:opacity-90`}>
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      )}

      <footer className="border-t border-white/5 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} {cfg.brand}. {cfg.tagline}</div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/voco.web/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <Link to="/" className="hover:text-foreground">Built by VOCO</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
