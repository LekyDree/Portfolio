import { useEffect } from "react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiMyanimelist } from "react-icons/si";
import "../styles/Contact.css";
import Header from "../components/Header";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  return (
    <div className="contact-page">
      <div className="zoo-container">
        <Header />
      </div>
      <div className="background-image"></div>
      <div className="contact-container">
        <h2 className="contact-title">Contact Me</h2>
        <div className="contact-list">
          <a
            href="mailto:kreed091803@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaEnvelope className="contact-icon" /> kreed091803@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/kyle-reed-361921266/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaLinkedin className="contact-icon" /> Linkedin
          </a>
          <a
            href="https://github.com/LekyDree"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaGithub className="contact-icon" /> GitHub
          </a>
          <a
            href="https://myanimelist.net/profile/Leky_Dree"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <SiMyanimelist className="contact-icon" /> MyAnimeList
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
