import { useEffect } from "react";

function Projects() {
  useEffect(() => {
    document.title = "Projects";
  }, []);

  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
}

export default Projects;
