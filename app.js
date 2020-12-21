

const express = require("express");
const ejs = require("ejs");
const fs = require("fs");

const spawn = require("child_process").spawn;
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("images"));
// app.use(express.static("output"));
app.set("view engine", "ejs");

const upload = multer({ dest: __dirname + '/images/input' });

app.get("/", (req, res) => {
    res.render("home", { input_src: "/upload.jpg", output_src: "/placeholder.jpg" });
    // res.send("index.html")
});

app.post('/upload', upload.single('input-photo'), (req, res) => {
    if (req.file) {
        // console.log(req.file);

        var model = spawn('python', ["model.py", req.file.filename]);
        var result;
        model.stdout.on('data', function (data) {
            result = data.toString();
            // console.log(result);
        });

        model.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);

            if (result == 1) {
                res.render("home", { input_src: "/input/" + req.file.filename, output_src: "/output/" + req.file.filename + ".png" });
            }
            else {
                res.send("Error");
            }

            // res.render("home", { src: "images/" + req.file.filename });
        });


    }

    else {
        res.send('404')
    }
});



app.listen(process.env.PORT || 4000, function () {
    console.log("Server started at port 4000  !!!");
});