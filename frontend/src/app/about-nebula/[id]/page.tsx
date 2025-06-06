"use client";
import React, { useEffect, useState } from "react";
import NebulaeCard, { Nebula } from "../../components/Nebulae-List";

interface Props {
  params: { id: string };
}

export default function AboutNebula({ params }: Props) {
  const [nebula, setNebula] = useState<Nebula | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNebula() {
      setLoading(true);
      try {
        const res = await fetch(`/api/nebulae/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setNebula(data);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNebula();
  }, [params.id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-14 text-5xl animate-float">🌌</div>
        <div className="absolute bottom-20 right-16 text-3xl animate-float-delay">✨</div>
      </div>

      <h1 className="text-5xl font-semibold text-[#b8c1ec] drop-shadow-md mb-10 tracking-tight">
        Nebula Details
      </h1>

      {loading && (
        <div className="text-[#b8c1ec] text-lg animate-pulse mb-8 tracking-wide">
          <span className="mr-2 animate-spin">🔭</span> Loading...
        </div>
      )}

      {!loading && nebula && (
        <div className="w-full max-w-md flex flex-col items-center space-y-6">
          <NebulaeCard nebula={nebula} />
          <div
            className="w-full bg-white/5 backdrop-blur-xl rounded-3xl border border-[#b8c1ec]/20 shadow-xl p-6 transition-all hover:shadow-2xl"
            style={{ boxShadow: "0 16px 48px rgba(184, 193, 236, 0.1)" }}
          >
            <h2 className="text-2xl font-medium text-[#b8c1ec] mb-4 tracking-wide flex items-center gap-2">
              <span className="text-xl">🌠</span> {nebula.name}
            </h2>
            <ul className="space-y-2 text-base text-white/90 leading-relaxed">
              <li>
                <span className="font-semibold text-[#eebbc3]">Type:</span> {nebula.type}
              </li>
              <li>
                <span className="font-semibold text-[#eebbc3]">Distance from Earth:</span>{" "}
                {nebula.distance_from_earth} ly
              </li>
              <li>
                <span className="font-semibold text-[#eebbc3]">Size:</span> {nebula.size} ly
              </li>
            </ul>
          </div>
        </div>
      )}

      {!loading && !nebula && (
        <div className="text-[#eebbc3] text-lg mt-8 tracking-wide">
          <span className="mr-2">🚫</span> Nebula not found.
        </div>
      )}

      {/* Decorative footer sparkles */}
      <div className="mt-16 text-3xl opacity-10 select-none pointer-events-none">
        💫🌟🌌
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
          animation: float 7s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 9s ease-in-out infinite;
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
}
