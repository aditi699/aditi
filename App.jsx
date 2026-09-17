import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [github, setGithub] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // Get GitHub profile
    fetch("https://api.github.com/users/aditi699")
      .then((response) => response.json())
      .then((data) => {
        setGithub(data);
      })
      .catch((error) => {
        console.error("GitHub Error:", error);
      });

    // Get GitHub repositories
    fetch("https://api.github.com/users/aditi699/repos")
      .then((response) => response.json())
      .then((data) => {
        setRepositories(data);
      })
      .catch((error) => {
        console.error("Repository Error:", error);
      });
  }, []);

  return (
    <div>

      {/* Navigation */}
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#github">GitHub</a>
        <a href="#contact">Contact</a>
      </nav>


      {/* Home */}
      <section id="home">
        <h1>Hi, I'm Aditi</h1>

        <h2>Cybersecurity Student</h2>

        <p>
          Welcome to my personal portfolio dashboard.
        </p>
      </section>


      {/* About */}
      <section id="about">
        <h2>About Me</h2>

        <p>
          I am a cybersecurity student interested in
          cybersecurity, AI and technology.
        </p>
      </section>


      {/* Skills */}
      <section id="skills">
        <h2>My Skills</h2>

        <p>
          Cybersecurity | Python | Linux | Networking | GitHub
        </p>
      </section>


      {/* Projects */}
      <section id="projects">
        <h2>My Projects</h2>

        <div className="projects">

          <div className="project-card">
            <h3>Smart Campus Assistant</h3>

            <p>
              AI-powered campus assistant using RAG.
            </p>
          </div>

          <div className="project-card">
            <h3>NutriVLM</h3>

            <p>
              AI-based system for food and dietary analysis.
            </p>
          </div>

          <div className="project-card">
            <h3>Real-Time Chat Application</h3>

            <p>
              A real-time messaging application.
            </p>
          </div>

        </div>
      </section>


      {/* GitHub Dashboard */}
      <section id="github">

        <h2>GitHub Dashboard</h2>

        <div className="github-stats">

          <div className="github-card">
            <h3>Username</h3>

            <p>
              {github ? github.login : "Loading..."}
            </p>
          </div>


          <div className="github-card">
            <h3>Repositories</h3>

            <p>
              {github ? github.public_repos : "Loading..."}
            </p>
          </div>


          <div className="github-card">
            <h3>Followers</h3>

            <p>
              {github ? github.followers : "Loading..."}
            </p>
          </div>


          <div className="github-card">
            <h3>Following</h3>

            <p>
              {github ? github.following : "Loading..."}
            </p>
          </div>

        </div>


        {/* GitHub Profile Button */}
        {github && (
          <a
            href={github.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <button>
              View My GitHub Profile
            </button>
          </a>
        )}


        {/* Repositories */}
        <h2>My GitHub Repositories</h2>

        <div className="projects">

          {repositories.length === 0 ? (
            <p>Loading repositories...</p>
          ) : (

            repositories.map((repo) => (

              <div
                className="project-card"
                key={repo.id}
              >

                <h3>
                  {repo.name}
                </h3>

                <p>
                  {repo.description ||
                    "No description available."}
                </p>

                <p>
                  ⭐ Stars: {repo.stargazers_count}
                </p>

                <p>
                  🍴 Forks: {repo.forks_count}
                </p>

                <p>
                  💻 Language: {repo.language || "Not detected"}
                </p>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>
                    View Repository
                  </button>
                </a>

              </div>

            ))

          )}

        </div>


        {/* GitHub Languages */}
        <h2>GitHub Languages</h2>

        <div className="github-stats">

          {repositories.filter((repo) => repo.language).length === 0 ? (

            <p>No programming language detected yet.</p>

          ) : (

            repositories
              .filter((repo) => repo.language)
              .map((repo) => (

                <div
                  className="github-card"
                  key={repo.id}
                >

                  <h3>
                    {repo.language}
                  </h3>

                  <p>
                    Used in: {repo.name}
                  </p>

                </div>

              ))

          )}

        </div>

      </section>


      {/* Contact */}
      <section id="contact">

        <h2>Contact</h2>

        <p>
          GitHub | LinkedIn | Email
        </p>

      </section>

    </div>
  );
}

export default App;