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

export async function GET(req, context) {
  const { id } = context.params;
  try {
    const db = await openDb();
    const planet = await db.get("SELECT * FROM planets WHERE id = ?", id);
    if (!planet) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(JSON.stringify(planet), { status: 200 });
  } catch (e) {
    return new Response("Server error", { status: 500 });
  }
}

export async function PUT(req, context) {
  const { id } = context.params;
  const data = await req.json();
  try {
    const db = await openDb();
    await db.run(
      `UPDATE planets SET name=?, type=?, diameter=?, mass=?, has_life=?, solar_system_id=?, picture=? WHERE id=?`,
      data.name, data.type, data.diameter, data.mass, data.has_life, data.solar_system_id, data.picture, id
    );
    return new Response("Updated", { status: 200 });
  } catch (e) {
    return new Response("Server error", { status: 500 });
  }
}

export async function DELETE(req, context) {
  const { id } = context.params;
  try {
    const db = await openDb();
    await db.run("DELETE FROM planets WHERE id = ?", id);
    return new Response("Deleted", { status: 200 });
  } catch (e) {
    return new Response("Server error", { status: 500 });
  }
}