import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";

import { Suspense } from "react";

function About() {
  useEffect(() => {
    document.title = "About Me";
  }, []);

  return (
    <div className="about-page">
      <Header />
      <Suspense fallback={null}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[9, 6, 7]} />
        </Canvas>
      </Suspense>
      <Footer />
    </div>
  );
}

export default About;
