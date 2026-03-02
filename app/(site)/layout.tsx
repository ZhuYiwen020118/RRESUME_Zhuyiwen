import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getHeroContent } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const hero = await getHeroContent();

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader slogan={hero.slogan} />
      <main className="relative z-10 flex-1 pb-8 pt-16">{children}</main>
      <SiteFooter />
    </div>
  );
}
