const express = require("express");
const bodyParser = require("body-parser");

const database = require("./utils/database");
const dustbinRouter = require("./api/routes/dustbin");

const app = express();
app.use(bodyParser.json());
app.get("/", (req, res)=>{
    res.send("<h1>Hello Smart Dustbin</h1>");
});
app.use("/api", dustbinRouter(database));

module.exports = app;