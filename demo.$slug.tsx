import { createFileRoute, notFound } from "@tanstack/react-router";
import { DemoSite } from "@/components/DemoSite";
import { demoConfigs } from "@/lib/demoConfigs";

export const Route = createFileRoute("/demo/$slug")({
  head: ({ params }) => {
    const cfg = demoConfigs[params.slug];
    if (!cfg) return { meta: [{ title: "Demo not found · VOCO" }] };
    const url = `https://vocoweb.lovable.app/demo/${params.slug}`;
    return {
      meta: [
        { title: `${cfg.brand} — Demo by VOCO Web Solutions` },
        { name: "description", content: `${cfg.brand}: ${cfg.tagline} A demo website by VOCO Web Solutions.` },
        { property: "og:title", content: `${cfg.brand} — Demo by VOCO Web Solutions` },
        { property: "og:description", content: cfg.tagline },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  loader: ({ params }) => {
    if (!demoConfigs[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  component: DemoPage,
  errorComponent: () => <div className="min-h-screen grid place-items-center text-foreground">Something went wrong loading this demo.</div>,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground text-center px-4">
      <div>
        <h1 className="text-3xl font-bold">Demo not found</h1>
        <a href="/" className="mt-4 inline-block text-brand-pink underline">Back to VOCO</a>
      </div>
    </div>
  ),
});

function DemoPage() {
  const { slug } = Route.useParams();
  const cfg = demoConfigs[slug];
  return <DemoSite cfg={cfg} />;
}
