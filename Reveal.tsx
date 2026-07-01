import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "up" | "scale" | "blur" | "fade";

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base =
    "will-change-transform transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
  const hidden = {
    up: "opacity-0 translate-y-8",
    scale: "opacity-0 scale-[0.96]",
    blur: "opacity-0 blur-md translate-y-4",
    fade: "opacity-0",
  }[variant];
  const visible = "opacity-100 translate-y-0 scale-100 blur-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${base} ${shown ? visible : hidden} ${className}`}
    >
      {children}
    </div>
  );
}
