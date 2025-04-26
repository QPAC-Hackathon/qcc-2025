import { useNavigate } from "react-router-dom";
import "./Map.css";
import { useState } from "react";

function Map() {
  const navigate = useNavigate();
  const [hoveredWorld, setHoveredWorld] = useState(null);

  const worlds = [
    {
      name: "personal",
      id: 0,
      svg: "/media/personal.svg",
      top: "30%",
      left: "30%",
    },
    {
      name: "social",
      id: 1,
      svg: "/media/social.svg",
      top: "30%",
      left: "83%",
    },
    {
      name: "learning",
      id: 2,
      svg: "/media/learning.svg",
      top: "60%",
      left: "30%",
    },
    { name: "food", id: 3, svg: "/media/food.svg", top: "75%", left: "55%" },
    {
      name: "travel",
      id: 4,
      svg: "/media/travel.svg",
      top: "50%",
      left: "55%",
    },
    {
      name: "physical activity",
      id: 5,
      svg: "/media/physical.svg",
      top: "60%",
      left: "83%",
    },
  ];

  function handleWorldClick(worldId) {
    navigate(`/tasks/${worldId}`);
  }

  return (
    <div className="map-page">
      <img
        src="/media/map.svg"
        className="map-background"
        alt="Map Background"
      />

      {/* Title */}
      <div className="map-title">
        <h1>Choose Your World</h1>
        {hoveredWorld && <h2 className="hovered-world">{hoveredWorld}</h2>}
      </div>

      {/* Worlds */}
      {worlds.map((world) =>
        world.svg ? (
          <img
            key={world.id}
            src={world.svg}
            alt={world.name}
            className="world-overlay"
            style={{ top: world.top, left: world.left }}
            onClick={() => handleWorldClick(world.id)}
            onMouseEnter={() => setHoveredWorld("click to go to " + world.name)}
            onMouseLeave={() => setHoveredWorld(null)}
          />
        ) : (
          <button
            key={world.id}
            className="world-button"
            style={{ top: world.top, left: world.left }}
            onClick={() => handleWorldClick(world.id)}
            onMouseEnter={() => setHoveredWorld(world.name)}
            onMouseLeave={() => setHoveredWorld(null)}
          >
            {world.name}
          </button>
        )
      )}
    </div>
  );
}

export default Map;
