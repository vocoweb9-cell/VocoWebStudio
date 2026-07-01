import { useEffect, useState } from "react";
import logoAsset from "@/assets/voco-logo-v2.asset.json";

export function Loader() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setFading(true), 700);
    const t2 = window.setTimeout(() => setHidden(true), 1500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"}`}
    >
      <div className="absolute inset-0 animated-mesh opacity-60" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 -m-6 rounded-full bg-gradient-brand blur-2xl opacity-50 animate-pulse-glow" />
          <img
            src={logoAsset.url}
            alt="VOCO"
            className="relative h-20 w-auto animate-float-orb"
            style={{ animationDuration: "4s" }}
          />
        </div>
        <div className="h-[2px] w-44 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-1/2 rounded-full bg-gradient-brand loader-sweep" />
        </div>
      </div>
    </div>
  );
}
