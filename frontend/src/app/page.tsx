import PlanetCard, { Planet } from "./components/PlanetCard";
import NebulaeCard, { Nebula } from "./components/NebulaeCard";
import SolarSystemCard, { SolarSystem } from "./components/SolarSystemCard";
import Link from "next/link";

export default async function Home() {
  // Fetch all data from your API routes (server component)
  const [planetsRes, nebulaeRes, solarSystemsRes] = await Promise.all([
    fetch("http://localhost:3000/api/planets", { cache: "no-store" }),
    fetch("http://localhost:3000/api/nebulae", { cache: "no-store" }),
    fetch("http://localhost:3000/api/solder-systems", { cache: "no-store" }),
  ]);

  const planets: Planet[] = await planetsRes.json();
  const nebulae: Nebula[] = await nebulaeRes.json();
  const solarSystems: SolarSystem[] = await solarSystemsRes.json();

return (
    <div className="min-h-screen p-8 pb-20 flex flex-col items-center gap-12 bg-[#16161a]">
      <section>
        <h2 className="text-2xl text-[#eebbc3] mb-2">Planets</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {planets.map((planet) => (
            <Link key={planet.id || planet.name} href={`/about_planet/${planet.id}`} className="block">
              <PlanetCard planet={planet} />
            </Link>
        ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl text-[#b8c1ec] mb-2">Nebulae</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {nebulae.map((nebula) => (
            <Link key={nebula.id || nebula.name} href={`/about_nebula/${nebula.id}`} className="block"> 
              <NebulaeCard nebula={nebula} />
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl text-[#ffe066] mb-2">Solar Systems</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {solarSystems.map((ss) => (
            <Link key={ss.id || ss.name} href={`/about_solarsystem/${ss.id}`} className="block">
              <SolarSystemCard solarSystem={ss} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}