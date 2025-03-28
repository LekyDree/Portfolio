import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
}

export default Contact;
