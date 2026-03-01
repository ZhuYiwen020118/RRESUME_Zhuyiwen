import { prisma } from "@/lib/prisma";
import { FormCard } from "@/components/admin/form-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { saveProject, deleteProject } from "@/app/admin/actions";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { orderIndex: "asc" }
  });

  return (
    <div className="space-y-10">
      <FormCard
        title="项目展示"
        description="在首页展示的项目卡片，可添加图片和描述。"
      >
        <form action={saveProject} className="grid gap-4 md:grid-cols-2">
          <Input name="title" placeholder="项目名称 *" required />
          <Input name="orderIndex" type="number" placeholder="排序（越小越靠前）" />
          <Textarea
            name="description"
            className="md:col-span-2"
            rows={2}
            placeholder="项目描述"
          />
          <Input
            name="coverUrl"
            className="md:col-span-2"
            placeholder="封面图片链接"
          />
          <Input
            name="linkUrl"
            className="md:col-span-2"
            placeholder="项目链接"
          />
          <div className="md:col-span-2">
            <Button type="submit">新增项目</Button>
          </div>
        </form>
        <div className="mt-6 space-y-4">
          {projects.length === 0 && (
            <p className="text-sm text-white/60">暂无项目，使用上方表单新增。</p>
          )}
          {projects.map((project) => {
            const deleteAction = deleteProject.bind(null, project.id);
            return (
              <div key={project.id} className="rounded-2xl border border-white/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/70">
                  <p>{project.title}</p>
                  <form action={deleteAction}>
                    <Button type="submit" variant="outline" className="text-xs">
                      删除
                    </Button>
                  </form>
                </div>
                <form action={saveProject} className="mt-4 grid gap-3 md:grid-cols-2">
                  <input type="hidden" name="id" value={project.id} />
                  <Input name="title" defaultValue={project.title} />
                  <Input name="orderIndex" type="number" defaultValue={project.orderIndex} />
                  <Textarea
                    name="description"
                    className="md:col-span-2"
                    rows={2}
                    defaultValue={project.description ?? ""}
                  />
                  <Input
                    name="coverUrl"
                    className="md:col-span-2"
                    placeholder="封面图片链接"
                    defaultValue={project.coverUrl ?? ""}
                  />
                  <Input
                    name="linkUrl"
                    className="md:col-span-2"
                    placeholder="项目链接"
                    defaultValue={project.linkUrl ?? ""}
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
    </div>
  );
}
