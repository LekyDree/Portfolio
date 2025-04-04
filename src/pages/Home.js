import { useEffect, useState } from "react";
import "../styles/Home.css";
import GlitchText from "../components/GlitchText";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const [pageSwapped, setPageSwapped] = useState(false);

  useEffect(() => {
    document.title = "Home";
  }, []);

  const changeBackground = () => {
    setPageSwapped(true);
  };

  return (
    <div>
      {!pageSwapped && (
        <div>
          <Header />
          <button className="bg-toggle" onClick={changeBackground}></button>
          <Footer />
        </div>
      )}
      <div className={`homepage ${pageSwapped ? "bg-active" : ""}`}>
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
            <GlitchText
              initialText="Explore Exhibits"
              alternateText="Projects"
            />
          </Link>
          <Link className="button" to="/about">
            <GlitchText
              initialText="Meet Our Founder"
              alternateText="About Me"
            />
          </Link>
          <Link className="button" to="/contact">
            <GlitchText initialText="Buy a Ticket" alternateText="Contact" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
