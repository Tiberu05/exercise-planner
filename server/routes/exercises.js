const router = require('express').Router();
let Exercise = require('../models/exercise.model');
let User = require('../models/user.model');

router.get('/:username', (req, res) => {

    const username = req.params.username;


    Exercise.find({ username })
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {

    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
        checked: false
    });

    newExercise.save()
        .then(() => res.json('Exercise added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/find/:id', (req, res) => {
    console.log(req.params.id);
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);
            exercise.checked = req.body.checked;

            exercise.save()
                .then(() => res.json('Exercise uodated'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

