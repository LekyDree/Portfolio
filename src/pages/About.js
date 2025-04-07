import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignModel from "../components/SignModel";
import "../styles/About.css";

function About() {
  useEffect(() => {
    document.title = "About Me";
  }, []);

  return (
    <div className="about-page">
      <Header />
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[9, 6, 7]} />
        <SignModel />
      </Canvas>
      <Footer />
    </div>
  );
}

export default About;
