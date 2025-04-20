import { useEffect, useState } from "react";
import "../styles/Projects.css";

function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    document.title = "Projects";
  }, []);

  const openPopup = (project) => setActiveProject(project);
  const closePopup = () => setActiveProject(null);

  const staticItems = [
    { icon: "restrooms.png", label: "Restrooms" },
    { icon: "gifts.png", label: "Gifts" },
    { icon: "wheelchair.png", label: "Wheelchair and Stroller Rentals" },
    { icon: "first-aid.png", label: "First Aid" },
    { icon: "water.png", label: "Water Fountain" },
    { icon: "carousel.png", label: "Carousel" },
    { icon: "information.png", label: "Information" },
    { icon: "picnic.png", label: "Picnic Area" },
    { icon: "aed.png", label: "AED" },
    { icon: "nursing.png", label: "Nursing" },
    { icon: "concessions.png", label: "Concessions" },
  ];

  const projectEntries = [
    { name: "PPST Online", isProject: true },
    { name: "RunSignup Photo App", isProject: true },
    { name: "Extensions", isProject: true },
  ];

  const orderedItems = [...staticItems];

  const shuffledProjects = [...projectEntries].sort(() => Math.random() - 0.5);

  shuffledProjects.forEach((project) => {
    const insertIndex = Math.floor(Math.random() * (orderedItems.length + 1));
    orderedItems.splice(insertIndex, 0, project);
  });

  return (
    <div className="projects-page">
      <div className="map-key">
        <h3 className="map-key-title">MAP KEY</h3>
        <div className="key-grid">
          {orderedItems.map((item, index) =>
            item.isProject ? (
              <div
                key={index}
                className="project-key"
                onClick={() => openPopup(item.name)}
              >
                {item.name}
              </div>
            ) : (
              <KeyItem key={index} icon={item.icon} label={item.label} />
            )
          )}
        </div>
      </div>

      {activeProject && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>
              ✕
            </button>
            <h2>{activeProject}</h2>
            <p>This is a short description of the {activeProject} project.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function KeyItem({ icon, label }) {
  return (
    <div className="key-item">
      <img src={`/icons/${icon}`} alt={label} />
      <span>{label}</span>
    </div>
  );
}

export default Projects;
