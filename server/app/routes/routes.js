module.exports = function(app, db,crypto) {
    app.get('/api/', (req,res) => {

      /*Set session for all users*/ 
      
      let options = {
        maxAge: 1000*60*720,
        httpOnly: true,
      }
      res.cookie('session', crypto.randomBytes(32).toString('base64'), options)
      res.send({"Status":"Cookies was set"})
    });

    app.post('/api/note/create', (req, res) => {

      /*Create note*/

      const note = { title: req.body.title, body: req.body.body };
      const session = req.cookies.session
      const uuid = crypto.randomUUID()
      const config = {"isAdmin":0}
      const stmt = db.prepare("INSERT INTO notes (note, uuid, createBy, config) VALUES (?, ?, ?, ?)");
      try {
        const info = stmt.run(JSON.stringify(note), uuid, session, JSON.stringify(config));
        res.send(db.prepare("SELECT uuid FROM notes WHERE id = ?").get(info.lastInsertRowid));
      } catch (e) {
        console.log(e)
        res.send({"Error": "sqlite error"});
      }
    });

    app.get('/api/notes', (req,res)=>{

      /* Get all notes by user*/
      
      // if (req.cookies.session === undefined) {
      //   res.send({"error":"Not auth"})
      // }
      try{
        const Notes = db.prepare("SELECT * FROM notes WHERE createBy = ?").all("s")//.all(req.cookies.session);
        res.send({...{"notes":Notes},...{"error":"null"}})
      } catch(e) {
        res.send({...{"notes":[]},...{"error":"sql error"}})
      }

    });

    app.get('/api/note/:uuid', (req, res) => {

      /* Get note by uuid */

      const {uuid} = req.params
      try {
        const Note = db.prepare("SELECT * FROM notes WHERE uuid = ?").all(uuid);
        if (req.cookies.session === note.createBy) {
          res.send({"id":Note.id, "note":JSON.parse(Note.note)})
        }
        res.send({"Error":"You dont have permissions for this action"});
      } catch(e) {
        console.log(e)
        res.send({"Error": "sqlite error"});
      }
    });

    app.get('/api/note/:uuid/update', (req, res) => {

      /* Update note by uuid */

      const {uuid} = req.params
      const {prop, value} = req.query // title or body potential

      const config = {}
      const notes = {}

      const stmt = db.prepare("SELECT * FROM notes")
      for (const noteObj of stmt.iterate()) {
        notes[noteObj.uuid] = {...JSON.parse(noteObj.note), ...{"createBy":noteObj.createBy}};
      }

      //подумать над этим
      // if (notes[uuid]["createBy"] != req.cookies.session) {
      //   res.send({"Error":"You dont have permissions for this action"})
      // }
      
      const Config = JSON.parse(db.prepare("SELECT config FROM notes WHERE uuid = ?").get(uuid).config) ?? {"isAdmin": 0};

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