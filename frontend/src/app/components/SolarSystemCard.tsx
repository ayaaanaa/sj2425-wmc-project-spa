import React from "react";

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

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #232946 60%, #393e6e 100%)",
  borderRadius: "1.5rem",
  boxShadow: "0 4px 24px 0 #23294655",
  color: "#fff",
  padding: "1.5rem",
  width: "320px",
  margin: "1rem auto",
  border: "2px solid #ffe066",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Quicksand', 'Comic Sans MS', cursive, sans-serif"
};

const imgStyle: React.CSSProperties = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #ffe066",
  boxShadow: "0 0 24px #ffe066aa",
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
);

export default SolarSystemCard;