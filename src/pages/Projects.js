import { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Projects.css";
import GlitchText from "../components/GlitchText";

function Projects() {
  const [showAreaKey, setShowAreaKey] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

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

      if (window.innerHeight > 1000) {
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
      "Beaver",
      "Capybara",
      "Crocodile",
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
                  src={`/information.png`}
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

      <div className="credits-link" onClick={() => setShowCredits(true)}>
        Icon Credits
      </div>

      {showCredits && (
        <div
          className="credits-modal-overlay"
          onClick={() => setShowCredits(false)}
        >
          <div className="credits-modal" onClick={(e) => e.stopPropagation()}>
            <div className="credits-header">
              <h2>Icon Credits</h2>
              <button
                className="close-btn"
                onClick={() => setShowCredits(false)}
              >
                ✕
              </button>
            </div>
            <div className="credits-list">
              <a
                href="https://www.flaticon.com/free-icon/lion_8531904"
                target="_blank"
                rel="noopener noreferrer"
                title="lion icon"
              >
                Lion icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/mammoth_8531905"
                target="_blank"
                rel="noopener noreferrer"
                title="elephant icon"
              >
                Elephant icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/rabbit_8531913"
                target="_blank"
                rel="noopener noreferrer"
                title="rabbit icon"
              >
                Rabbit icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/kangaroo_8531901"
                target="_blank"
                rel="noopener noreferrer"
                title="kangaroo icon"
              >
                Kangaroo icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/kiwi_8531902"
                target="_blank"
                rel="noopener noreferrer"
                title="kiwi icon"
              >
                Kiwi icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/squirrel_8531929"
                target="_blank"
                rel="noopener noreferrer"
                title="squirrel icon"
              >
                Squirrel icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/koala_8531903"
                target="_blank"
                rel="noopener noreferrer"
                title="koala icon"
              >
                Koala icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/pelican_8531910"
                target="_blank"
                rel="noopener noreferrer"
                title="toucan icon"
              >
                Toucan icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/ostrich_8531908"
                target="_blank"
                rel="noopener noreferrer"
                title="ostrich icon"
              >
                Ostrich icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/turtle_8531935"
                target="_blank"
                rel="noopener noreferrer"
                title="turtle icon"
              >
                Turtle icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/meerkat_8531906"
                target="_blank"
                rel="noopener noreferrer"
                title="meerkat icon"
              >
                Meerkat icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/red-crowned-crane_92007"
                target="_blank"
                rel="noopener noreferrer"
                title="red crowned crane icon"
              >
                Red Crowned Crane icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/rhino-side-view-silhouette_47532"
                target="_blank"
                rel="noopener noreferrer"
                title="rhino icon"
              >
                Rhino icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/hyena-shape_47202"
                target="_blank"
                rel="noopener noreferrer"
                title="hyena icon"
              >
                Hyena icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/owl-bird-shape_47087"
                target="_blank"
                rel="noopener noreferrer"
                title="owl icon"
              >
                Owl icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/cougar_84291"
                target="_blank"
                rel="noopener noreferrer"
                title="cougar icon"
              >
                Cougar icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/lizard_11434491"
                target="_blank"
                rel="noopener noreferrer"
                title="lizard icon"
              >
                Lizard icon created by Leremy - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/snake_8616077"
                target="_blank"
                rel="noopener noreferrer"
                title="snake icon"
              >
                Snake icon created by Unknown Depths - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/scorpion-shape_47325"
                target="_blank"
                rel="noopener noreferrer"
                title="scorpion icon"
              >
                Scorpion icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/spider_357556"
                target="_blank"
                rel="noopener noreferrer"
                title="spider icon"
              >
                Spider icon created by Smashicons - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/monkey-facing-right_83907"
                target="_blank"
                rel="noopener noreferrer"
                title="monkey icon"
              >
                Monkey icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/giraffe-silhouette_47057"
                target="_blank"
                rel="noopener noreferrer"
                title="giraffe icon"
              >
                Giraffe icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/flamingo_47228"
                target="_blank"
                rel="noopener noreferrer"
                title="flamingo icon"
              >
                Flamingo icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/crocodile_8531885"
                target="_blank"
                rel="noopener noreferrer"
                title="crocodile icon"
              >
                Crocodile icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/porcupine-shape_47317"
                target="_blank"
                rel="noopener noreferrer"
                title="hedgehog icon"
              >
                Hedgehog icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/sheep_8531920"
                target="_blank"
                rel="noopener noreferrer"
                title="sheep icon"
              >
                Sheep icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/bear-facing-right_84278"
                target="_blank"
                rel="noopener noreferrer"
                title="bear icon"
              >
                Bear icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/pig_8531912"
                target="_blank"
                rel="noopener noreferrer"
                title="pig icon"
              >
                Pig icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/cow_11240105"
                target="_blank"
                rel="noopener noreferrer"
                title="cow icon"
              >
                Cow icon created by Kach - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/chicken_8531881"
                target="_blank"
                rel="noopener noreferrer"
                title="chicken icon"
              >
                Chicken icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/penguin_8531911"
                target="_blank"
                rel="noopener noreferrer"
                title="penguin icon"
              >
                Penguin icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/gorilla-facing-right_84171"
                target="_blank"
                rel="noopener noreferrer"
                title="gorilla icon"
              >
                Gorilla icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/lemur-shape_47273"
                target="_blank"
                rel="noopener noreferrer"
                title="lemur icon"
              >
                Lemur icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/fox_8531896"
                target="_blank"
                rel="noopener noreferrer"
                title="fox icon"
              >
                Fox icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/seal_2301589"
                target="_blank"
                rel="noopener noreferrer"
                title="seal icon"
              >
                Seal icon created by Vitaly Gorbachev - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/walrus-mammal-silhouette_47064"
                target="_blank"
                rel="noopener noreferrer"
                title="walrus icon"
              >
                Walrus icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/fish_8531891"
                target="_blank"
                rel="noopener noreferrer"
                title="fish icon"
              >
                Fish icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/shark_8531918"
                target="_blank"
                rel="noopener noreferrer"
                title="shark icon"
              >
                Shark icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/dolphin_2301586"
                target="_blank"
                rel="noopener noreferrer"
                title="dolphin icon"
              >
                Dolphin icon created by Vitaly Gorbachev - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/cheetah-feline-silhouette_47403"
                target="_blank"
                rel="noopener noreferrer"
                title="cheetah icon"
              >
                Cheetah icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/antelope-silhouette-from-side-view_48798"
                target="_blank"
                rel="noopener noreferrer"
                title="antelope icon"
              >
                Antelope icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/antelope_15707610"
                target="_blank"
                rel="noopener noreferrer"
                title="gazelle icon"
              >
                Gazelle icon created by Delwar018 - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/hippopotamus-looking-right_84440"
                target="_blank"
                rel="noopener noreferrer"
                title="hippopotamus icon"
              >
                Hippopotamus icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/beaver-mammal-animal-shape_47381"
                target="_blank"
                rel="noopener noreferrer"
                title="beaver icon"
              >
                Beaver icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/duck_92035"
                target="_blank"
                rel="noopener noreferrer"
                title="duck icon"
              >
                Duck icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/frog_3205636"
                target="_blank"
                rel="noopener noreferrer"
                title="frog icon"
              >
                Frog icon created by Solid Icon Co - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/moose-shape_47149"
                target="_blank"
                rel="noopener noreferrer"
                title="moose icon"
              >
                Moose icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/wolf_8531941"
                target="_blank"
                rel="noopener noreferrer"
                title="wolf icon"
              >
                Wolf icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/bat_2250418"
                target="_blank"
                rel="noopener noreferrer"
                title="bat icon"
              >
                Bat icon created by srip - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/donkey_8531888"
                target="_blank"
                rel="noopener noreferrer"
                title="donkey icon"
              >
                Donkey icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/bird_8531874"
                target="_blank"
                rel="noopener noreferrer"
                title="bird icon"
              >
                Bird icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/parrot-shape_47360"
                target="_blank"
                rel="noopener noreferrer"
                title="parrot icon"
              >
                Parrot icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/giraffe_8531897"
                target="_blank"
                rel="noopener noreferrer"
                title="okapi icon"
              >
                Okapi icon created by PLANBSTUDIO - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/manta-ray-shape_47440"
                target="_blank"
                rel="noopener noreferrer"
                title="manta ray icon"
              >
                Manta Ray icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/goat_4081988"
                target="_blank"
                rel="noopener noreferrer"
                title="goat icon"
              >
                Goat icon created by Icongeek26 - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/spots_15707505"
                target="_blank"
                rel="noopener noreferrer"
                title="lynx icon"
              >
                Lynx icon created by Delwar018 - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/raccoon_4082023"
                target="_blank"
                rel="noopener noreferrer"
                title="raccoon icon"
              >
                Raccoon icon created by Icongeek26 - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/mammal_15707554"
                target="_blank"
                rel="noopener noreferrer"
                title="porcupine icon"
              >
                Porcupine icon created by Delwar018 - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/otter_10684361"
                target="_blank"
                rel="noopener noreferrer"
                title="otter icon"
              >
                Otter icon created by Amethyst prime - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/mammal_15707601"
                target="_blank"
                rel="noopener noreferrer"
                title="capybara icon"
              >
                Capybara icon created by Delwar018 - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/zebra_18064677"
                target="_blank"
                rel="noopener noreferrer"
                title="zebra icon"
              >
                Zebra icon created by khld939 - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/wild-boar_427579"
                target="_blank"
                rel="noopener noreferrer"
                title="warthog icon"
              >
                Warthog icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/animal_15622716"
                target="_blank"
                rel="noopener noreferrer"
                title="sloth icon"
              >
                Sloth icon created by Park Jisun - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/animal_12696203"
                target="_blank"
                rel="noopener noreferrer"
                title="mandrill icon"
              >
                Mandrill icon created by Ylivdesign - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/tapir_15180109"
                target="_blank"
                rel="noopener noreferrer"
                title="tapir icon"
              >
                Tapir icon created by Graficon - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/spots_15707496"
                target="_blank"
                rel="noopener noreferrer"
                title="jaguar icon"
              >
                Jaguar icon created by Delwar018 - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/octopus_7591649"
                target="_blank"
                rel="noopener noreferrer"
                title="octopus icon"
              >
                Octopus icon created by Amethyst prime - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/bird-roadrunner-shape_47127"
                title="roadrunner icon"
              >
                Roadrunner icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/seahorse_166029"
                target="_blank"
                rel="noopener noreferrer"
                title="seahorse icon"
              >
                Seahorse icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/animal_15622658"
                target="_blank"
                rel="noopener noreferrer"
                title="platypus icon"
              >
                Platypus icon created by Park Jisun - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/trophy_15622692"
                target="_blank"
                rel="noopener noreferrer"
                title="caribou icon"
              >
                Caribou icon created by Park Jisun - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/tiger_1018478"
                target="_blank"
                rel="noopener noreferrer"
                title="tiger icon"
              >
                Tiger icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/monkey_15622638"
                target="_blank"
                rel="noopener noreferrer"
                title="gibbon icon"
              >
                Gibbon icon created by Park Jisun - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/hornbill_6622673"
                target="_blank"
                rel="noopener noreferrer"
                title="hornbill icon"
              >
                Hornbill icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/eel_468267"
                target="_blank"
                rel="noopener noreferrer"
                title="eel icon"
              >
                Eel icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/fennec_371676"
                target="_blank"
                rel="noopener noreferrer"
                title="fennec icon"
              >
                Fennec icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/vulture-bird-shape_47106"
                target="_blank"
                rel="noopener noreferrer"
                title="vulture icon"
              >
                Vulture icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/hunting_16442291"
                target="_blank"
                rel="noopener noreferrer"
                title="jackal icon"
              >
                Jackal icon created by Three musketeers - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/bearded-dragon_15599281"
                target="_blank"
                rel="noopener noreferrer"
                title="bearded dragon icon"
              >
                Bearded Dragon icon created by Paul J. - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/toilet_185547"
                target="_blank"
                rel="noopener noreferrer"
                title="restroom icon"
              >
                Restroom icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/gift_10445148"
                target="_blank"
                rel="noopener noreferrer"
                title="gift icon"
              >
                Gift icon created by Syahrul Hidayatullah - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/wheelchair_2021575"
                target="_blank"
                rel="noopener noreferrer"
                title="wheelchair icon"
              >
                Wheelchair icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/water"
                target="_blank"
                rel="noopener noreferrer"
                title="water icon"
              >
                Water icon created by Good Ware - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/carousel_618874"
                target="_blank"
                rel="noopener noreferrer"
                title="carousel icon"
              >
                Carousel icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/info_17225564"
                target="_blank"
                rel="noopener noreferrer"
                title="information icon"
              >
                Information icon created by Fitricon - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/picnic-table_9732316"
                target="_blank"
                rel="noopener noreferrer"
                title="picnic table icon"
              >
                Picnic table icon created by mnauliady - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/defibrillator_984960"
                target="_blank"
                rel="noopener noreferrer"
                title="aed icon"
              >
                AED icon created by Freepik - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/woman_15849248"
                target="_blank"
                rel="noopener noreferrer"
                title="nursin icon"
              >
                Nursing icon created by alekseyvanin - Flaticon
              </a>
              <a
                href="https://www.flaticon.com/free-icon/restaurant_685352"
                target="_blank"
                rel="noopener noreferrer"
                title="concessions icon"
              >
                Concessions icon created by Freepik - Flaticon
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        className="toggle-area-key"
        onClick={() => setShowAreaKey(!showAreaKey)}
      >
        {showAreaKey ? "Area Key ▲" : "Area Key ▼"}
      </button>

      <div
        className={`area-key ${showAreaKey ? "open" : ""}`}
        /*style={{
          transform: `scale(${Math.min(1, window.innerHeight / 920) ** 1.7})`,
        }}*/
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

      <Footer />
    </div>
  );
}

function KeyItem({ icon, label }) {
  return (
    <div className="key-item">
      <img className="icon" src={`/${icon}`} alt={label} />
      <span>{label}</span>
    </div>
  );
}

export default Projects;
