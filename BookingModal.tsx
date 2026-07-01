import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Calendar, Send, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries";

const EMAIL = "voco.web9@gmail.com";
const WEBHOOK = (import.meta.env.VITE_VOCO_SHEET_WEBHOOK as string | undefined) ?? "";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  business: z.string().trim().min(1, "Business name required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  country: z.string().min(1, "Select your country"),
  phone: z.string().trim().min(5, "Enter a valid phone number").max(30),
  businessType: z.string().min(1, "Select a business type"),
  budget: z.string().min(1, "Select your budget"),
  date: z.string().min(1, "Pick a preferred date"),
  details: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(2000),
});

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export function BookingModal({ open, onOpenChange }: Props) {
  const [f, setF] = useState({
    name: "", business: "", email: "", country: "IN", phone: "",
    businessType: "", budget: "", date: "", details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const set = (k: keyof typeof f) => (v: string) => setF((s) => ({ ...s, [k]: v }));
  const dial = COUNTRIES.find((c) => c.code === f.country)?.dial ?? "";

  const reset = () => {
    setF({ name: "", business: "", email: "", country: "IN", phone: "", businessType: "", budget: "", date: "", details: "" });
    setSuccess(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Please check the form"); return; }
    setSubmitting(true);

    const country = COUNTRIES.find((c) => c.code === f.country);
    const payload = {
      type: "consultation",
      ...f,
      countryName: country?.name ?? f.country,
      dialCode: country?.dial ?? "",
      fullPhone: `${country?.dial ?? ""} ${f.phone}`,
      submittedAt: new Date().toISOString(),
      source: "voco-website",
    };

    let saved = false;
    if (WEBHOOK) {
      try {
        await fetch(WEBHOOK, {
          method: "POST", mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        saved = true;
      } catch { /* mailto fallback */ }
    }

    if (!saved) {
      const subject = encodeURIComponent(`Free Consultation — ${f.name} (${f.business})`);
      const body = encodeURIComponent(
        `Full Name: ${f.name}\nBusiness: ${f.business}\nEmail: ${f.email}\nCountry: ${country?.name}\nPhone: ${country?.dial} ${f.phone}\nBusiness Type: ${f.businessType}\nBudget: ${f.budget}\nPreferred Date: ${f.date}\n\nProject Details:\n${f.details}`
      );
      window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_blank");
    }

    setSubmitting(false);
    setSuccess(true);
    toast.success("Booking received! We'll be in touch within 24 hours.");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setTimeout(reset, 200); }}>
      <DialogContent className="glass-card border-white/10 max-w-2xl max-h-[92vh] overflow-y-auto p-0">
        <div className="p-6 sm:p-8">
          {success ? (
            <div className="text-center py-10">
              <div className="mx-auto h-14 w-14 rounded-full bg-gradient-brand grid place-items-center mb-5">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">Booking confirmed</h3>
              <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
                Thanks {f.name || "—"}, we've received your consultation request. The VOCO team will reach out to <span className="text-foreground">{f.email}</span> within 24 hours.
              </p>
              <Button onClick={() => onOpenChange(false)} className="mt-6 bg-gradient-brand text-white border-0 hover:opacity-90 rounded-full h-11 px-7">Close</Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="text-xs uppercase tracking-[0.25em] text-brand-pink mb-2">Free Consultation</div>
                <DialogTitle className="text-2xl font-display font-bold text-foreground">Book your discovery call</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Tell us about your project. We'll respond within 24 hours with next steps and a tailored proposal.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FieldB label="Full Name *"><Input value={f.name} onChange={(e) => set("name")(e.target.value)} placeholder="Your full name" className="bg-white/[0.03] border-border h-11" /></FieldB>
                  <FieldB label="Business Name *"><Input value={f.business} onChange={(e) => set("business")(e.target.value)} placeholder="Company / brand" className="bg-white/[0.03] border-border h-11" /></FieldB>
                </div>
                <FieldB label="Email *"><Input type="email" value={f.email} onChange={(e) => set("email")(e.target.value)} placeholder="you@company.com" className="bg-white/[0.03] border-border h-11" /></FieldB>

                <div className="grid sm:grid-cols-[1fr_1.4fr] gap-4">
                  <FieldB label="Country *">
                    <Select value={f.country} onValueChange={set("country")}>
                      <SelectTrigger className="bg-white/[0.03] border-border h-11"><SelectValue /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {COUNTRIES.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="mr-2">{c.flag}</span>{c.name} <span className="text-muted-foreground">({c.dial})</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldB>
                  <FieldB label="Phone Number *">
                    <div className="flex items-center gap-2">
                      <div className="h-11 px-3 rounded-md border border-border bg-white/[0.03] flex items-center text-sm text-foreground shrink-0">{dial}</div>
                      <Input value={f.phone} onChange={(e) => set("phone")(e.target.value.replace(/[^\d\s-]/g, ""))} placeholder="72069 55571" className="bg-white/[0.03] border-border h-11" />
                    </div>
                  </FieldB>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FieldB label="Business Type *">
                    <Select value={f.businessType} onValueChange={set("businessType")}>
                      <SelectTrigger className="bg-white/[0.03] border-border h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {["Restaurant / Food","Real Estate","Healthcare","Coaching / Education","SaaS / Tech","Consulting","E-commerce","Hospitality","Finance","Other"].map((x) => (
                          <SelectItem key={x} value={x}>{x}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldB>
                  <FieldB label="Budget *">
                    <Select value={f.budget} onValueChange={set("budget")}>
                      <SelectTrigger className="bg-white/[0.03] border-border h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {["Under $500","$500 – $2,000","$2,000 – $5,000","$5,000 – $10,000","$10,000+"].map((x) => (
                          <SelectItem key={x} value={x}>{x}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FieldB>
                </div>

                <FieldB label="Preferred Meeting Date *">
                  <Input type="date" value={f.date} onChange={(e) => set("date")(e.target.value)} min={new Date().toISOString().slice(0, 10)} className="bg-white/[0.03] border-border h-11" />
                </FieldB>

                <FieldB label="Project Details *">
                  <Textarea value={f.details} onChange={(e) => set("details")(e.target.value)} placeholder="Goals, timeline, features you need…" rows={4} className="bg-white/[0.03] border-border resize-none" />
                </FieldB>

                <Button type="submit" disabled={submitting} className="w-full h-12 bg-gradient-brand text-white border-0 hover:opacity-90 rounded-xl">
                  {submitting ? "Submitting…" : (<>Book My Free Consultation <Send className="ml-2 h-4 w-4" /></>)}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Your details are sent to {EMAIL}. We'll confirm within 24 hours.
                </p>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FieldB({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
