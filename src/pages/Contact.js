import { useEffect } from "react";
import "../styles/Contact.css";

function Contact() {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  return (
    <div>
      <span class="glitch-text" data-text="Glitch Effect">
        Glitch Effect
      </span>
    </div>
  );
}

export default Contact;
