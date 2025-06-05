import React from "react";

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

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #232946 60%, #393e6e 100%)",
  borderRadius: "1.5rem",
  boxShadow: "0 4px 24px 0 #23294655",
  color: "#fff",
  padding: "1.5rem",
  width: "320px",
  margin: "1rem auto",
  border: "2px solid #eebbc3",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Quicksand', 'Comic Sans MS', cursive, sans-serif"
};

const planetImgStyle: React.CSSProperties = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #eebbc3",
  boxShadow: "0 0 24px #eebbc3aa",
  background: "#fff",
  margin: "0 auto 1rem auto",
  display: "block"
};

const sparkleStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  right: "20px",
  fontSize: "2rem",
  opacity: 0.7,
  pointerEvents: "none"
};

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
  <div style={cardStyle}>
    <span style={sparkleStyle}>✨</span>
    <div style={ringStyle}></div>
    <img
      src={planet.picture}
      alt={planet.name}
      style={planetImgStyle}
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
    <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
      🪐
    </div>
  </div>
);

export default PlanetCard;