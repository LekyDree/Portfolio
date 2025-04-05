import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";

function About() {
  useEffect(() => {
    document.title = "About Me";
  }, []);

  return (
    <div className="about-page">
      <Header />

      <Footer />
    </div>
  );
}

export default About;
