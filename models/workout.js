const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSch = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [
        {
            name: {
                type: String,
                trim: true,
                required: "Exercise name"
            },
            type: {
                type: String,
                trim: true,
                required: "Exercise type"
            },
            duration: {
                type: Number,
                required: "Exercise duration"
            },
            distance: {
                type: Number
            },
            weight: {
                type: Number
            },
            sets: {
                type: Number
            },
            reps: {
                type: Number
            }
        }
    ]
});
const Workout = mongoose.model("workout", workoutSch);
module.exports = Workout;