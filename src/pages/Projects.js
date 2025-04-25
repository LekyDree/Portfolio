import { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Projects.css";

function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    document.title = "Projects";
  }, []);

  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(80);

  useEffect(() => {
    const updateSize = () => {
      const baseWidth = 1500;
      const midWidth = 1100;
      const thinWidth = 700;
      const mapHeight = 75;
      if (window.innerWidth > baseWidth) {
        setHeight(mapHeight);
        setScale(1);
      } else if (window.innerWidth <= thinWidth) {
        setHeight(((window.innerWidth + 200) / baseWidth) * mapHeight);
      } else if (window.innerWidth < midWidth) {
        setHeight((midWidth / baseWidth) * mapHeight);
        setScale(midWidth / baseWidth);
      } else {
        setHeight((window.innerWidth / baseWidth) * mapHeight);
      }

      if (window.innerWidth > baseWidth) {
        setScale(1);
      } else if (window.innerWidth < midWidth) {
        setScale(midWidth / baseWidth);
      } else {
        setScale(window.innerWidth / baseWidth);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const openPopup = (project) => setActiveProject(project);
  const closePopup = () => setActiveProject(null);

  const orderedItems = useMemo(() => {
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

    const baseItems = [...staticItems];
    const shuffledProjects = [...projectEntries].sort(() => Math.random());

    shuffledProjects.forEach((project) => {
      const insertIndex = Math.floor(Math.random() * (baseItems.length + 1));
      baseItems.splice(insertIndex, 0, project);
    });

    return baseItems;
  }, []);

  const zooAreas = {
    Farm: ["Chicken", "Cow", "Donkey", "Goat", "Pig", "Sheep"],
    Forest: [
      "Cougar",
      "Gray Wolf",
      "Great Horned Owl",
      "Grizzly Bear",
      "Lynx",
      "Moose",
      "Porcupine",
      "Red Fox",
      "+ Dozens More",
    ],
    Sahara: [
      "Antelope",
      "Camel",
      "Cheetah",
      "Elephant",
      "Fennec Fox",
      "Gazelle",
      "Giraffe",
      "Hyena",
      "Jackal",
      "Lion",
      "Ostrich",
      "Rhinoceros",
      "Vulture",
      "Warthog",
      "Zebra",
    ],
    Tundra: [
      "Arctic Hare",
      "Caribou",
      "Ermine",
      "Harbor Seal",
      "Penguins",
      "Walrus",
    ],
    Aquariam: [
      "Dolphins",
      "Eels",
      "Manta Ray",
      "Octopus",
      "Seahorses",
      "Sharks",
      "+100s More",
    ],
    Wetlands: [
      "Alligator",
      "Beaver",
      "Capybara",
      "Flamingo",
      "Hippopotamus",
      "Marsh Frogs",
      "Red-crowned Crane",
      "Sea Otter",
      "Snapping Turtle",
      "Wood Duck",
    ],
    Outback: ["Dingo", "Emu", "Kangaroo", "Kiwi", "Koala", "Platypus"],
    Desert: [
      "Bearded Dragon",
      "Camels",
      "Emperor Scorpion",
      "Horned Lizard",
      "Meerkat",
      "Rattlesnakes",
      "Roadrunner",
    ],
    Rainforest: [
      "Basilisk Lizard",
      "Bengal Tiger",
      "Green Anaconda",
      "Jaguar",
      "Matamata Turtle",
      "Okapi",
      "Poison Dart Frog",
      "Sloth",
      "Spectacled Bear",
      "Tapir",
    ],
    Jungle: [
      "Fruit Bat",
      "Gibbons",
      "Gorillas",
      "Great Hornbill",
      "Howler Monkey",
      "Mandrill",
      "Parrots",
      "Ring-tailed Lemur",
      "Toucans",
    ],
  };

  const areaEntries = Object.entries(zooAreas);
  const firstColumn = areaEntries.slice(0, 5);
  const secondColumn = areaEntries.slice(5);

  /*
      <div
        className="area-key"
        style={{
          width: `${scale * 220}px`,
        }}
      >
        <div className="key-grid-area">
          {Object.entries(zooAreas).flatMap(([area, animals]) => [
            <div key={area} className="area-title">
              {area}
            </div>,
            ...animals.map((animal, i) => (
              <div key={`${area}-${i}`} className="animal-name">
                {animal}
              </div>
            )),
          ])}
        </div>
      </div>

  */

  return (
    <div className="projects-page">
      <Header />

      <img
        src="zoomap.png"
        alt="Zoo Map"
        className="background-map"
        style={{
          height: `${height}dvh`,
        }}
      />
      <div
        className="map-key"
        style={{
          transform: `scale(${scale})`,
        }}
      >
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

      <div className="area-key">
        <div className="area-columns">
          {[firstColumn, secondColumn].map((column, colIndex) => (
            <div className="area-column" key={colIndex}>
              {column.map(([area, animals]) => (
                <div key={area} className="area-block">
                  <div className={`area-title ${area.toLowerCase()}`}>
                    {area}
                  </div>
                  {animals.map((animal, i) => (
                    <div key={i} className="animal-name">
                      {animal}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
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

      <Footer />
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
