import type { ContactLink } from "@prisma/client";
import { getContactContent } from "@/lib/data";
import { Section } from "@/components/section";

export default async function ContactPage() {
  const contact = await getContactContent();

  return (
    <Section eyebrow="联系" title="联系方式">
      <div className="space-y-5">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <dl className="space-y-4">
            <div>
              <dt className="text-xs text-white/40">邮箱</dt>
              <dd className="mt-1 text-lg text-white">{contact.email}</dd>
            </div>
            {contact.phone && (
              <div>
                <dt className="text-xs text-white/40">电话 / 微信</dt>
                <dd className="mt-1 text-lg text-white">{contact.phone}</dd>
              </div>
            )}
          </dl>
        </div>

        {contact.links.length > 0 && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h3 className="mb-4 text-sm font-medium text-white/60">社交账号</h3>
            <div className="space-y-2">
              {(contact.links as ContactLink[]).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-white/[0.06] px-4 py-2.5 text-sm transition-colors hover:border-white/10 hover:bg-white/[0.02]"
                >
                  <span className="text-white/70">{link.platform}</span>
                  <span className="text-neon-300">{link.handle ?? "→"}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

