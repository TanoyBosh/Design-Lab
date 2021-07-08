const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const express = require("express");
const multer = require('multer');
const path = require('path');


var fileSchema = new mongoose.Schema({
    filepath: String
})

var fileModel = mongoose.model('filedemo', fileSchema);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
})

var app = express();

mongoose.connect('mongodb://localhost:27017/video', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected')).catch(err => console.log('error ocured', err));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

var pathh = path.resolve(__dirname, 'public');
app.use(express.static(pathh));
app.use(bodyParser.urlencoded({
    extended: false
}));

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

app.get("/student", function (req, res) {
    res.render(__dirname + "/views/student/studenthome.ejs")
});
app.get("/studentlogin", function (req, res) {
    res.render(__dirname + "/views/student/studentlogin.ejs");
});
app.get("/studentsignup", function (req, res) {
    res.render(__dirname + "/views/student/studentsignup.ejs")
});

app.get('/studentpage', (req, res) => {
    fileModel.find((err, data) => {
        if (err) {
            console.log(err)
        } else if (data.length > 0) {
            res.render(__dirname + "/views/student/studentpage.ejs", {
                data: data
            })
        } else {
            res.render(__dirname + "/views/student/studentpage.ejs", {
                data: {}
            })
        }
    })
});
app.get('/teacherpage', (req, res) => {
    fileModel.find((err, data) => {
        if (err) {
            console.log(err)
        } else if (data.length > 0) {
            res.render(__dirname + "/views/teacher/teacherpage.ejs", {
                data: data
            })
        } else {
            res.render(__dirname + "/views/teacher/teacherpage.ejs", {
                data: {}
            })
        }
    })
});
app.post('/studentpage', upload.single('file'), (req, res) => {
    var x = 'uploads/' + req.file.originalname;
    var temp = new fileModel({
        filepath: x
    })
    temp.save((err, data) => {
        if (err) {
            console.log(err)
        }
        res.sendFile(__dirname + "/goback.html")
    })
});
app.get('/download/:id', (req, res) => {
    fileModel.find({
        _id: req.params.id
    }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            var x = __dirname + '/public/' + data[0].filepath;
            res.download(x)
        }
    })
});

app.listen(port = 3000, function () {
    console.log("Server On");
});