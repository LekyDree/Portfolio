import { useEffect } from "react";
import "../styles/Home.css";
import GlitchButton from "../components/GlitchButton";

function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="homepage">
      <h1 className="title-bottom">Kyle Reed's Digital Zoo</h1>
      <div className="button-container">
        <GlitchButton
          initialText="Explore The Zoo"
          alternateText="Projects"
          location={"/projects"}
        />
        <GlitchButton
          initialText="Meet The Founder"
          alternateText="About Me"
          location={"/about"}
        />
        <GlitchButton
          initialText="Book a Ticket"
          alternateText="Contact"
          location={"/contact"}
        />
      </div>
    </div>
  );
}

export default Home;
