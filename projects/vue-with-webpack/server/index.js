var express = require('express');
var path = require('path');
var app = express();
var mongoJs = require('mongojs');
var bodyParser = require('body-parser')

var db = mongoJs('user-manager-example-db', ['users']);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.listen(8081, (req, res) => {
    console.log("Server listening 8081..")

});


app.post('/users/add/', (req, response) => {
    let newUsers = req.body.data.newUsers;

    newUsers.forEach(user => {
        db.users.insert(user);
    })
});

app.get('/users/get', (req, response) => {
    db.users.find((err, docs) => {
        response.json(docs);
    });
});