const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const port = 8080;
app.use(express.json());
// require('./app/routes')(app, {});

MongoClient.connect("mongodb://127.0.0.1:27017/SSPPtask", (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);
    app.listen(port, () => {
      console.log(`Listening on ${port} port ...`);
    });               
  })
  
// app.listen(port, () => {
//   console.log("start")
// });