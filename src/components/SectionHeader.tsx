interface SectionHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <p
        className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300"
      >
        {title}
      </p>
      {subtitle && (
        <h2
          className="text-balance text-4xl font-black leading-tight text-stone-950 dark:text-white"
        >
          {subtitle}
        </h2>
      )}
      {description && (
        <div className="mt-6">
          {description}
        </div>
      )}
    </div>
  );
}