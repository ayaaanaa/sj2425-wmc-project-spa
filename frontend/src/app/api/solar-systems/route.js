import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

let db = null;
async function openDb() {
  if (!db) {
    db = await open({
      filename: path.resolve(process.cwd(), "space.db"),
      driver: sqlite3.Database,
    });
  }
  return db;
}

export async function GET(req) {
  try {
    const db = await openDb();
    const systems = await db.all("SELECT * FROM solar_systems");
    return new Response(
      JSON.stringify(systems),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching solar systems:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req) {
  const data = await req.json();
  try {
    const db = await openDb();
    const result = await db.run(
      `INSERT INTO solar_systems (name, age, star_type, distance_from_earth, picture) VALUES (?, ?, ?, ?, ?)`,
      data.name, data.age, data.star_type, data.distance_from_earth, data.picture
    );
    return new Response(JSON.stringify({ id: result.lastID }), { status: 201 });
  } catch (error) {
    console.error("Error adding solar system:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
