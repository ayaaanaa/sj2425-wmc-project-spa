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
