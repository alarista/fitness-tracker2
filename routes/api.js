const router = require('express').Router();
const Workout = require('../models/workout.js');

router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body).then((workoutInfo) => {
        res.json(workoutInfo);
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } }
    ).then((workoutInfo) => {
        res.json(workoutInfo);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ]).then((workoutInfo) => {
        res.json(workoutInfo);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then((workoutInfo) => {
            res.json(workoutInfo);
        }).catch((err) => {
            res.json(err);
        });
});




module.exports = router;