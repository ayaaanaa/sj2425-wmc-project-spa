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

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const db = await openDb();
    const system = await db.get("SELECT * FROM solar_systems WHERE id = ?", id);
    if (!system) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(JSON.stringify(system), { status: 200 });
  } catch (e) {
    return new Response("Server error", { status: 500 });
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
  } catch (e) {
    return new Response("Server error", { status: 500 });
  }
}