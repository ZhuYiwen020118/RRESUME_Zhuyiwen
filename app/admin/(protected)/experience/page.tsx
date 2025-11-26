import { prisma } from "@/lib/prisma";
import { FormCard } from "@/components/admin/form-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { saveExperience, deleteExperience } from "@/app/admin/actions";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ featured: "desc" }, { startDate: "desc" }]
  });

  return (
    <div className="space-y-10">
      <FormCard
        title="新增 / 更新经历"
        description="支持设置标签、关键成果、是否首页精选。"
      >
        <form action={saveExperience} className="grid gap-4 md:grid-cols-2">
          <Input name="organization" placeholder="公司 / 机构名称 *" required />
          <Input name="role" placeholder="职位 *" required />
          <Input name="city" placeholder="城市" />
          <Input name="domainTags" placeholder="标签，逗号分隔" />
          <Input name="startDate" type="date" placeholder="开始时间" />
          <Input name="endDate" type="date" placeholder="结束时间" />
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" name="featured" className="h-4 w-4" /> 首页精选
          </label>
          <div />
          <Textarea
            name="summary"
            className="md:col-span-2"
            placeholder="职责 / 经验摘要"
            rows={3}
          />
          <Textarea
            name="achievements"
            className="md:col-span-2"
            placeholder="关键成果（逗号分隔）"
            rows={3}
          />
          <Textarea
            name="metrics"
            className="md:col-span-2"
            placeholder='自定义 JSON 指标，如 {"阅读量":"2.1 亿"}'
            rows={3}
          />
          <div className="md:col-span-2">
            <Button type="submit">保存经历</Button>
          </div>
        </form>
      </FormCard>

      <div className="space-y-6">
        {experiences.length === 0 && (
          <p className="text-sm text-white/60">暂无经历，使用上方表单创建第一条。</p>
        )}
        {experiences.map((exp) => {
            const deleteAction = deleteExperience.bind(null, exp.id);
            return (
              <FormCard
                key={exp.id}
                title={`${exp.role} · ${exp.organization}`}
                description="编辑后提交以更新，或删除该经历。"
                aside={
                  <form action={deleteAction}>
                    <Button type="submit" variant="outline">
                      删除
                    </Button>
                  </form>
                }
              >
                <form action={saveExperience} className="grid gap-4 md:grid-cols-2">
                  <input type="hidden" name="id" value={exp.id} />
                  <Input name="organization" defaultValue={exp.organization} />
                  <Input name="role" defaultValue={exp.role} />
                  <Input name="city" defaultValue={exp.city ?? ""} />
                  <Input name="domainTags" defaultValue={exp.domainTags.join(", ")} />
                  <Input
                    name="startDate"
                    type="date"
                    defaultValue={exp.startDate?.toISOString().slice(0, 10)}
                  />
                  <Input
                    name="endDate"
                    type="date"
                    defaultValue={exp.endDate?.toISOString().slice(0, 10)}
                  />
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <input
                      type="checkbox"
                      name="featured"
                      className="h-4 w-4"
                      defaultChecked={exp.featured}
                    />
                    首页精选
                  </label>
                  <div />
                  <Textarea
                    name="summary"
                    className="md:col-span-2"
                    defaultValue={exp.summary ?? ""}
                  />
                  <Textarea
                    name="achievements"
                    className="md:col-span-2"
                    defaultValue={exp.achievements.join(", ")}
                  />
                  <Textarea
                    name="metrics"
                    className="md:col-span-2"
                    defaultValue={exp.metrics ? JSON.stringify(exp.metrics) : ""}
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

