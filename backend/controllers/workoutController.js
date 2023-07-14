const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No Such workout' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: 'No such a workout' });
  }

  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No Such workout' });
  }

  const deletedWorkout = await Workout.findByIdAndDelete({ _id: id });

  if (!deletedWorkout) {
    return res.status(404).json({ error: 'No such a workout' });
  }

  res.status(200).json(deletedWorkout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No Such workout' });
  }

  const updatedWorkout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!updatedWorkout) {
    return res.status(404).json({ error: 'No such a workout' });
  }

  res.status(200).json(updatedWorkout);
};

module.exports = {
  deleteWorkout,
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
};
