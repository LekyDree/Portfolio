import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";

function About() {
  useEffect(() => {
    document.title = "About Me";
  }, []);

  const [clicked, setClicked] = useState(false);

  return (
    <div className="about-page">
      <Header />

      <div
        className={`cube-container ${clicked ? "clicked" : ""}`}
        style={
          clicked
            ? {
                transform: `translate(-50%, -42%) scale(${
                  window.innerWidth > 650
                    ? (window.innerHeight * 0.8) / 350
                    : window.innerWidth / 250
                })`,
              }
            : {}
        }
        onClick={() => setClicked(!clicked)}
      >
        <div className={`cube ${clicked ? "clicked" : ""}`}>
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face left"></div>
          <div className="face right"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>

          <div class="face inset inset-top"></div>
          <div class="face inset inset-bottom"></div>
          <div class="face inset inset-left"></div>
          <div class="face inset inset-right"></div>
          <div class="face inset inset-back"></div>

          <div class="face frame-top"></div>
          <div class="face frame-bottom"></div>
          <div class="face frame-left"></div>
          <div class="face frame-right"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
