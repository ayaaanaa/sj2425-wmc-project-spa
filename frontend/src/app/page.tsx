import { PlanetList, Planet } from "./components/Planet-List";
import { NebulaeList, Nebula } from "./components/Nebulae-List";
import { SolarSystemList, SolarSystem } from "./components/Solar-List";

export default async function Home() {
  // Fetch all data from your API routes (server component)
  const [planetsRes, nebulaeRes, solarSystemsRes] = await Promise.all([
    fetch("http://localhost:3000/api/planets", { cache: "no-store" }),
    fetch("http://localhost:3000/api/nebulae", { cache: "no-store" }),
    fetch("http://localhost:3000/api/solar-systems", { cache: "no-store" }),
  ]);

  const planets: Planet[] = await planetsRes.json();
  const nebulae: Nebula[] = await nebulaeRes.json();
  const solarSystems: SolarSystem[] = await solarSystemsRes.json();

  return (
    <main className="min-h-screen p-8 pb-20 flex flex-col items-center gap-12">
      <h1 className="text-5xl font-extrabold text-center text-[#eebbc3] drop-shadow-lg mb-6 flex items-center gap-4">
        Find out more about <span className="text-[#ffe066]">space</span>!
      </h1>
      <section
        className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-[#eebbc3]/30 p-8 mb-4"
        style={{ boxShadow: "0 8px 32px 0 #23294655" }}
      >
        <h2 className="text-3xl font-bold text-[#eebbc3] mb-4 flex items-center gap-2">
          🪐 Planets
        </h2>
        <PlanetList planets={planets} />
      </section>
      <section
        className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-[#b8c1ec]/30 p-8 mb-4"
        style={{ boxShadow: "0 8px 32px 0 #393e6e55" }}
      >
        <h2 className="text-3xl font-bold text-[#b8c1ec] mb-4 flex items-center gap-2">
          🌌 Nebulae
        </h2>
        <NebulaeList nebulae={nebulae} />
      </section>
      <section
        className="w-full max-w-6xl bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-[#ffe066]/30 p-8"
        style={{ boxShadow: "0 8px 32px 0 #ffe06655" }}
      >
        <h2 className="text-3xl font-bold text-[#ffe066] mb-4 flex items-center gap-2">
          ☀️ Solar Systems
        </h2>
        <SolarSystemList solarSystems={solarSystems} />
      </section>
    </main>
  );
}