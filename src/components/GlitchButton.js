import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/GlitchButton.css";

const GlitchButton = ({ initialText, alternateText, location }) => {
  const [text, setText] = useState(initialText);
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentText, setCurrentText] = useState(alternateText);
  const [initialWait, setInitialWait] = useState(true);

  const getRandomTranslate = () => {
    if (isGlitching) {
      const x = Math.floor(Math.random() * 14) - 7;
      const y = Math.floor(Math.random() * 14) - 7;
      return `translate(${x}px, ${y}px)`;
    }
    return `translate(0px, 0px)`;
  };

  const generateGlitchText = useCallback(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?";
    return Array.from({ length: text.length }, (_, index) => {
      if (text[index] === " ") {
        return " ";
      }
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
  }, [text]);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);

      let glitchCount = 0;
      const glitchInterval = setInterval(() => {
        setText(generateGlitchText());
        glitchCount++;
        if (glitchCount >= 6) {
          clearInterval(glitchInterval);
          setCurrentText((prev) =>
            prev === initialText ? alternateText : initialText
          );
          setText(currentText);
          setIsGlitching(false);
          setInitialWait(false);
        }
      }, 60);
    };

    const timeout = setTimeout(
      triggerGlitch,
      initialWait === true ? 5000 : 10000
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    initialText,
    alternateText,
    initialWait,
    generateGlitchText,
  ]);

  return (
    <Link
      to={location}
      className={`glitch-button ${isGlitching ? "glitching" : ""}`}
    >
      <span data-text={text} style={{ transform: getRandomTranslate() }}>
        {text}
      </span>
    </Link>
  );
};

export default GlitchButton;
