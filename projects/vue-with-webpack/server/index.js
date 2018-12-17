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
        db.users.insert({
            _id: mongoJs.ObjectId(user._id),
            ...user,
        });

    });
});

app.get('/users/get', (req, response) => {
    db.users.find((err, docs) => {
        response.json(docs);
    });
});

app.get('/users/get/:id', (req, response) => {

    if (req.params.id == "0") {
        response.json(null);
        return;
    }

    db.users.find({
        _id: mongoJs.ObjectId(req.params.id)
    }, (err, docs) => {
        var user = null;

        if (docs.length == 1) {

            if (docs[0].user != null) {
                user = { ...docs[0].user
                };
                user._id = docs[0]._id;
            } else {
                user = docs[0];
            }
        }

        response.json(user);
    });
});

app.post('/users/delete/:id', (req, response) => {
    db.users.remove({
        _id: mongoJs.ObjectId(req.params.id)
    }, (err, docs) => {
        if (err) {
            response.send(err);
        } else {
            response.send({
                message: "Deleted user " + req.params.id
            });
        }
    });
});



app.post('/users/save', (req, response) => {
    let user = req.body.data.user;
    if (user._id == "0") {
        delete user._id;
        db.users.insert(
            user, (err, doc) => {
                response.send({
                    message: "User created!",
                    createdNew: true,
                    user: doc,
                })

            }
        );

    } else {

        user._id = mongoJs.ObjectId(user._id);
        db.users.save(
            user
        );
        response.send({
            message: "User saved!"
        })
    }

});