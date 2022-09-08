const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc Get Goals
// @route GET /api/goals
//@access PRIVATE
const getGoals = asyncHandler (async (req, res) => {
  const goals = await Goal.find()

  res.status(200).json(goals)
})

// @desc Set Goal
// @route POST /api/goals
//@access PRIVATE
const setGoal = asyncHandler (async (req, res) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
  })

  res.status(200).json(goal)
})
// @desc UPDATE Goals
// @route PUT /api/goals/:id
//@access PRIVATE
const updateGoal = asyncHandler( async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal){
    res.status(400)
    throw new Error('Goal not found')
  }

  // new option if id does not exist create new goal
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedGoal)
})
// @desc Delete Goal
// @route DELETE /api/goals/:id
//@access PRIVATE
const deleteGoal = asyncHandler( async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if(!goal){
    res.status(400)
    throw new Error('Goal not found')
  }

  await goal.remove()


  res.status(200).json({ id: req.params.id})
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal
}