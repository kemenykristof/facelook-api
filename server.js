const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Jane',
            email: 'Jane@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'

        }]
};

app.get('/', (req, res) => {
    res.send(database.users);
});

app.get('/profile/:userId', (req, res) => {
    database.users.forEach(user => {
        if (user.id === req.params.userId) {
            return res.json(user);
        }
    });
    if (!found) {
        res.status(400).json('not found');
    }

});


app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in')
    }
});


app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '123',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);

});

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json('not found');
    }
});


app.listen(3000, () => {
    console.log('app is running on port 3000')

});