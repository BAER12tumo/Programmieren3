const express = require("express");
const app = express();


app.get("/", function(req, res){
    res.send("<h2>Meine Überschrift</h2>");
});

app.listen(3000, function(){
    console.log("Mein Server läuft auf Port 3000")
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
 });