"use client";
import React, { useEffect, useState } from "react";
import PlanetCard, { Planet } from "../../components/PlanetCard";

interface Props {
  params: { id: string };
}

export default function AboutPlanet({ params }: Props) {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanet() {
      setLoading(true);
      try {
        const res = await fetch(`/api/planets/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setPlanet(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchPlanet();
  }, [params.id]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#16161a] p-8">
      <h1 className="text-3xl font-bold text-[#eebbc3] mb-6">🪐 Planet Details</h1>
      {loading && (
        <div className="text-[#b8c1ec] text-xl animate-pulse mb-8">Loading...</div>
      )}
      {!loading && planet && (
        <div className="w-full max-w-md">
          <PlanetCard planet={planet} />
          <div className="mt-6 bg-[#232946] rounded-xl p-6 shadow-lg border border-[#eebbc3]">
            <h2 className="text-2xl text-[#eebbc3] mb-2">{planet.name}</h2>
            <ul className="text-[#fff] text-lg space-y-2">
              <li>
                <strong>Type:</strong> {planet.type}
              </li>
              <li>
                <strong>Diameter:</strong> {planet.diameter} km
              </li>
              <li>
                <strong>Mass:</strong> {planet.mass} Earths
              </li>
              <li>
                <strong>Has Life:</strong> {planet.has_life ? "Yes" : "No"}
              </li>
              {planet.solar_system && (
                <li>
                  <strong>Solar System:</strong> {planet.solar_system}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {!loading && !planet && (
        <div className="text-[#eebbc3] text-xl mt-8">Planet not found.</div>
      )}
    </div>
  );
}