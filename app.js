const express = require("express");
const app = express();

app.listen(process.env.PORT || 5000, () =>console.log("Running..."));
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => res.send("Node JS"));

let users = [
    {id: 1, name: "kalab", password: "334"},
    {id: 2, name: "romdul", password: "334"},
    {id: 3, name: "bopha", password: "334"},
]

app.get("/api/users", (req, res) => res.send(users));

// GET: View

app.get("/api/users/:id", (req, res) => {
    let id = req.params.id;
    // FindIndex()
    let index = users.findIndex(user => user.id === parseInt(id));
    if (index >= 0) {
        let user = users[index]
        res.send([user]);
    } else {
        res.status(404)
        res.send({error: "User id not found"})
    }
   
});

// POST: Create

app.post("/api/users", (req, res) => {
    if(!req.body.password){
        res.status(404);
        return res.send({error : "Password Required"})
    }
    let user = {
        id: users.length + 1,
        name: req.body.name,
        password: req.body.password
    }
    users.push(user);
    res.send(users)
})

// PUT: Update

app.put("/api/users/:id", (req, res) => {
    let id = req.params.id;
    let username = req.body.name;
    let pass = req.body.password;
    let index = users.findIndex(user => user.id === parseInt(id));
    if (index >= 0) {
        let user = users[index]
        user.name = username;
        user.password = pass;
        res.send(user);
    } else {
        res.status(404)
        res.send({error: "User id not found"})
    }
});

// Delete
app.delete("/api/users/:id", (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));
    if (index >= 0) {
        users.splice(index, 1);
        res.send({message: "Successfully deleted"});
    } else {
        res.status(404)
        res.send({error: "User id not found"})
    }
});