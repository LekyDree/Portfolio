import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`header ${menuOpen ? "header-open" : ""}`}>
      <Link to="/" className="home-text-container">
        <h1 className="home-text">LEKY DREE</h1>
        <h1 className="home-text">DIGITAL ZOO</h1>
      </Link>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/projects" className="links-text">
          Explore The Zoo
        </Link>
        <Link to="/about" className="links-text">
          About Us
        </Link>
        <Link to="/contact" className="links-text">
          Buy a Ticket
        </Link>
        <Link to="/" className="links-text">
          Minigames
        </Link>
      </div>

      {!menuOpen ? (
        <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
      ) : (
        <FaTimes className="menu-icon" onClick={() => setMenuOpen(false)} />
      )}
    </div>
  );
};

export default Header;
