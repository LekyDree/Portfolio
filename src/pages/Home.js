import { useEffect, useState } from "react";
import "../styles/Home.css";
import GlitchText from "../components/GlitchText";
import { Link } from "react-router-dom";
import bg1 from "../images/bg1.jpg";
import bg2 from "../images/bg2.jpg";

function Home() {
  const [bg, setBg] = useState(`url(${bg1})`);
  const [showToggle, setShowToggle] = useState(true);

  useEffect(() => {
    document.title = "Home";
  }, []);

  const changeBackground = () => {
    console.log("Pressed");
    setBg(`url(${bg2})`);
    setShowToggle(false);
  };

  return (
    <div className="homepage" style={{ backgroundImage: bg }}>
      <h1 className="title-top">Welcome to</h1>
      <h1 className="title-bottom">
        <GlitchText
          initialText="The Digital Zoo"
          alternateText="My Portfolio"
          dist={40}
        />
      </h1>
      <div className="button-container">
        <Link className="button" to="/projects">
          <GlitchText initialText="Explore Exhibits" alternateText="Projects" />
        </Link>
        <Link className="button" to="/about">
          <GlitchText initialText="Meet Our Founder" alternateText="About Me" />
        </Link>
        <Link className="button" to="/contact">
          <GlitchText initialText="Book a Ticket" alternateText="Contact" />
        </Link>
      </div>
      {showToggle && (
        <button className="bg-toggle" onClick={changeBackground}></button>
      )}
    </div>
  );
}

export default Home;
