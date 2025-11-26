import { prisma } from "@/lib/prisma";
import { FormCard } from "@/components/admin/form-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  saveHeroContent,
  saveAboutContent,
  saveEducation,
  deleteEducation,
  saveMetric,
  deleteMetric,
  saveContact,
  saveContactLink,
  deleteContactLink
} from "@/app/admin/actions";

type HeroPayload = {
  name?: string;
  slogan?: string;
  intro?: string;
  tags?: string[];
  avatar?: string;
};

type AboutPayload = {
  bio?: string;
  highlights?: string[];
};

type ContactPayload = {
  email?: string;
  phone?: string;
  note?: string;
};

export default async function AdminContentPage() {
  const [hero, about, education, metrics, contact, contactLinks] = await Promise.all([
    prisma.contentBlock.findUnique({ where: { key: "hero" } }),
    prisma.contentBlock.findUnique({ where: { key: "about" } }),
    prisma.education.findMany({ orderBy: { orderIndex: "asc" } }),
    prisma.highlightMetric.findMany({ orderBy: { orderIndex: "asc" } }),
    prisma.contentBlock.findUnique({ where: { key: "contact" } }),
    prisma.contactLink.findMany({ orderBy: { priority: "desc" } })
  ]);

  const heroPayload = (hero?.payload as HeroPayload) ?? {};
  const aboutPayload = (about?.payload as AboutPayload) ?? {};
  const contactPayload = (contact?.payload as ContactPayload) ?? {};

  return (
    <div className="space-y-10">
      <FormCard
        title="首页头屏文案"
        description="包含姓名、Slogan、标签与简介，前台首页与简历页共用。"
      >
        <form action={saveHeroContent} className="grid gap-4 md:grid-cols-2">
          <Input name="name" defaultValue={heroPayload?.name ?? ""} placeholder="姓名" required />
          <Input name="slogan" defaultValue={heroPayload?.slogan ?? ""} placeholder="Slogan" required />
          <Textarea
            name="intro"
            className="md:col-span-2"
            rows={3}
            placeholder="简短介绍"
            defaultValue={heroPayload?.intro ?? ""}
          />
          <Input
            name="avatar"
            className="md:col-span-2"
            placeholder="证件照或头像链接（例如 /media/profile.jpg）"
            defaultValue={heroPayload?.avatar ?? "/media/profile-placeholder.svg"}
          />
          <Input
            name="tags"
            className="md:col-span-2"
            placeholder="标签，逗号分隔"
            defaultValue={(heroPayload?.tags ?? []).join(", ")}
          />
          <div className="md:col-span-2">
            <Button type="submit">保存文案</Button>
          </div>
        </form>
      </FormCard>

      <FormCard
        title="关于页自述"
        description="写入个人简介与能力亮点列表。"
      >
        <form action={saveAboutContent} className="space-y-4">
          <Textarea
            name="bio"
            rows={4}
            placeholder="个人介绍"
            defaultValue={aboutPayload?.bio ?? ""}
          />
          <Textarea
            name="highlights"
            rows={3}
            placeholder="亮点（逗号分隔）"
            defaultValue={(aboutPayload?.highlights ?? []).join(", ")}
          />
          <Button type="submit">保存关于页</Button>
        </form>
      </FormCard>

      <FormCard
        title="教育经历"
        description="可按照排序字段控制前台展示顺序。"
      >
        <form action={saveEducation} className="grid gap-4 md:grid-cols-2">
          <Input name="school" placeholder="学校 *" required />
          <Input name="degree" placeholder="学位 *" required />
          <Input name="major" placeholder="专业" />
          <Input name="location" placeholder="城市" />
          <Input name="startDate" type="date" placeholder="开始时间" />
          <Input name="endDate" type="date" placeholder="结束时间" />
          <Input name="orderIndex" type="number" placeholder="排序（越小越靠前）" />
          <div />
          <Textarea
            name="highlights"
            className="md:col-span-2"
            placeholder="荣誉 / 课程（逗号分隔）"
            rows={3}
          />
          <div className="md:col-span-2">
            <Button type="submit">新增教育经历</Button>
          </div>
        </form>
        <div className="mt-6 space-y-4">
          {education.length === 0 && (
            <p className="text-sm text-white/60">暂无教育经历，使用上方表单新增。</p>
          )}
          {education.map((edu) => {
            const deleteAction = deleteEducation.bind(null, edu.id);
            return (
              <div key={edu.id} className="rounded-2xl border border-white/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/70">
                  <p>{edu.school} · {edu.degree}</p>
                  <form action={deleteAction}>
                    <Button type="submit" variant="outline" className="text-xs">
                      删除
                    </Button>
                  </form>
                </div>
                <form action={saveEducation} className="mt-4 grid gap-3 md:grid-cols-2">
                  <input type="hidden" name="id" value={edu.id} />
                  <Input name="school" defaultValue={edu.school} />
                  <Input name="degree" defaultValue={edu.degree} />
                  <Input name="major" defaultValue={edu.major ?? ""} />
                  <Input name="location" defaultValue={edu.location ?? ""} />
                  <Input
                    name="startDate"
                    type="date"
                    defaultValue={edu.startDate?.toISOString().slice(0, 10)}
                  />
                  <Input
                    name="endDate"
                    type="date"
                    defaultValue={edu.endDate?.toISOString().slice(0, 10)}
                  />
                  <Input name="orderIndex" type="number" defaultValue={edu.orderIndex} />
                  <div />
                  <Textarea
                    name="highlights"
                    className="md:col-span-2"
                    defaultValue={edu.highlights.join(", ")}
                  />
                  <div className="md:col-span-2">
                    <Button type="submit">更新</Button>
                  </div>
                </form>
              </div>
            );
          })}
        </div>
      </FormCard>

      <FormCard
        title="核心指标卡片"
        description="展示在首页 / 关于 / 简历页，用于突出可量化成果。"
      >
        <form action={saveMetric} className="grid gap-4 md:grid-cols-2">
          <Input name="label" placeholder="指标名称 *" required />
          <Input name="value" placeholder="指标数值 *" required />
          <Input name="orderIndex" type="number" placeholder="排序" />
          <Textarea name="description" className="md:col-span-2" placeholder="说明" rows={2} />
          <div className="md:col-span-2">
            <Button type="submit">新增指标</Button>
          </div>
        </form>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {metrics.length === 0 && (
            <p className="text-sm text-white/60 md:col-span-2">暂无指标，添加后可在首页等位置展示。</p>
          )}
          {metrics.map((metric) => {
            const deleteAction = deleteMetric.bind(null, metric.id);
            return (
              <div key={metric.id} className="rounded-2xl border border-white/10 p-4 space-y-3">
                <form action={saveMetric} className="space-y-3">
                  <input type="hidden" name="id" value={metric.id} />
                  <Input name="label" defaultValue={metric.label} />
                  <Input name="value" defaultValue={metric.value} />
                  <Input name="orderIndex" type="number" defaultValue={metric.orderIndex} />
                  <Textarea name="description" rows={2} defaultValue={metric.description ?? ""} />
                  <Button type="submit">更新</Button>
                </form>
                <form action={deleteAction}>
                  <Button type="submit" variant="outline" className="w-full">
                    删除
                  </Button>
                </form>
              </div>
            );
          })}
        </div>
      </FormCard>

      <FormCard
        title="联系方式与社交"
        description="邮箱、电话、社交账号按钮均可在此维护。"
      >
        <form action={saveContact} className="grid gap-4 md:grid-cols-2">
          <Input name="email" placeholder="邮箱 *" defaultValue={contactPayload?.email ?? ""} required />
          <Input name="phone" placeholder="电话 / 微信" defaultValue={contactPayload?.phone ?? ""} />
          <Textarea
            name="note"
            className="md:col-span-2"
            placeholder="备注"
            defaultValue={contactPayload?.note ?? ""}
          />
          <div className="md:col-span-2">
            <Button type="submit">保存联系方式</Button>
          </div>
        </form>
        <div className="mt-6 space-y-4">
          <form action={saveContactLink} className="grid gap-4 md:grid-cols-2">
            <Input name="platform" placeholder="社交平台 *" required />
            <Input name="handle" placeholder="显示文案" />
            <Input name="url" placeholder="链接 *" required />
            <Input name="priority" type="number" placeholder="优先级" />
            <Input name="icon" placeholder="图标（可选）" />
            <div className="md:col-span-2">
              <Button type="submit">新增社交链接</Button>
            </div>
          </form>
          <div className="grid gap-4 md:grid-cols-2">
            {contactLinks.length === 0 && (
              <p className="text-sm text-white/60 md:col-span-2">尚未配置社交链接。</p>
            )}
            {contactLinks.map((link) => {
              const deleteAction = deleteContactLink.bind(null, link.id);
              return (
                <div key={link.id} className="rounded-2xl border border-white/10 p-4 space-y-3">
                  <form action={saveContactLink} className="space-y-3">
                    <input type="hidden" name="id" value={link.id} />
                    <Input name="platform" defaultValue={link.platform} />
                    <Input name="handle" defaultValue={link.handle ?? ""} />
                    <Input name="url" defaultValue={link.url} />
                    <Input name="priority" type="number" defaultValue={link.priority} />
                    <Input name="icon" defaultValue={link.icon ?? ""} />
                    <Button type="submit">更新</Button>
                  </form>
                  <form action={deleteAction}>
                    <Button type="submit" variant="outline" className="w-full">
                      删除
                    </Button>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      </FormCard>
    </div>
  );
}

