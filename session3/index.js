const express = require("express");
const app = express();

app.use("/gol", express.static("../Game of Live"))

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

 app.get("/google", function(req, res){
     res.redirect("http://google.com")
 })

 app.get("/google/:search", function(req, res){
     let search = req.params.search;
     res.redirect("http://google.com/search?q=" + search)
 }) 
 app.get("/*", function(req, res){
     res.status(404).send("404 not found")
 })

