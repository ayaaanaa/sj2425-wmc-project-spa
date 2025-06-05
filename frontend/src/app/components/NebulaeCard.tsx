import React from "react";

export type Nebula = {
  id?: number;
  name: string;
  type: string;
  distance_from_earth: number;
  size: number;
  picture: string;
};

interface NebulaeCardProps {
  nebula: Nebula;
}

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #232946 60%, #393e6e 100%)",
  borderRadius: "1.5rem",
  boxShadow: "0 4px 24px 0 #23294655",
  color: "#fff",
  padding: "1.5rem",
  width: "320px",
  margin: "1rem auto",
  border: "2px solid #b8c1ec",
  position: "relative",
  overflow: "hidden",
  fontFamily: "'Quicksand', 'Comic Sans MS', cursive, sans-serif"
};

const nebulaImgStyle: React.CSSProperties = {
  width: "120px",
  height: "120px",
  borderRadius: "1rem",
  objectFit: "cover",
  border: "4px solid #b8c1ec",
  boxShadow: "0 0 24px #b8c1ecaa",
  background: "#fff",
  margin: "0 auto 1rem auto",
  display: "block"
};

const sparkleStyle: React.CSSProperties = {
  position: "absolute",
  top: "10px",
  left: "20px",
  fontSize: "2rem",
  opacity: 0.7,
  pointerEvents: "none"
};

const cloudStyle: React.CSSProperties = {
  position: "absolute",
  right: "10px",
  bottom: "10px",
  fontSize: "2.5rem",
  opacity: 0.5,
  pointerEvents: "none"
};

export const NebulaeCard: React.FC<NebulaeCardProps> = ({ nebula }) => (
  <div style={cardStyle}>
    <span style={sparkleStyle}>✨</span>
    <span style={cloudStyle}>☁️</span>
    <img
      src={nebula.picture}
      alt={nebula.name}
      style={nebulaImgStyle}
    />
    <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>{nebula.name}</h2>
    <p style={{ textAlign: "center", fontStyle: "italic", color: "#b8c1ec" }}>
      {nebula.type}
    </p>
    <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0" }}>
      <li>
        <strong>Distance from Earth:</strong> {nebula.distance_from_earth} ly
      </li>
      <li>
        <strong>Size:</strong> {nebula.size} ly
      </li>
    </ul>
    <div style={{ textAlign: "center", fontSize: "1.5rem" }}>
      🌌
    </div>
  </div>
);

export default NebulaeCard;