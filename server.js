const bodyParser = require("body-parser");
const ejs = require("ejs");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.listen(port = 3000, function () {
    console.log("SERVER ON");
});

app.get("/",function(req,res){
    res.render(__dirname + "/views/home.ejs")
});

app.get("/mainpage", function (req, res) {
    res.render(__dirname + "/public/mainpage.ejs");
});

app.get("/login", function (req, res) {
    res.render(__dirname + "/views/login.ejs");
});

app.get("/signup", function(req,res){
    res.render(__dirname + "/views/signup.ejs")
});