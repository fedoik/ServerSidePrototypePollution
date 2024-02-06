const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
const crypto = require('crypto');
const bodyParser     = require('body-parser');
require('./config/database');
const app            = express();
const port = 8080;
app.use(express.json());

const db = require('better-sqlite3')('db.sqlite3');

require('./app/routes')(app,db);


app.listen(port, () => {
      console.log(`Listening on ${port} port ...`);
});



// require('./app/routes')(app, {});

// MongoClient.connect(db.url, (err, database) => {
//     if (err) return console.log(err)
//     require('./app/routes')(app, database);
//     app.listen(port, () => {
//       console.log(`Listening on ${port} port ...`);
//     });               
//   })
  
// app.listen(port, () => {
//   console.log("start")
// });