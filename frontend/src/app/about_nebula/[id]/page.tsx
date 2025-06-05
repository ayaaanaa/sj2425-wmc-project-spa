"use client";
import React, { useEffect, useState } from "react";
import NebulaeCard, { Nebula } from "../../components/NebulaeCard";

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
    <div className="flex flex-col items-center justify-center bg-[#16161a] p-8">
      <h1 className="text-3xl font-bold text-[#b8c1ec] mb-6">🌌 Nebula Details</h1>
      {loading && (
        <div className="text-[#b8c1ec] text-xl animate-pulse mb-8">Loading...</div>
      )}
      {!loading && nebula && (
        <div className="w-full max-w-md">
          <NebulaeCard nebula={nebula} />
          <div className="mt-6 bg-[#232946] rounded-xl p-6 shadow-lg border border-[#b8c1ec]">
            <h2 className="text-2xl text-[#b8c1ec] mb-2">{nebula.name}</h2>
            <ul className="text-[#fff] text-lg space-y-2">
              <li>
                <strong>Type:</strong> {nebula.type}
              </li>
              <li>
                <strong>Distance from Earth:</strong> {nebula.distance_from_earth} ly
              </li>
              <li>
                <strong>Size:</strong> {nebula.size} ly
              </li>
            </ul>
          </div>
        </div>
      )}
      {!loading && !nebula && (
        <div className="text-[#eebbc3] text-xl mt-8">Nebula not found.</div>
      )}
    </div>
  );
}