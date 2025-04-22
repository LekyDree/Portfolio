import { useEffect, useState, useMemo } from "react";
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
    { icon: "concessions.png", label: "Concessions" },
    { icon: "information.png", label: "Information" },
    { icon: "gifts.png", label: "Gifts" },
    { icon: "water.png", label: "Water Fountain" },
    { icon: "wheelchair.png", label: "Wheelchair and Stroller Rentals" },
    { icon: "picnic.png", label: "Picnic Area" },
    { icon: "aed.png", label: "AED" },
    { icon: "nursing.png", label: "Nursing" },
    { icon: "carousel.png", label: "Carousel" },
    { icon: "first-aid.png", label: "First Aid" },
  ];

  const projectEntries = [
    {
      name: "PPST Online",
      summary:
        "An online platform for administering and analyzing PPST tests securely.",
      isProject: true,
    },
    {
      name: "RunSignup Photo App",
      summary: "A mobile app to manage and upload photos for race events.",
      isProject: true,
    },
    {
      name: "Extensions",
      summary: "Browser extensions I've created.",
      isProject: true,
    },
  ];

  const orderedItems = useMemo(() => {
    const baseItems = [...staticItems];
    const shuffledProjects = [...projectEntries].sort(() => Math.random());

    shuffledProjects.forEach((project) => {
      const insertIndex = Math.floor(Math.random() * (baseItems.length + 1));
      baseItems.splice(insertIndex, 0, project);
    });

    return baseItems;
  }, []);

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
                onClick={() => openPopup(item)}
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
            <h2>{activeProject.name}</h2>
            <p>{activeProject.summary}</p>
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
