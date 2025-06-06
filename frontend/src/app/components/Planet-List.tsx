import React from "react";
import Link from "next/link";
import { cardStyle, imgStyle, sparkleStyle } from "./CardStyles"; // Import shared styles

export type Planet = {
  id?: number;
  name: string;
  type: string;
  diameter: number;
  mass: number;
  has_life: boolean | number;
  picture: string;
  solar_system?: string;
};

interface PlanetCardProps {
  planet: Planet;
}

const ringStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "70px",
  width: "140px",
  height: "30px",
  border: "3px solid #eebbc3",
  borderRadius: "50%",
  transform: "translateX(-50%) rotate(-15deg)",
  opacity: 0.4,
  zIndex: 0
};

export const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => (
  <Link href={`/about-planet/${planet.id}`} className="block">
    <div style={cardStyle}>
      <span style={sparkleStyle}>✨</span>
      <div style={ringStyle}></div>
      <img
        src={planet.picture}
        alt={planet.name}
        style={{ ...imgStyle, borderRadius: "50%" }} // Only planets are round!
      />
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>{planet.name}</h2>
      <p style={{ textAlign: "center", fontStyle: "italic", color: "#eebbc3" }}>
        {planet.type}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
        <li>
          <strong>Diameter:</strong> {planet.diameter} km
        </li>
        <li>
          <strong>Mass:</strong> {planet.mass} Earths
        </li>
        <li>
          <strong>Has Life:</strong> {planet.has_life ? "🪴 Yes" : "No"}
        </li>
        {planet.solar_system && (
          <li>
            <strong>Solar System:</strong> {planet.solar_system}
          </li>
        )}
      </ul>
    </div>
  </Link>
);

// List component to map all planets
interface PlanetListProps {
  planets: Planet[];
}

export const PlanetList: React.FC<PlanetListProps> = ({ planets }) => (
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem"
  }}>
    {planets.map((planet) => (
      <PlanetCard key={planet.id ?? planet.name} planet={planet} />
    ))}
  </div>
);

export default PlanetCard;