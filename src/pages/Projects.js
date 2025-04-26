import { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Projects.css";
import GlitchText from "../components/GlitchText";

function Projects() {
  const [showAreaKey, setShowAreaKey] = useState(false);

  useEffect(() => {
    document.title = "Projects";
  }, []);

  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState("75dvh");
  const [width, setWidth] = useState("auto");
  const [mapKeyWidth, setMapKeyWidth] = useState("300px");

  useEffect(() => {
    const updateSize = () => {
      const baseWidth = 1500;
      const mapRatio = 2793 / 1897;

      if (window.innerWidth / (window.innerHeight - 325) < mapRatio) {
        setWidth("95vw");
        setHeight(`auto`);
      } else if (window.innerWidth > baseWidth) {
        setWidth("auto");
        setHeight(`70dvh`);
      } else {
        setWidth("auto");
        setHeight(`60dvh`);
      }

      const mapStopWidth = 1250;

      if ((window.innerWidth + 130) / window.innerHeight > mapRatio) {
        setMapKeyWidth("300px");
      } else {
        setMapKeyWidth("120vw");
      }

      if (window.innerHeight > 900) {
        setScale(1);
        setMapKeyWidth("80vw");
      } else if (window.innerWidth > baseWidth) {
        setScale(1);
      } else if (window.innerWidth < mapStopWidth) {
        setScale((mapStopWidth / baseWidth) ** 2);
      } else {
        setScale((window.innerWidth / baseWidth) ** 2);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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
          "A Django web application for doctors to administer and analyze patient PPST cognitive tests, with response data recorded in an SQLite database. This was a collaborative project for a college course. I focused on making tweaks to enhance the overall user experience. I refined Tailwind styling, improved navigation, and ensured visual consistency between pages. Additionally, I refactored code for efficiency and maintainability and fixed a lot bugs (so, so many bugs). I contributed lots of small features throughout, but the main feature I worked on was designing and implementing spreadsheet exports with formatted test results and aggregated data for easy analysis.",
        technologies: [
          "Django",
          "Tailwind",
          "Python",
          "HTML",
          "JavaScript",
          "GitHub",
        ],
        isProject: true,
      },
      {
        name: "RunSignup Photo App",
        summary:
          "A cross-platform React Native mobile app for race directors to manage and upload event photos during races. I built this in a Scrum team for my Software Engineering I class, collaborating directly with RunSignup. We followed Agile methodology and a GitHub Feature Branch workflow to develop and refine the application. I integrated RunSignup’s API for photo uploads and race/album data retrieval. I also built several core features, including the app’s scaffolding, page layouts, race search, upload progress bars, photo gallery, and offline functionality.",
        technologies: ["React Native", "Expo", "JavaScript", "GitHub"],
        isProject: true,
      },
      {
        name: "Key Word Blocker",
        summary:
          "A Chrome extension I made that automatically closes websites whose URLs contain one or more blocked keywords. I originally built it for myself to help cut down on distractions and stay productive. Since there are a ton of similar extensions, I figured only I would be using it, but it’s currently sitting at over 1,500 users and 5 stars, which still puts a stupid grin on my face.",
        technologies: ["JavaScript", "HTML", "CSS", "Manifest v3", "GitHub"],
        isProject: true,
      },
      {
        name: "Portfolio Website",
        summary:
          "A portfolio site for showing off Kyle Reed's accomplishments (that's me!). I figured a traditional portfolio site risked fading into the crowd, so I gave it a gimmick. The idea is this is a zoo website I’ve “hacked into” to inject my portfolio across its pages. The website was entirely designed and coded by me. It is built with React, hosted on an EC2 instance, and deployed automatically using Jenkins whenever I push to GitHub. This was my first time deploying a site like this, and it was definitely a major learning experience. Giving every page a unique shtick, ensuring the site looked good on all screen sizes, and creating the zoo map were all quite time-consuming, but I’m proud of how they turned out.",
        technologies: [
          "React",
          "JavaScript",
          "CSS",
          "EC2",
          "CI/CD",
          "Jenkins",
          "GitHub",
        ],
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

  const projectItems = useMemo(
    () => orderedItems.filter((item) => item.isProject),
    [orderedItems]
  );

  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [showProjects, setShowProjects] = useState(false);

  const goToNextProject = () => {
    setActiveProjectIndex((prevIndex) =>
      prevIndex === null ? 0 : (prevIndex + 1) % projectItems.length
    );
  };

  const goToPrevProject = () => {
    setActiveProjectIndex((prevIndex) =>
      prevIndex === null
        ? projectItems.length - 1
        : (prevIndex - 1 + projectItems.length) % projectItems.length
    );
  };

  const openPopup = (project) => {
    const index = projectItems.findIndex((p) => p.name === project.name);
    if (index !== -1) setActiveProjectIndex(index);
  };

  const closePopup = () => setActiveProjectIndex(null);

  useEffect(() => {
    const timeout = setTimeout(() => setShowProjects(true), 2000);
    return () => clearTimeout(timeout);
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

  return (
    <div className="projects-page">
      <Header />

      <img
        src="zoomap.png"
        alt="Zoo Map"
        className="background-map"
        style={{
          height: height,
          width: width,
        }}
      />
      <div
        className="map-key"
        style={{
          transform: `scale(${scale})`,
          width: mapKeyWidth,
        }}
      >
        <h3 className="map-key-title">MAP KEY</h3>
        <div className="key-grid">
          {orderedItems.map((item, index) => {
            if (item.isProject && !showProjects) return null;

            return item.isProject ? (
              <div
                key={index}
                className="project-key"
                onClick={() => openPopup(item)}
              >
                <img
                  className="icon"
                  src={`/icons/information.png`}
                  alt={"info"}
                ></img>
                <GlitchText
                  initialText={item.name}
                  alternateText={item.name}
                  time={Math.random() * 1000 + 1500}
                  initialTime={60}
                  glitchTime={180}
                />
              </div>
            ) : (
              <KeyItem key={index} icon={item.icon} label={item.label} />
            );
          })}
        </div>
      </div>

      <button
        className="toggle-area-key"
        onClick={() => setShowAreaKey(!showAreaKey)}
      >
        {showAreaKey ? "Area Key ▲" : "Area Key ▼"}
      </button>

      <div
        className={`area-key ${showAreaKey ? "open" : ""}`}
        style={{
          transform: `scale(${Math.min(1, window.innerHeight / 866) ** 1.7})`,
        }}
      >
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

      {activeProjectIndex != null && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>
              ✕
            </button>
            <h2>{projectItems[activeProjectIndex].name}</h2>
            <p>{projectItems[activeProjectIndex].summary}</p>
            <div className="technologies">
              {projectItems[activeProjectIndex].technologies.map(
                (tech, index) => (
                  <span key={index} className="tech-pill">
                    {tech}
                  </span>
                )
              )}
            </div>
            <div className="popup-navigation">
              <button className="nav-btn" onClick={goToPrevProject}>
                {"<"} Previous
              </button>
              <button className="nav-btn" onClick={goToNextProject}>
                Next {">"}
              </button>
            </div>
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
      <img className="icon" src={`/icons/${icon}`} alt={label} />
      <span>{label}</span>
    </div>
  );
}

export default Projects;
