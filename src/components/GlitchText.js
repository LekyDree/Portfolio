import React, { useState, useEffect, useCallback } from "react";
import "../styles/GlitchText.css";

const GlitchText = ({
  initialText,
  alternateText,
  dist,
  time,
  initialTime,
  glitchTime,
}) => {
  const [text, setText] = useState(initialText);
  const [isGlitching, setIsGlitching] = useState(false);
  const [nextText, setNextText] = useState(alternateText);
  const [initialWait, setInitialWait] = useState(true);

  const getRandomTranslate = () => {
    if (!dist) {
      dist = 12;
    }
    if (isGlitching) {
      const x = Math.floor(Math.random() * dist * 2) - dist;
      const y = Math.floor(Math.random() * dist * 2) - dist;
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
      setText(generateGlitchText());
      const glitchInterval = setInterval(() => {
        setText(generateGlitchText());
        glitchCount++;
        if (glitchCount >= Math.floor((glitchTime ?? 360) / 60)) {
          clearInterval(glitchInterval);
          setText(nextText);
          setNextText((prev) =>
            prev === initialText ? alternateText : initialText
          );
          setIsGlitching(false);
          setInitialWait(false);
        }
      }, 60);
    };

    const timeout = setTimeout(
      triggerGlitch,
      initialWait === true ? initialTime ?? time ?? 5000 : time ?? 5000
    );

    return () => clearTimeout(timeout);
  }, [
    nextText,
    initialText,
    alternateText,
    initialWait,
    generateGlitchText,
    glitchTime,
    time,
    initialTime,
  ]);

  return (
    <span
      className={`${isGlitching ? "glitching" : ""}`}
      data-text={text}
      style={{ transform: getRandomTranslate() }}
    >
      {text}
    </span>
  );
};

export default GlitchText;
