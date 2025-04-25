import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";

function About() {
  useEffect(() => {
    document.title = "About Me";
  }, []);

  const signRef = useRef(null);

  const signWidth = 250;
  const signHeight = 350;

  useEffect(() => {
    if (signRef.current) {
      signRef.current.style.setProperty("--sign-width", `${signWidth}px`);
      signRef.current.style.setProperty("--sign-height", `${signHeight}px`);
      signRef.current.style.setProperty("--sign-depth", "50px");
      signRef.current.style.setProperty("--inset-offset", "10px");
      signRef.current.style.setProperty("--inset-depth", "10px");
    }
  }, []);

  const [clicked, setClicked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/me1.png",
    "/me2.png",
    // add more paths here
  ];

  function cycleImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  return (
    <div className="about-page">
      <Header />

      <div
        className="image-box"
        onClick={cycleImage}
        style={{
          height: `${Math.min(
            50 + ((80 - 50) * window.innerWidth) / 1000,
            80
          )}%`,
        }}
      >
        <img
          src={images[currentImageIndex]}
          alt="Me"
          className="cycling-image"
        />
      </div>

      <div
        className={`sign-container ${clicked ? "clicked" : ""}`}
        style={
          clicked
            ? {
                transform: `translate(-50%, -42%) scale(${
                  window.innerWidth > 510
                    ? (window.innerHeight * 0.8) / signHeight
                    : window.innerWidth / signWidth
                })`,
              }
            : {
                transform: `translate(-55%, 10%) scale(${Math.min(
                  window.innerWidth / 700,
                  1
                )})`,
              }
        }
        onClick={() => setClicked(!clicked)}
        ref={signRef}
      >
        <div className={`sign ${clicked ? "clicked" : ""}`}>
          <div className="face back"></div>
          <div className="face left"></div>
          <div className="face right"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>

          <div className="face inset inset-top"></div>
          <div className="face inset inset-bottom"></div>
          <div className="face inset inset-left"></div>
          <div className="face inset inset-right"></div>
          <div className="face inset inset-back">
            <div className="sign-content">
              <div className="sign-title">About</div>
              <div className={`sign-body ${clicked ? "clicked" : ""}`}>
                Hi, my name is Kyle Reed. I'm a recent graduate with a BS in
                Computer Science and concentration in Software Engineering. Over
                the past several years, I’ve built a variety of software
                projects, including full-stack websites, a mobile app, and
                numerous Java-based applications. While I haven’t yet had
                professional experience through internships or jobs, I’ve
                invested that same effort and my academics and projects to hone
                my expertise.
                <br />
                <br />
                Through my work, I’ve gained a strong foundation in designing
                user-focused solutions, collaborating on complex systems, and
                adapting to new tools and frameworks as needed. Whether it was
                developing a mobile app for my software engineering course or
                building interactive features for my portfolio website, I enjoy
                the process of breaking down abstract problems into practical,
                working code.
                <br />
                <br />
                I’m open to opportunities where I can continue to grow,
                contribute meaningfully to real-world software, and sharpen my
                abilities as a developer. Outside of tech, I spend my time
                watching animated shows, playing games, and studying Japanese.
              </div>
            </div>
          </div>

          <div className="face frame-top"></div>
          <div className="face frame-bottom"></div>
          <div className="face frame-left"></div>
          <div className="face frame-right"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
