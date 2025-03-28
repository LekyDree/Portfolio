import { Link } from "react-router-dom";
import { useEffect } from "react";

function NotFound() {
  useEffect(() => {
    document.title = "404";
  }, []);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

export default NotFound;
