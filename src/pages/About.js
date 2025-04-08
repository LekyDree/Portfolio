import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";

import { Suspense, lazy } from "react";
const SignModel = lazy(() => import("../components/SignModel"));

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
        <Suspense fallback={null}>
          <SignModel />
        </Suspense>
      </Canvas>
      <Footer />
    </div>
  );
}

export default About;
