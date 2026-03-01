import { prisma } from "@/lib/prisma";
import { FormCard } from "@/components/admin/form-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { saveExternalLink, deleteExternalLink } from "@/app/admin/actions";

export default async function AdminLinksPage() {
  const links = await prisma.externalLink.findMany({
    orderBy: { publishDate: "desc" }
  });

  return (
    <div className="space-y-10">
      <FormCard
        title="新增新闻 / 报道链接"
        description="用于媒体报道、活动新闻、外部视频链接等。"
      >
        <form action={saveExternalLink} className="grid gap-4 md:grid-cols-2">
          <Input name="title" placeholder="标题 *" required />
          <Input name="platform" placeholder="平台（如 央视新闻）" />
          <Input name="category" placeholder="分类标签" />
          <Input name="url" placeholder="跳转链接 *" required />
          <Input name="publishDate" type="date" placeholder="发布日期" />
          <Input name="tags" placeholder="标签，逗号分隔" />
          <Textarea
            name="summary"
            className="md:col-span-2"
            placeholder="摘要"
            rows={3}
          />
          <div className="md:col-span-2">
            <Button type="submit">保存链接</Button>
          </div>
        </form>
      </FormCard>

      <div className="space-y-6">
        {links.length === 0 && (
          <p className="text-sm text-white/60">暂无外部链接，使用上方表单新增。</p>
        )}
        {links.map((link) => {
          const deleteAction = deleteExternalLink.bind(null, link.id);
          return (
            <FormCard
              key={link.id}
              title={link.title}
              description={link.platform ?? ""}
              aside={
                <form action={deleteAction}>
                  <Button type="submit" variant="outline">
                    删除
                  </Button>
                </form>
              }
            >
              <form action={saveExternalLink} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={link.id} />
                <Input name="title" defaultValue={link.title} />
                <Input name="platform" defaultValue={link.platform ?? ""} />
                <Input name="category" defaultValue={link.category ?? ""} />
                <Input name="url" defaultValue={link.url} />
                <Input
                  name="publishDate"
                  type="date"
                  defaultValue={link.publishDate?.toISOString().slice(0, 10)}
                />
                <Input name="tags" defaultValue={link.tags.join(", ")} />
                <Textarea
                  name="summary"
                  className="md:col-span-2"
                  defaultValue={link.summary ?? ""}
                />
                <div className="md:col-span-2">
                  <Button type="submit">更新</Button>
                </div>
              </form>
            </FormCard>
          );
        })}
      </div>
    </div>
  );
}

