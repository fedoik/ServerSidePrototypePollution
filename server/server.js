const express        = require('express');
const crypto         = require('crypto');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser')
const cors           = require('cors');
const app            = express();
require('./config/database');

const port = 8080;
app.use(express.json());
app.use(cookieParser());
app.use(cors());// разрешить все (плохо)

const db = require('better-sqlite3')('db.sqlite3');

require('./app/routes')(app,db,crypto);


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