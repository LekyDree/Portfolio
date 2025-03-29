import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="homepage">
      <h1 className="title-top">Explore Exotic Wonders in</h1>
      <h1 className="title-bottom">Kyle Reed's Digital Jungle</h1>
      <div className="button-container">
        <Link to="/projects" className="button">
          Explore
        </Link>
        <Link to="/about" className="button">
          Meet The Founder
        </Link>
        <Link to="/contact" className="button">
          Book a Ticket
        </Link>
      </div>
    </div>
  );
}

export default Home;
