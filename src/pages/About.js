import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";

function About() {
  useEffect(() => {
    document.title = "About Me";
  }, []);

  const signRef = useRef(null);

  const signWidth = 500;
  const signHeight = 700;

  useEffect(() => {
    if (signRef.current) {
      signRef.current.style.setProperty("--sign-width", `${signWidth}px`);
      signRef.current.style.setProperty("--sign-height", `${signHeight}px`);
      signRef.current.style.setProperty("--sign-depth", "100px");
      signRef.current.style.setProperty("--inset-offset", "20px");
      signRef.current.style.setProperty("--inset-depth", "20px");
    }
  }, []);

  const [clicked, setClicked] = useState(false);

  const images = [
    "/me3.png",
    "/me2.png",
    // add more paths here
  ];

  const [currentImageIndex] = useState(0);
  /*
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  function cycleImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }*/

  return (
    <div className="about-page">
      <Header />

      <div
        className="image-box"
        //onClick={cycleImage}
        style={{
          transform: `scale(${Math.min(
            0.5 + ((0.8 - 0.5) * window.innerWidth) / 1000,
            1
          )})`,
        }}
      >
        <img
          src={images[currentImageIndex]}
          alt="Me"
          className="cycling-image"
        />
        <div className="image-overlay">
          ERROR: Image Not Found
          <br />
          (Waiting on a haircut)
        </div>
      </div>

      <div
        className={`sign-container ${clicked ? "clicked" : ""}`}
        style={
          clicked
            ? {
                transform: `translate(-50%, -47%) scale(${
                  window.innerWidth >= 540
                    ? (window.innerHeight * 0.77) / signHeight
                    : (window.innerWidth * 0.93) / signWidth
                })`,
              }
            : {
                transform: `translate(-55%, -20%) scale(${Math.min(
                  window.innerWidth / 1400,
                  0.5
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
                invested that same effort into my academics and projects to hone
                my expertise.
                <br />
                <br />
                Through my work, I’ve gained a strong foundation in designing
                user-focused applications, collaborating on complex systems, and
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
