const Workout = require('../models/workout');

module.exports = app => {

// Create a new workout
app.post('/api/workouts', (req, res) => {
    Workout.create({})
    .then(workoutDB => {
        console.log(workoutDB);
        res.json(workoutDB);
    })
    .catch(err => {
        console.log(err)
        res.json(err);
    });
});

// Update existing workout
app.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercise: req.body } },
        { new: true, runValidators: true }
    )
    .then(workoutDB => {
        res.json(workoutDB)
    })
    .catch(err => {
        res.json(err);
    });
});

// get all workouts, add exercise duration
app.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercise.duration',
                },
            },
        },
    ])
    .then(workoutDB => {
        res.json(workoutDB);
    })
    .catch(err => {
        res.json(err);
    });
});

app.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercise.duration',
                },
            },
        },
    ])
    .sort({ _id: -1 })
    .limit(7)
    .then(workoutDB => {
        console.log(workoutDB);
        res.json(workoutDB);
    })
    .catch(err => {
        res.json(err);
    });
});

app.delete('/api/workouts', ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch(err => {
        res.json(err);
    });
});
}
