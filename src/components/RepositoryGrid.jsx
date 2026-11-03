import { useEffect, useState } from "react";
import { ArrowUpRight, GitFork, Star } from "lucide-react";

const username = "Jaymax0701";

export default function RepositoryGrid() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub API unavailable");
        return response.json();
      })
      .then((data) => {
        const visible = data
          .filter((repo) => !repo.fork && !repo.archived)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6);
        setRepos(visible);
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, []);

  if (status === "loading") return <p className="muted-note">Loading public repositories…</p>;
  if (status === "error") {
    return <p className="muted-note">Repositories could not be loaded right now. Visit <a href="https://github.com/Jaymax0701">GitHub</a> to explore the projects.</p>;
  }
  if (!repos.length) return <p className="muted-note">No public repositories to display yet.</p>;

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <a className="repo-card" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
          <div className="repo-card-head">
            <span className="repo-language"><i style={{ background: repo.language ? "#B8C7A5" : "#66736B" }} />{repo.language || "Project"}</span>
            <ArrowUpRight size={17} />
          </div>
          <h3>{repo.name.replaceAll("-", " ")}</h3>
          <p>{repo.description || "A public project from GitHub."}</p>
          <div className="repo-meta">
            <span><Star size={14} /> {repo.stargazers_count}</span>
            <span><GitFork size={14} /> {repo.forks_count}</span>
            <span>Updated {new Date(repo.pushed_at).toLocaleDateString("en-MY", { month: "short", year: "numeric" })}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
