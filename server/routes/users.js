const router = require('express').Router();
let User = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const key = process.env.JWT_KEY;

router.post('/', (req, res) => {
    // const { username, email, password } = req.body;

    // if (!username || !email || !password) {
    //     return res.status(400).json({ msg: "Please enter all fields"});
    // }



})

router.post('/add', (req, res) => {

    const { username, email, password } = req.body;


    const newUser = new User({
        username,
        email,
        password,
    });

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login', (req, res) => {

    const { username, password } = req.body;


    User.findOne({ username })
        .then(user => {
            if (user.password === password) {
                res.json({ username: user.username, id: user._id, msg: "Logged In", okCredentials: true });
            } else {
                res.json({ okCredentials: false });
            }
        })
        .catch(err => console.log(err));
});

// router.get('/', (req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.post('/add', (req, res) => {
//     const username = req.body.username;

//     console.log(req.body);

//     const newuser = new User({username});

//     newuser.save()
//         .then(() => res.json('User added'))
//         .catch(err => res.status(400).json('Error: ' + err));

// })



module.exports = router;

