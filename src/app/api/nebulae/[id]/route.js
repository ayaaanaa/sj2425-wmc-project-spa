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
    const nebula = await db.get("SELECT * FROM nebulae WHERE id = ?", id);
    if (!nebula) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(JSON.stringify(nebula), { status: 200 });
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
      `UPDATE nebulae SET name=?, type=?, distance_from_earth=?, size=?, picture=? WHERE id=?`,
      data.name, data.type, data.distance_from_earth, data.size, data.picture, id
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
    await db.run("DELETE FROM nebulae WHERE id = ?", id);
    return new Response("Deleted", { status: 200 });
  } catch (e) {
    return new Response("Server error", { status: 500 });
  }
}