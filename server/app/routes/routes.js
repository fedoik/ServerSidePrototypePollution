module.exports = function(app, db) {
    app.post('/note/create', (req, res) => {
      const note = { title: req.body.title, body: req.body.body };
      const uuid = crypto.randomUUID()
      const stmt = db.prepare("INSERT INTO notes (note, uuid) VALUES (?, ?)");
      try {
        const info = stmt.run(JSON.stringify(note), uuid);
        db.prepare("INSERT INTO note_config (note_uuid) VALUES (?)").run(uuid)
        res.send(db.prepare("SELECT uuid FROM notes WHERE id = ?").get(info.lastInsertRowid));
      } catch (e) {
        res.send({"Error": "sqlite error"});
      }
    });

    app.get('/note/:uuid', (req, res) => {
      const {uuid} = req.params

      // const note = {}
      // const config = {}

      try {
        const Note = db.prepare("SELECT * FROM notes WHERE uuid = ?").get(uuid);
        // const Config = db.prepare("SELECT * FROM note_config WHERE uuid = ?").get(uuid)

        // note = JSON.parse(Note.note);
        // if (Config[isAdmin] != 0) {
        //   config["isAdmin"] = true;
        // }

        res.send({"id":Note.id, "note":JSON.parse(Note.note)})
      } catch(e) {
        console.log(e)
        res.send({"Error": "sqlite error"});
      }
    });

    app.get('/note/:uuid/update', (req, res) => {
      const {uuid} = req.params
      const {prop, value} = req.query // title or body potential

      config = {}
      notes = {}

      const stmt = db.prepare("SELECT * FROM notes")
      for (const noteObj of stmt.iterate()) {
        //notes[noteObj.uuid] = notes[noteObj.uuid] || {};
        notes[noteObj.uuid] = JSON.parse(noteObj.note);
      }
       
      const Config = db.prepare("SELECT * FROM note_config WHERE note_uuid = ?").get(uuid) ?? {"isAdmin": 0};

      if (Config["isAdmin"] != 0) {
        config["isAdmin"] = true;
      }

      const updateNote = (uuid,prop,value) => {
        notes[uuid][prop] = value
      }
      
      if (prop !== undefined && value !== undefined ) {
        updateNote(uuid, prop, value)
      }

      // res.send(notes)

      if (!config.isAdmin){
        res.send({
          "Status":"403 forbidden",
          "Descritpion":"only admins notes can be edditable"
        });
      }
      res.send({
        "Flag":"test{flag}"
      });
    });
}