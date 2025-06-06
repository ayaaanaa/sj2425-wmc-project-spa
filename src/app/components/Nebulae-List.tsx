import React from "react";
import Link from "next/link";
import { cardStyle, imgStyle, sparkleStyle, cloudStyle } from "./CardStyles"; // Import shared styles

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

export const NebulaeCard: React.FC<NebulaeCardProps> = ({ nebula }) => (
  <div style={cardStyle}>
    <span style={sparkleStyle}>✨</span>
    <span style={cloudStyle}>☁️</span>
    <Link key={nebula.id} href={`/about-nebula/${nebula.id}`} className="block">
      <img
        src={nebula.picture}
        alt={nebula.name}
        style={imgStyle}
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
    </Link>
  </div>
);

// List component to map all nebulae
interface NebulaeListProps {
  nebulae: Nebula[];
}

export const NebulaeList: React.FC<NebulaeListProps> = ({ nebulae }) => (
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem"
  }}>
    {nebulae.map((nebula) => (
      <NebulaeCard key={nebula.id ?? nebula.name} nebula={nebula} />
    ))}
  </div>
);

export default NebulaeCard;