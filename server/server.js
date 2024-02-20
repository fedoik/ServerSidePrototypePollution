const express        = require('express');
const crypto         = require('crypto');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser')
const cors           = require('cors');
const session        = require('express-session');
const app            = express();
require('./config/database');

const port = 50000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
      origin: ['http://localhost:5173','https://localhost:5173'],
      credentials: true,
      exposedHeaders: ['set-cookie']
}));

const db = require('better-sqlite3')('db.sqlite3');

require('./app/routes')(app,db,crypto);


app.listen(port, () => {
      console.log(`Listening on ${port} port ...`);
});