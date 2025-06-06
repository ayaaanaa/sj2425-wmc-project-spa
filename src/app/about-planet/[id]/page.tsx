"use client";
import React, { useEffect, useState } from "react";
import PlanetCard, { Planet } from "../../components/Planet-List";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white relative overflow-hidden">
      {/* Decorative floating background icons */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-float">🪐</div>
        <div className="absolute bottom-20 right-16 text-3xl animate-float-delay">🌌</div>
      </div>

      <h1 className="text-5xl font-semibold text-[#eebbc3] drop-shadow-md mb-10 tracking-tight">
        Planet Details
      </h1>

      {loading && (
        <div className="text-[#b8c1ec] text-lg animate-pulse mb-8 tracking-wide">
          <span className="mr-2 animate-spin">🛰️</span> Loading...
        </div>
      )}

      {!loading && planet && (
        <div className="w-full max-w-md flex flex-col items-center space-y-6">
          <PlanetCard planet={planet} />
          <div
            className="w-full bg-white/5 backdrop-blur-xl rounded-3xl border border-[#eebbc3]/20 shadow-xl p-6 transition-all hover:shadow-2xl"
            style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.25)" }}
          >
            <h2 className="text-2xl font-medium text-[#eebbc3] mb-4 tracking-wide flex items-center gap-2">
              <span className="text-xl">🌍</span> {planet.name}
            </h2>
            <ul className="space-y-2 text-base text-white/90 leading-relaxed">
              <li>
                <span className="font-semibold text-[#b8c1ec]">Type:</span> {planet.type}
              </li>
              <li>
                <span className="font-semibold text-[#b8c1ec]">Diameter:</span> {planet.diameter} km
              </li>
              <li>
                <span className="font-semibold text-[#b8c1ec]">Mass:</span> {planet.mass} Earths
              </li>
              <li>
                <span className="font-semibold text-[#b8c1ec]">Has Life:</span>{" "}
                {planet.has_life ? "Yes" : "No"}
              </li>
              {planet.solar_system && (
                <li>
                  <span className="font-semibold text-[#b8c1ec]">Solar System:</span>{" "}
                  {planet.solar_system}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {!loading && !planet && (
        <div className="text-[#eebbc3] text-lg mt-8 tracking-wide">
          <span className="mr-2">🚫</span> Planet not found.
        </div>
      )}

      {/* Aesthetic space footer detail */}
      <div className="mt-16 text-3xl opacity-10 select-none pointer-events-none">
        ✨🌠⭐
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
}
