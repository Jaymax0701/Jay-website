import { ArrowUpRight, Github } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-index">FEATURED PROJECT</span>
        <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`}>
          <ArrowUpRight size={19} />
        </a>
      </div>
      <div className="project-symbol"><Github size={25} /></div>
      <p className="eyebrow">{project.category}</p>
      <h3>{project.name}</h3>
      <p className="card-copy">{project.description}</p>
      <div className="tag-list">
        {project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}
      </div>
      <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">
        View repository <ArrowUpRight size={15} />
      </a>
    </article>
  );
}
