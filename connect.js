const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(
  "./space.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error('Error opening database:', err.message);
    }
    console.log('Connected to the SQLite database.');
  }
);

db.serialize(() => {
  // Drop tables if they exist
  db.run("DROP TABLE IF EXISTS planets");
  db.run("DROP TABLE IF EXISTS solar_systems");
  db.run("DROP TABLE IF EXISTS nebulae");

  db.run(`
    CREATE TABLE IF NOT EXISTS nebulae (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT,
      distance_from_earth REAL,
      size REAL,
      picture TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS solar_systems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age REAL,
      star_type TEXT,
      distance_from_earth REAL,
      picture TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS planets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT,
      diameter REAL,
      mass REAL,
      has_life INTEGER,
      solar_system_id INTEGER NOT NULL,
      picture TEXT,
      FOREIGN KEY (solar_system_id) REFERENCES solar_systems(id) ON DELETE CASCADE
    )
  `);

  // Sample data for solar systems
  db.run(`
    INSERT INTO solar_systems (name, age, star_type, distance_from_earth, picture)
    VALUES 
      ('Solar System', 4.6, 'G-type', 0.0, 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Solar_sys8.jpg'),
      ('Alpha Centauri System', 5.0, 'G-type', 4.37, 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Alpha_Centauri.jpg'),
      ('TRAPPIST-1 System', 7.6, 'M-type', 39.6, 'https://upload.wikimedia.org/wikipedia/commons/8/89/PIA21423_-_TRAPPIST-1_Exoplanet_Lineup_-_20170222.jpg'),
      ('Kepler-186 System', 4.0, 'M-type', 492, 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Kepler-186_and_its_planetary_system.jpg'),
      ('Gliese 581 System', 8.0, 'M-type', 20.3, 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Gliese_581_system.jpg')
  `);

  // Sample data for planets
  db.run(`
    INSERT INTO planets (name, type, diameter, mass, has_life, solar_system_id, picture)
    VALUES 
      ('Earth', 'Terrestrial', 12742, 1, 1, 1, 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg'),
      ('Mars', 'Terrestrial', 6779, 0.107, 0, 1, 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg'),
      ('Proxima b', 'Terrestrial', 11400, 1.27, 0, 2, 'https://upload.wikimedia.org/wikipedia/commons/4/44/Artist%E2%80%99s_impression_of_the_planet_Proxima_Centauri_b.jpg'),
      ('TRAPPIST-1e', 'Terrestrial', 11600, 0.62, 0, 3, 'https://upload.wikimedia.org/wikipedia/commons/6/6b/PIA21424_-_TRAPPIST-1e_%28artist_concept%29.jpg'),
      ('TRAPPIST-1f', 'Terrestrial', 11400, 0.68, 0, 3, 'https://upload.wikimedia.org/wikipedia/commons/7/7f/PIA21425_-_TRAPPIST-1f_%28artist_concept%29.jpg'),
      ('Kepler-186f', 'Terrestrial', 13700, 1.4, 0, 4, 'https://upload.wikimedia.org/wikipedia/commons/2/26/Kepler-186f_-_Artist_Concept.jpg'),
      ('Gliese_581g', 'Super-Earth', 14500, 1.5, 0, 5, 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Gliese_581_g_artist%27s_conception.jpg')
  `);

  // Sample data for nebulae
  db.run(`
    INSERT INTO nebulae (name, type, distance_from_earth, size, picture)
    VALUES 
      ('Orion Nebula', 'Diffuse', 1344, 24, 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg'),
      ('Crab Nebula', 'Supernova Remnant', 6500, 11, 'https://upload.wikimedia.org/wikipedia/commons/0/00/Crab_Nebula.jpg'),
      ('Helix Nebula', 'Planetary', 655, 2.5, 'https://upload.wikimedia.org/wikipedia/commons/f/f2/NGC7293_%28ESO%29.jpg'),
      ('Carina Nebula', 'Diffuse', 7500, 230, 'https://upload.wikimedia.org/wikipedia/commons/a/a3/NGC_3372.jpg')
  `);

  console.log('Tables created with picture URLs added!');
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});
