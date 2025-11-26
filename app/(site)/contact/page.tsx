import type { ContactLink } from "@prisma/client";
import { getContactContent } from "@/lib/data";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";

export default async function ContactPage() {
  const contact = await getContactContent();

  return (
    <Section
      eyebrow="Contact"
      title="保持联络 / 合作洽谈"
      description="集中展示邮箱、电话与社交账号，保持面试与投递信息一致。"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white">联系方式</h3>
            <p className="mt-2 text-sm text-white/70">
              {contact.note || "如需 PPT / 案例详情，可留言或邮件沟通。"}
            </p>
            <dl className="mt-6 space-y-4 text-sm text-white/80">
              <div>
                <dt className="text-white/50">邮箱</dt>
                <dd className="text-lg text-neon-300">{contact.email}</dd>
              </div>
              {contact.phone && (
                <div>
                  <dt className="text-white/50">电话 / 微信</dt>
                  <dd className="text-lg">{contact.phone}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white">社交账号</h3>
            {contact.links.length === 0 ? (
              <p className="mt-4 text-sm text-white/60">暂无社交链接，稍后补充。</p>
            ) : (
              <div className="mt-4 space-y-3 text-sm text-white/70">
              {(contact.links as ContactLink[]).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 transition hover:border-neon-400/60"
                  >
                    <span>{link.platform}</span>
                    <span className="text-neon-300">{link.handle ?? "查看"}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}

