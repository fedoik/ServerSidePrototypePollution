const db = require('better-sqlite3')('db.sqlite3');
// const Database = require('better-sqlite3');
// const db = new Database('database.db', { verbose: console.log });
db.exec(`DROP TABLE IF EXISTS notes;`);
db.exec(`DROP TABLE IF EXISTS note_config;`);
db.exec(`CREATE TABLE notes(
        id INTEGER PRIMARY KEY,
        uuid TEXT,
        note TEXT
    );
    CREATE TABLE note_config(
        id INTEGER PRIMARY KEY,
        isAdmin INTEGER DEFAULT 0,
        note_uuid INTEGER
    );`);

module.exports = { 
    db: db   
}