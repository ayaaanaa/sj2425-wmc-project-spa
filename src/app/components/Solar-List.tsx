import React from "react";
import Link from "next/link";
import { cardStyle, imgStyle, sparkleStyle } from "./CardStyles"; // Import shared styles

export type SolarSystem = {
  id?: number;
  name: string;
  age: number;
  star_type: string;
  distance_from_earth: number;
  picture: string;
};

interface SolarSystemCardProps {
  solarSystem: SolarSystem;
}

// Unique style for the orbit ring
const orbitStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "70px",
  width: "140px",
  height: "30px",
  border: "3px dashed #ffe066",
  borderRadius: "50%",
  transform: "translateX(-50%) rotate(10deg)",
  opacity: 0.4,
  zIndex: 0
};

export const SolarSystemCard: React.FC<SolarSystemCardProps> = ({ solarSystem }) => (
  <Link href={`/about-solar/${solarSystem.id}`} className="block">
    <div style={cardStyle}>
      <span style={sparkleStyle}>✨</span>
      <div style={orbitStyle}></div>
      <img
        src={solarSystem.picture}
        alt={solarSystem.name}
        style={imgStyle}
      />
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>{solarSystem.name}</h2>
      <p style={{ textAlign: "center", fontStyle: "italic", color: "#ffe066" }}>
        {solarSystem.star_type} Star
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
        <li>
          <strong>Age:</strong> {solarSystem.age} billion years
        </li>
        <li>
          <strong>Distance from Earth:</strong> {solarSystem.distance_from_earth} ly
        </li>
      </ul>
      <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
        🌞
      </div>
    </div>
  </Link>
);

// List component to map all solar systems
interface SolarSystemListProps {
  solarSystems: SolarSystem[];
}

export const SolarSystemList: React.FC<SolarSystemListProps> = ({ solarSystems }) => (
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem"
  }}>
    {solarSystems.map((solarSystem) => (
      <SolarSystemCard key={solarSystem.id ?? solarSystem.name} solarSystem={solarSystem} />
    ))}
  </div>
);

export default SolarSystemCard;