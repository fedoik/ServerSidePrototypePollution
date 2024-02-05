module.exports = function(app, db) {
    // app.post('/notes', (req, res) => {
    //     const note = { text: req.body.body, title: req.body.title };
    //     db.collection('notes').insert(note, (err, result) => {
    //       if (err) { 
    //         res.send({ 'error': 'An error has occurred' }); 
    //       } else {
    //         res.send(result.ops[0]);
    //       }
    //     });
    // });
    
    app.post('/note/create', (req, res) => {
      const note = { title: req.body.title, body: req.body.body };
      const stmt = db.prepare("INSERT INTO notes (note) VALUES (?)");
      try {
        const info = stmt.run(JSON.stringify(note))
        res.send({"NoteId":info.lastInsertRowid})
      } catch (e) {
        res.send({"Error": "sqlite error"})
      }
    })
}