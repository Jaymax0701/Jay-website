export default function SectionHeading({ eyebrow, title, description, number }) {
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
