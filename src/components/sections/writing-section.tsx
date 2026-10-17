import { ArrowUpRight } from "lucide-react";
import { articles } from "@/data/writing";
import { DevtoIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/layout/container";
import { Section, SectionHeading } from "@/components/ui/section";

export function WritingSection() {
  return (
    <Container>
      <Section id="writing" labelledBy="writing-title">
        <SectionHeading
          id="writing-title"
          prompt="$ cat ~/articles"
          title="Writing"
          description="I write technical articles to make concepts clearer — for readers and for myself."
        />

        <div className="mt-10 grid gap-5">
          {articles.map((article) => (
            <article
              key={article.href}
              className="border-border bg-surface hover:border-accent/40 group rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8"
            >
              <div className="text-muted flex items-center gap-2 font-mono text-xs">
                <DevtoIcon className="text-accent h-4 w-4" />
                {article.source} · {article.date}
              </div>
              <h3 className="text-fg mt-3 text-xl font-semibold tracking-tight">
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-visible:outline-focus inline-flex items-center gap-1.5"
                >
                  {article.title}
                  <ArrowUpRight
                    className="text-muted group-hover:text-accent h-4 w-4 transition-colors"
                    aria-hidden="true"
                  />
                </a>
              </h3>
              <p className="text-muted mt-2 max-w-2xl text-sm text-pretty">
                {article.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-border bg-surface-2 text-muted rounded-md border px-2.5 py-1 font-mono text-[11px]"
                  >
                    #{tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
    </Container>
  );
}
