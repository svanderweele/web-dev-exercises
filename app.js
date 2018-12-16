var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('newDb', ['users']);
var expressValidator = require('express-validator');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressValidator());

//Globals
app.use((req, res, next) => {
    res.locals.errors = null;
    next();
});

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));

let users = [];

// Routes
app.get('/', (req, res) => {
    db.users.find((err, docs) => {
        users = docs;
        res.render("index", {
            title: "Simon",
            users: docs,
        });
    });
});

app.post('/users/add', (req, res) => {

    req.checkBody('first_name', 'First name is missing!').notEmpty();
    req.checkBody('last_name', 'Last name is missing!').notEmpty();
    req.check('email', 'Email is missing!').notEmpty();

    if (req.body.email) {
        req.checkBody('email', 'Email entered not a valid email').isEmail();
    }

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            title: "Simon",
            users: users,
            errors: errors,
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        };

        db.users.insert(newUser, (error, result) => {
            if (error) {
                console.log(erÎror);
            }
            res.redirect('/');
        })
    }


});

app.delete('/users/delete/:id', (req, res) => {
    var id = mongojs.ObjectId(req.params.id);
    db.users.remove({
        _id: id
    }, (error, result) =>{
        if(error){
            console.log(error);
        }
    });
});

//--


app.listen(3000, (req, res) => {
    console.log("Server listening on 3000");
});