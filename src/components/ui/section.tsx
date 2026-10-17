export function Section({
  id,
  labelledBy,
  className = "",
  children,
}: {
  id: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-20 py-8 sm:py-10 lg:py-12 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  id,
  prompt,
  title,
  description,
  className = "",
}: {
  id: string;
  prompt: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="font-mono text-accent text-xs sm:text-sm">{prompt}</p>
      <h2
        id={id}
        className="text-fg mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-muted mt-3 text-pretty">{description}</p>
      ) : null}
    </div>
  );
}
