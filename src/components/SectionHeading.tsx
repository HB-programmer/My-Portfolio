type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow mono">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}
