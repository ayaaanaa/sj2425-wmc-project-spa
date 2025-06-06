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
    const nebulae = await db.all("SELECT * FROM nebulae");
    return new Response(
      JSON.stringify(nebulae),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching nebulae:", error);
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
      `INSERT INTO nebulae (name, type, distance_from_earth, size, picture) VALUES (?, ?, ?, ?, ?)`,
      data.name, data.type, data.distance_from_earth, data.size, data.picture
    );
    return new Response(JSON.stringify({ id: result.lastID }), { status: 201 });
  } catch (e) {
    return new Response("Server error", { status: 500 });
  }
}
