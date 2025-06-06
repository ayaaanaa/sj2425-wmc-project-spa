"use client";
import React, { useEffect, useState } from "react";
import { Planet } from "../components/Planet-List";
import { Nebula } from "../components/Nebulae-List";
import { SolarSystem } from "../components/Solar-List";

export default function EditPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [nebulae, setNebulae] = useState<Nebula[]>([]);
  const [solarSystems, setSolarSystems] = useState<SolarSystem[]>([]);
  const [loading, setLoading] = useState(true);

  const [editType, setEditType] = useState<"planet" | "nebula" | "solar" | null>(null);
  const [editItem, setEditItem] = useState<any>(null);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const [planetsRes, nebulaeRes, solarSystemsRes] = await Promise.all([
        fetch("/api/planets"),
        fetch("/api/nebulae"),
        fetch("/api/solar-systems"),
      ]);
      setPlanets(await planetsRes.json());
      setNebulae(await nebulaeRes.json());
      setSolarSystems(await solarSystemsRes.json());
      setLoading(false);
    }
    fetchAll();
  }, []);

  async function handleDelete(type: "planet" | "nebula" | "solar", id: number) {
    let url = "";
    if (type === "planet") url = `/api/planets/${id}`;
    if (type === "nebula") url = `/api/nebulae/${id}`;
    if (type === "solar") url = `/api/solar-systems/${id}`;
    await fetch(url, { method: "DELETE" });
    setLoading(true);
    const [planetsRes, nebulaeRes, solarSystemsRes] = await Promise.all([
      fetch("/api/planets"),
      fetch("/api/nebulae"),
      fetch("/api/solar-systems"),
    ]);
    setPlanets(await planetsRes.json());
    setNebulae(await nebulaeRes.json());
    setSolarSystems(await solarSystemsRes.json());
    setLoading(false);
  }

  function EditForm() {
    if (!editType) return null;
    const isEdit = !!editItem;
    const [form, setForm] = useState<any>(editItem || {});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      if (editType === "planet") {
        form.diameter = Number(form.diameter);
        form.mass = Number(form.mass);
        form.has_life = form.has_life === "true" || form.has_life === true;
        form.solar_system_id = Number(form.solar_system_id);
      }
      if (editType === "solar") {
        form.age = Number(form.age);
        form.distance_from_earth = Number(form.distance_from_earth);
      }
      if (editType === "nebula") {
        form.distance_from_earth = Number(form.distance_from_earth);
        form.size = Number(form.size);
      }

      let url = "";
      let method = isEdit ? "PUT" : "POST";
      let body = JSON.stringify(form);
      if (editType === "planet") url = isEdit ? `/api/planets/${editItem.id}` : "/api/planets";
      if (editType === "nebula") url = isEdit ? `/api/nebulae/${editItem.id}` : "/api/nebulae";
      if (editType === "solar") url = isEdit ? `/api/solar-systems/${editItem.id}` : "/api/solar-systems";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body });
      setEditType(null);
      setEditItem(null);
      // Refresh data
      setLoading(true);
      const [planetsRes, nebulaeRes, solarSystemsRes] = await Promise.all([
        fetch("/api/planets"),
        fetch("/api/nebulae"),
        fetch("/api/solar-systems"),
      ]);
      setPlanets(await planetsRes.json());
      setNebulae(await nebulaeRes.json());
      setSolarSystems(await solarSystemsRes.json());
      setLoading(false);
    }

    const fields =
      editType === "planet"
        ? [
            { name: "name", label: "Name" },
            { name: "type", label: "Type" },
            { name: "diameter", label: "Diameter" },
            { name: "mass", label: "Mass" },
            { name: "has_life", label: "Has Life (true/false)" },
            { name: "solar_system_id", label: "Solar System ID" },
            { name: "picture", label: "Picture URL" },
          ]
        : editType === "nebula"
        ? [
            { name: "name", label: "Name" },
            { name: "type", label: "Type" },
            { name: "distance_from_earth", label: "Distance from Earth" },
            { name: "size", label: "Size" },
            { name: "picture", label: "Picture URL" },
          ]
        : [
            { name: "name", label: "Name" },
            { name: "age", label: "Age" },
            { name: "star_type", label: "Star Type" },
            { name: "distance_from_earth", label: "Distance from Earth" },
            { name: "picture", label: "Picture URL" },
          ];

    return (
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-[#eebbc3]/30 p-8 mb-8 flex flex-col gap-4 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-2">{isEdit ? "Edit" : "Add"} {editType.charAt(0).toUpperCase() + editType.slice(1)}</h2>
        {fields.map((f) => (
          <label key={f.name} className="flex flex-col gap-1">
            {f.label}
            <input
              name={f.name}
              value={form[f.name] ?? ""}
              onChange={handleChange}
              className="rounded px-3 py-2 bg-white/60 text-black"
              required={f.name !== "solar_system_id"}
            />
          </label>
        ))}
        <div className="flex gap-4 mt-2">
          <button type="submit" className="bg-[#eebbc3] text-[#232946] px-4 py-2 rounded font-bold hover:bg-[#ffe066] transition">Save</button>
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded font-bold hover:bg-gray-600 transition" onClick={() => { setEditType(null); setEditItem(null); }}>Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-12">
      <h1 className="text-4xl font-extrabold text-center text-[#eebbc3] drop-shadow-lg mb-6 flex items-center gap-4">
        <span className="animate-bounce">🛠️</span>
        Edit Space Objects
        <span className="animate-pulse">✨</span>
      </h1>
      {loading && <div className="text-[#b8c1ec] text-xl animate-pulse mb-8">Loading...</div>}
      <EditForm />
      <div className="w-full max-w-6xl grid md:grid-cols-3 gap-8">
        {/* Planets */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-[#eebbc3]/30 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#eebbc3] flex items-center gap-2">🪐 Planets</h2>
            <button
              className="bg-[#eebbc3] text-[#232946] px-3 py-1 rounded font-bold hover:bg-[#ffe066] transition"
              onClick={() => { setEditType("planet"); setEditItem(null); }}
            >
              + Add
            </button>
          </div>
          <ul className="space-y-4">
            {planets.map((planet) => (
              <li key={planet.id} className="flex items-center justify-between gap-2 bg-white/20 rounded-lg px-3 py-2">
                <span className="truncate">{planet.name}</span>
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:underline" onClick={() => { setEditType("planet"); setEditItem(planet); }}>Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete("planet", planet.id!)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* Nebulae */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-[#b8c1ec]/30 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#b8c1ec] flex items-center gap-2">🌌 Nebulae</h2>
            <button
              className="bg-[#b8c1ec] text-[#232946] px-3 py-1 rounded font-bold hover:bg-[#ffe066] transition"
              onClick={() => { setEditType("nebula"); setEditItem(null); }}
            >
              + Add
            </button>
          </div>
          <ul className="space-y-4">
            {nebulae.map((nebula) => (
              <li key={nebula.id} className="flex items-center justify-between gap-2 bg-white/20 rounded-lg px-3 py-2">
                <span className="truncate">{nebula.name}</span>
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:underline" onClick={() => { setEditType("nebula"); setEditItem(nebula); }}>Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete("nebula", nebula.id!)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* Solar Systems */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-[#ffe066]/30 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#ffe066] flex items-center gap-2">☀️ Solar Systems</h2>
            <button
              className="bg-[#ffe066] text-[#232946] px-3 py-1 rounded font-bold hover:bg-[#eebbc3] transition"
              onClick={() => { setEditType("solar"); setEditItem(null); }}
            >
              + Add
            </button>
          </div>
          <ul className="space-y-4">
            {solarSystems.map((solar) => (
              <li key={solar.id} className="flex items-center justify-between gap-2 bg-white/20 rounded-lg px-3 py-2">
                <span className="truncate">{solar.name}</span>
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:underline" onClick={() => { setEditType("solar"); setEditItem(solar); }}>Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete("solar", solar.id!)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}