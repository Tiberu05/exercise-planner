const router = require('express').Router();
let User = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const key = process.env.JWT_KEY;


// @route   POST /users
// @desc    Register new user
// @acces   Public
router.post('/add', (req, res) => {
    const { name, email, password } = req.body;

    // Simple Validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }


    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists'});
        
            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_KEY,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )

                            
                        })
                })
            })
        })

})


// @route   POST /users
// @desc    Register new user
// @acces   Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple Validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }


    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist'});
        
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid password'})
                
                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_KEY,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    emil: user.email
                                }
                            });
                        }
                    )
                })
            
        })
})

// @route   GET /user
// @desc    Get user data
// @acces   Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

// router.post('/add', (req, res) => {

//     const { username, email, password } = req.body;


//     const newUser = new User({
//         username,
//         email,
//         password,
//     });

//     newUser.save()
//         .then(() => res.json('User added'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.post('/login', (req, res) => {

//     const { username, password } = req.body;


//     User.findOne({ username })
//         .then(user => {
//             if (user.password === password) {
//                 res.json({ username: user.username, id: user._id, msg: "Logged In", okCredentials: true });
//             } else {
//                 res.json({ okCredentials: false });
//             }
//         })
//         .catch(err => console.log(err));
// });

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

