import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [github, setGithub] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState({});
  const username = "aditi699";

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData = await userResponse.json();
        setGithub(userData);

        const repoResponse = await fetch(
          `https://api.github.com/users/${username}/repos`
        );
        const repoData = await repoResponse.json();
        setRepos(repoData);

        const languageCount = {};

        for (const repo of repoData) {
          if (repo.language) {
            languageCount[repo.language] =
              (languageCount[repo.language] || 0) + 1;
          }
        }

        setLanguages(languageCount);
      } catch (error) {
        console.error("GitHub API Error:", error);
      }
    }

    fetchGitHub();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Aditi's Portfolio</h1>
        <p>Cybersecurity Student | Developer</p>
      </header>

      <section className="projects">
        <h2>My Projects</h2>

        <div className="project-container">
          <div className="project-card">
            <h3>Smart Campus Assistant</h3>
            <p>AI-powered campus assistant using RAG.</p>
          </div>

          <div className="project-card">
            <h3>NutriVLM</h3>
            <p>AI-based system for food and dietary analysis.</p>
          </div>

          <div className="project-card">
            <h3>Real-Time Chat Application</h3>
            <p>A real-time messaging application.</p>
          </div>
        </div>
      </section>

      {github && (
        <section className="github">
          <h2>GitHub Dashboard</h2>

          <div className="stats">
            <div className="stat-card">
              <h3>Username</h3>
              <p>{github.login}</p>
            </div>

            <div className="stat-card">
              <h3>Repositories</h3>
              <p>{github.public_repos}</p>
            </div>

            <div className="stat-card">
              <h3>Followers</h3>
              <p>{github.followers}</p>
            </div>

            <div className="stat-card">
              <h3>Following</h3>
              <p>{github.following}</p>
            </div>
          </div>

          <a
            href={github.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <button>View My GitHub Profile</button>
          </a>

          <h2>My GitHub Repositories</h2>

          <div className="repo-container">
            {repos.map((repo) => (
              <div className="repo-card" key={repo.id}>
                <h3>{repo.name}</h3>
                <p>{repo.description || "No description available."}</p>
                <p>⭐ Stars: {repo.stargazers_count}</p>
                <p>🍴 Forks: {repo.forks_count}</p>
                <p>💻 Language: {repo.language || "Not detected"}</p>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>View Repository</button>
                </a>
              </div>
            ))}
          </div>

          <h2>GitHub Language Statistics</h2>

          <div className="language-container">
            {Object.keys(languages).length > 0 ? (
              Object.entries(languages).map(([language, count]) => (
                <div className="language-card" key={language}>
                  <h3>{language}</h3>
                  <p>{count} repository</p>
                </div>
              ))
            ) : (
              <p>No programming language detected yet.</p>
            )}
          </div>
        </section>
      )}

      <footer>
        <h2>Contact</h2>
        <p>GitHub | LinkedIn | Email</p>
      </footer>
    </div>
  );
}

export default App;
