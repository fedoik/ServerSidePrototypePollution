const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post('/send', (req, res) => {
    const UserConfig = {}
    if (req.ip === "127.0.0.1" || req.ip === "::ffff:127.0.0.1" || req.ip === "::1") {
        UserConfig.isAdmin = true;
        res.send(UserConfig)
    }


    if (user.isAdmin == true){
        res.send("You are admin!")
    } else {
        res.send("Access denied")
    }

})

const config = {
    }
const users = {
    "guest": {name: "guest"},
    }

function updateUser(username, prop, value){
    users[username][prop] = value
    }
    
app.get("/update", (req,res) => {
    const {name, prop, value} = req.query
    updateUser(name, prop, value)
    res.send({"status":"Success"})
    })
    
app.get("/eval", (req,res) => {
    const {code} = req.query
    if (!config.allowEval){
        return res.status(403).json({"status":"Forbidden"})
    }
    eval(code)
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
