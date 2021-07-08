const bodyParser = require("body-parser");
const ejs = require("ejs");
const express = require("express");
const upload = require("express-fileupload");
const app = express();
const router = express.Router();
const path = require('path'); 
const fs = require('fs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(upload());


app.get("/", function (req, res) {
    res.render(__dirname + "/views/firstpage.ejs")
});

app.get("/teacher", function (req, res) {
    res.render(__dirname + "/views/teacher/teacherhome.ejs")
});
app.get("/teacherlogin", function (req, res) {
    res.render(__dirname + "/views/teacher/teacherlogin.ejs");
});
app.get("/teachersignup", function (req, res) {
    res.render(__dirname + "/views/teacher/teachersignup.ejs")
});
app.get("/teacherpage", function (req, res) {
    res.render(__dirname + "/views/teacher/teacherpage.ejs");
});

app.get("/student", function (req, res) {
    res.render(__dirname + "/views/student/studenthome.ejs")
});
app.get("/studentlogin", function (req, res) {
    res.render(__dirname + "/views/student/studentlogin.ejs");
});
app.get("/studentsignup", function (req, res) {
    res.render(__dirname + "/views/student/studentsignup.ejs")
});
app.get("/studentpage", function (req, res) {
    res.render(__dirname + "/views/student/studentpage.ejs");
});

app.post("/teacherpage", function (req, res) {
    if (req.files) {

        var file = req.files.file
        var filename = file.name

        file.mv('./course/' + filename, function (err) {
            if (err) {
                res.send(err)
            } else {
                res.sendFile(__dirname + "/goback.html")
            }
        })
    }
});

app.listen(port = 3000, function () {
    console.log("SERVER ON");
});