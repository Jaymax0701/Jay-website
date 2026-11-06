interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  number?: string;
}

export default function SectionHeading({ eyebrow, title, description, number }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{number ? `${number} / ` : ""}{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  );
}
