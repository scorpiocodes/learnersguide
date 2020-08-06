var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use('/public',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/contact");
var nameSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    message: String
});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/Contact.html');
});

app.post("/contact", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Sent Successfully");
        })
        .catch(err => {
            res.status(400).send("Unsuccessful");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});