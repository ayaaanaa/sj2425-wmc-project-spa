"use client";
import React, { useEffect, useState } from "react";
import SolarSystemCard, { SolarSystem } from "../../components/SolarSystemCard";

interface Props {
  params: { id: string };
}

export default function AboutSolarSystem({ params }: Props) {
  const [solarSystem, setSolarSystem] = useState<SolarSystem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSolarSystem() {
      setLoading(true);
      try {
        const res = await fetch(`/api/solder-systems/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setSolarSystem(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchSolarSystem();
  }, [params.id]);

  return (
    <div className="flex flex-col items-center justify-center bg-[#16161a] p-8">
      <h1 className="text-3xl font-bold text-[#ffe066] mb-6">🌞 Solar System Details</h1>
      {loading && (
        <div className="text-[#b8c1ec] text-xl animate-pulse mb-8">Loading...</div>
      )}
      {!loading && solarSystem && (
        <div className="w-full max-w-md">
          <SolarSystemCard solarSystem={solarSystem} />
          <div className="mt-6 bg-[#232946] rounded-xl p-6 shadow-lg border border-[#ffe066]">
            <h2 className="text-2xl text-[#ffe066] mb-2">{solarSystem.name}</h2>
            <ul className="text-[#fff] text-lg space-y-2">
              <li>
                <strong>Star Type:</strong> {solarSystem.star_type}
              </li>
              <li>
                <strong>Age:</strong> {solarSystem.age} billion years
              </li>
              <li>
                <strong>Distance from Earth:</strong> {solarSystem.distance_from_earth} ly
              </li>
            </ul>
          </div>
        </div>
      )}
      {!loading && !solarSystem && (
        <div className="text-[#eebbc3] text-xl mt-8">Solar system not found.</div>
      )}
    </div>
  );
}