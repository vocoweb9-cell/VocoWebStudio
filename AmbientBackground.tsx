import { useEffect, useState } from "react";

/**
 * Cinematic ambient layer — web & automation themed:
 * - Radial vignette + animated mesh gradients
 * - Parallax floating orbs (brand color)
 * - SVG circuit / node network drifting slowly
 * - Floating "code" chips (</>, {}, AI, ⚙) that rise like sparks
 * - Fine grid + film noise
 *
 * Fixed, behind all content (z = 0), pointer-events: none.
 */
export function AmbientBackground() {
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setP({ x, y });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const chips = ["</>", "{ }", "AI", "⚙", "()", "[ ]", "λ", "→", "01", "AI"];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.12_0.02_280),transparent_60%)]" />

      {/* Floating orbs with mouse parallax */}
      <div
        className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-brand-blue/25 blur-[140px] animate-float-orb"
        style={{ transform: `translate3d(${p.x}px, ${p.y}px, 0)` }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full bg-brand-pink/20 blur-[160px] animate-float-orb"
        style={{ transform: `translate3d(${-p.x}px, ${-p.y}px, 0)`, animationDelay: "3s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-brand-purple/20 blur-[150px] animate-float-orb"
        style={{ transform: `translate3d(${p.x * 0.6}px, ${-p.y * 0.6}px, 0)`, animationDelay: "6s" }}
      />

      {/* Circuit / node network */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.14] mix-blend-screen circuit-drift"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.75 0.2 255)" />
            <stop offset="50%" stopColor="oklch(0.7 0.22 295)" />
            <stop offset="100%" stopColor="oklch(0.72 0.24 0)" />
          </linearGradient>
        </defs>
        <g stroke="url(#wire)" strokeWidth="1" fill="none">
          <path d="M0 120 L200 120 L260 180 L520 180 L580 120 L900 120 L960 200 L1200 200" />
          <path d="M0 320 L160 320 L220 260 L440 260 L500 340 L780 340 L840 280 L1200 280" />
          <path d="M0 520 L240 520 L300 580 L560 580 L620 500 L880 500 L940 560 L1200 560" />
          <path d="M0 700 L300 700 L360 640 L640 640 L700 720 L980 720 L1040 660 L1200 660" />
        </g>
        <g fill="oklch(0.85 0.2 295)">
          {[
            [200, 120], [520, 180], [900, 120], [960, 200],
            [160, 320], [440, 260], [780, 340], [1040, 660],
            [240, 520], [560, 580], [880, 500], [700, 720],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" className="node-pulse" style={{ animationDelay: `${(i % 6) * 0.4}s` }} />
          ))}
        </g>
      </svg>

      {/* Floating code / automation chips */}
      <div className="absolute inset-0">
        {chips.map((c, i) => (
          <span
            key={i}
            className="absolute font-mono text-[10px] tracking-widest text-white/[0.35] chip-rise"
            style={{
              left: `${(i * 97) % 100}%`,
              bottom: `-40px`,
              animationDelay: `${i * 2.3}s`,
              animationDuration: `${18 + (i % 5) * 4}s`,
            }}
          >
            {c}
          </span>
        ))}
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}
