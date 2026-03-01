import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getHeroContent,
  getEducation,
  getExperiences,
  getPortfolioItems,
  getProjects,
  getContactContent
} from "@/lib/data";

export default async function HomePage() {
  const [hero, education, experiences, portfolio, projects, contact] = await Promise.all([
    getHeroContent(),
    getEducation(),
    getExperiences(),
    getPortfolioItems(),
    getProjects(),
    getContactContent()
  ]);

  const heroAvatar = hero.avatar ?? "/media/profile-placeholder.svg";

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-[300px] w-[300px] rounded-full bg-neon-400/8 blur-[100px]" />
          <div className="absolute -right-20 bottom-0 h-[200px] w-[200px] rounded-full bg-indigo-500/8 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
            {/* Left - Vivid Introduction */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {hero.vividIntro || `hello，我叫${hero.name}，毕业于香港浸会大学。`}
              </h1>
              <p className="mt-6 text-lg text-white/70 md:text-xl">
                {hero.intro}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                {hero.resumeUrl && (
                  <Button asChild>
                    <a href={hero.resumeUrl} download>
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      下载简历
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <Link href="/contact">联系我</Link>
                </Button>
              </div>
            </div>

            {/* Right - Large Photo */}
            <div className="relative w-full max-w-md md:w-[400px] lg:w-[450px]">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-neon-400/20 to-indigo-500/20 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={heroAvatar}
                  alt={hero.name}
                  width={450}
                  height={550}
                  className="h-[400px] w-full object-cover md:h-[500px] lg:h-[550px]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      {education.length > 0 && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 font-display text-2xl font-bold text-white">教育背景</h2>
            <div className="flex flex-wrap gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2"
                >
                  {edu.logoUrl && (
                    <Image
                      src={edu.logoUrl}
                      alt={edu.school}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded object-contain"
                    />
                  )}
                  <span className="text-sm text-white/80">{edu.school}</span>
                  <span className="text-xs text-white/40">{edu.degree}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Internship Timeline */}
      {experiences.length > 0 && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 font-display text-2xl font-bold text-white">实习经历</h2>
            <div className="relative border-l border-white/10 pl-8">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative mb-8 last:mb-0">
                  {/* Timeline dot */}
                  <div className="absolute -left-[33px] top-2 h-3 w-3 rounded-full bg-neon-400 ring-4 ring-white/5" />
                  
                  <div className="flex items-start gap-4">
                    {exp.logoUrl && (
                      <div className="flex-shrink-0">
                        <Image
                          src={exp.logoUrl}
                          alt={exp.organization}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{exp.organization}</h3>
                        <span className="text-xs text-white/40">
                          {exp.startDate ? new Date(exp.startDate).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short' }) : ''}
                          {exp.endDate ? ` - ${new Date(exp.endDate).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short' })}` : ' - 至今'}
                        </span>
                      </div>
                      <p className="text-sm text-neon-300">{exp.role}</p>
                      {exp.summary && (
                        <p className="mt-1 text-sm text-white/60">{exp.summary}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section */}
      {portfolio.length > 0 && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 font-display text-2xl font-bold text-white">作品集</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.slice(0, 6).map((item) => (
                <a
                  key={item.id}
                  href={item.linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10"
                >
                  {item.coverUrl && (
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={item.coverUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-neon-300">{item.title}</h3>
                    {item.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-white/50">{item.description}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 font-display text-2xl font-bold text-white">项目展示</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.linkUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10"
                >
                  {project.coverUrl && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={project.coverUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-neon-300">{project.title}</h3>
                    {project.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-white/50">{project.description}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-2xl font-bold text-white">联系我</h2>
          <p className="mt-2 text-white/60">期待与您的交流与合作</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {contact.email}
              </a>
            )}
            {contact.links.find(l => l.platform.toLowerCase().includes('linkedin') || l.platform.toLowerCase().includes('领英')) && (
              <a
                href={contact.links.find(l => l.platform.toLowerCase().includes('linkedin') || l.platform.toLowerCase().includes('领英'))?.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
