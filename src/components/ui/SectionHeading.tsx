interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-10 max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-nav text-3xl font-black tracking-tight text-navy-500 sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-3 text-lg text-gray-600">{description}</p> : null}
    </div>
  );
}
