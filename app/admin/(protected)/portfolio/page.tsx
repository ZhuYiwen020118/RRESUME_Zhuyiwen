import { prisma } from "@/lib/prisma";
import { FormCard } from "@/components/admin/form-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { savePortfolio, deletePortfolio } from "@/app/admin/actions";

const kindOptions = [
  { value: "PRESENTATION", label: "方案 / PPT" },
  { value: "ARTICLE", label: "新闻 / 文章" },
  { value: "VIDEO", label: "视频 / 活动" },
  { value: "DATA_REPORT", label: "数据报告" },
  { value: "OTHER", label: "其他" }
];

export default async function AdminPortfolioPage() {
  const items = await prisma.portfolioItem.findMany({
    orderBy: { priority: "desc" }
  });

  return (
    <div className="space-y-10">
      <FormCard
        title="新增作品"
        description="填写作品元数据，可链接到 PPT、新闻稿或视频等外部页面。"
      >
        <form action={savePortfolio} className="grid gap-4 md:grid-cols-2">
          <Input name="title" placeholder="作品标题 *" required />
          <Select name="kind" defaultValue="PRESENTATION">
            {kindOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Input name="coverUrl" placeholder="封面图链接（可选）" />
          <Input name="linkUrl" placeholder="播放/查看链接（可填 /media/video.mp4） *" required />
          <Input name="downloadUrl" placeholder="下载链接（可选，可填 /media/...）" />
          <Input name="priority" type="number" placeholder="优先级，越大越靠前" />
          <Textarea name="description" className="md:col-span-2" placeholder="简介" rows={3} />
          <Input
            name="tags"
            className="md:col-span-2"
            placeholder="标签，逗号分隔"
          />
          <div className="md:col-span-2">
            <Button type="submit">保存作品</Button>
          </div>
        </form>
      </FormCard>

      <div className="space-y-6">
        {items.length === 0 && (
          <p className="text-sm text-white/60">暂无作品，先通过上方表单添加。</p>
        )}
        {items.map((item) => {
          const deleteAction = deletePortfolio.bind(null, item.id);
          return (
            <FormCard
              key={item.id}
              title={item.title}
              description={item.description ?? "无简介"}
              aside={
                <form action={deleteAction}>
                  <Button type="submit" variant="outline">
                    删除
                  </Button>
                </form>
              }
            >
              <form action={savePortfolio} className="grid gap-4 md:grid-cols-2">
                <input type="hidden" name="id" value={item.id} />
                <Input name="title" defaultValue={item.title} />
                <Select name="kind" defaultValue={item.kind}>
                  {kindOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <Input name="coverUrl" defaultValue={item.coverUrl ?? ""} />
                <Input name="linkUrl" defaultValue={item.linkUrl} />
                <Input name="downloadUrl" defaultValue={item.downloadUrl ?? ""} />
                <Input name="priority" type="number" defaultValue={item.priority} />
                <Textarea
                  name="description"
                  className="md:col-span-2"
                  defaultValue={item.description ?? ""}
                />
                <Input
                  name="tags"
                  className="md:col-span-2"
                  defaultValue={item.tags.join(", ")}
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

