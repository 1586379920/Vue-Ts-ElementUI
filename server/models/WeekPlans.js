const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  finish: { type: Boolean },
  start: { type: String },
  end: { type: String },
  importance: { type: Number },
  plan: { type: String },
})

module.exports = mongoose.model('WeekPlans', schema);