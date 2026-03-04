import { prisma } from "@/lib/prisma";
import { FormCard } from "@/components/admin/form-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  saveHeroContent,
  saveContact,
  saveContactLink,
  deleteContactLink,
  saveHobby,
  deleteHobby
} from "@/app/admin/actions";

type HeroPayload = {
  name?: string;
  slogan?: string;
  intro?: string;
  vividIntro?: string;
  tags?: string[];
  avatar?: string;
};

type ContactPayload = {
  email?: string;
  phone?: string;
  note?: string;
};

export default async function AdminContentPage() {
  const [hero, contact, contactLinks, hobbies] = await Promise.all([
    prisma.contentBlock.findUnique({ where: { key: "hero" } }),
    prisma.contentBlock.findUnique({ where: { key: "contact" } }),
    prisma.contactLink.findMany({ orderBy: { priority: "desc" } }),
    prisma.hobby.findMany({ orderBy: { orderIndex: "asc" } })
  ]);

  const heroPayload = (hero?.payload as HeroPayload) ?? {};
  const contactPayload = (contact?.payload as ContactPayload) ?? {};

  return (
    <div className="space-y-10">
      <FormCard title="首页头屏文案" description="包含姓名、Slogan、标签与简介，前台首页共用。">
        <form action={saveHeroContent} className="grid gap-4 md:grid-cols-2">
          <Input name="name" defaultValue={heroPayload?.name ?? ""} placeholder="姓名" required />
          <Input name="slogan" defaultValue={heroPayload?.slogan ?? ""} placeholder="Slogan（选填）" />
          <Textarea
            name="vividIntro"
            className="md:col-span-2"
            rows={2}
            placeholder="生动的个人介绍（例如：hello，我叫朱译文，毕业于香港浸会大学...）"
            defaultValue={heroPayload?.vividIntro ?? ""}
          />
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
        title="兴趣爱好"
        description="管理首页展示的兴趣爱好卡片。"
      >
        <form action={saveHobby} className="grid gap-4 md:grid-cols-2">
          <Input name="name" placeholder="兴趣爱好名称 *" required />
          <Input name="icon" placeholder="图标（可选，如 emoji）" />
          <Textarea
            name="description"
            className="md:col-span-2"
            placeholder="描述"
            rows={2}
          />
          <Input name="orderIndex" type="number" placeholder="排序（越小越靠前）" />
          <div className="md:col-span-2">
            <Button type="submit">新增兴趣爱好</Button>
          </div>
        </form>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {hobbies.length === 0 && (
            <p className="text-sm text-white/60 md:col-span-2">暂无兴趣爱好，使用上方表单新增。</p>
          )}
          {hobbies.map((hobby) => {
            const deleteAction = deleteHobby.bind(null, hobby.id);
            return (
              <div key={hobby.id} className="rounded-2xl border border-white/10 p-4 space-y-3">
                <form action={saveHobby} className="space-y-3">
                  <input type="hidden" name="id" value={hobby.id} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input name="name" defaultValue={hobby.name} placeholder="名称" />
                    <Input name="icon" defaultValue={hobby.icon ?? ""} placeholder="图标" />
                  </div>
                  <Textarea
                    name="description"
                    rows={2}
                    defaultValue={hobby.description ?? ""}
                    placeholder="描述"
                  />
                  <div className="flex items-center gap-3">
                    <Input
                      name="orderIndex"
                      type="number"
                      defaultValue={hobby.orderIndex}
                      placeholder="排序"
                      className="w-24"
                    />
                    <Button type="submit">更新</Button>
                  </div>
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

