import { useEffect } from "react";

function About() {
  useEffect(() => {
    document.title = "About Me";
  }, []);

  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

export default About;
