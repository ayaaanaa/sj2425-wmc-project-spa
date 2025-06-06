"use client";
import React, { useEffect, useState } from "react";
import SolarSystemCard, { SolarSystem } from "../../components/Solar-List";

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
        const res = await fetch(`/api/solar-systems/${params.id}`);
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
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white relative overflow-hidden">
      {/* Decorative floating icons */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-16 right-16 text-4xl animate-float">🌞</div>
        <div className="absolute bottom-20 left-12 text-3xl animate-float-delay">🪐</div>
      </div>

      <h1 className="text-5xl font-semibold text-[#ffe066] drop-shadow-md mb-10 tracking-tight">
        Solar System Details
      </h1>

      {loading && (
        <div className="text-[#b8c1ec] text-lg animate-pulse mb-8 tracking-wide">
          <span className="mr-2 animate-spin">🛰️</span> Loading...
        </div>
      )}

      {!loading && solarSystem && (
        <div className="w-full max-w-md flex flex-col items-center space-y-6">
          <SolarSystemCard solarSystem={solarSystem} />
          <div
            className="w-full bg-white/5 backdrop-blur-xl rounded-3xl border border-[#ffe066]/20 shadow-xl p-6 transition-all hover:shadow-2xl"
            style={{ boxShadow: "0 16px 48px rgba(255, 224, 102, 0.1)" }}
          >
            <h2 className="text-2xl font-medium text-[#ffe066] mb-4 tracking-wide flex items-center gap-2">
              <span className="text-xl">🌌</span> {solarSystem.name}
            </h2>
            <ul className="space-y-2 text-base text-white/90 leading-relaxed">
              <li>
                <span className="font-semibold text-[#b8c1ec]">Star Type:</span>{" "}
                {solarSystem.star_type}
              </li>
              <li>
                <span className="font-semibold text-[#b8c1ec]">Age:</span>{" "}
                {solarSystem.age} billion years
              </li>
              <li>
                <span className="font-semibold text-[#b8c1ec]">Distance from Earth:</span>{" "}
                {solarSystem.distance_from_earth} ly
              </li>
            </ul>
          </div>
        </div>
      )}

      {!loading && !solarSystem && (
        <div className="text-[#eebbc3] text-lg mt-8 tracking-wide">
          <span className="mr-2">🚫</span> Solar system not found.
        </div>
      )}

      {/* Subtle decorative footer icons */}
      <div className="mt-16 text-3xl opacity-10 select-none pointer-events-none">
        ☀️✨🌠
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
          animation-delay: 1.2s;
        }
      `}</style>
    </div>
  );
}
