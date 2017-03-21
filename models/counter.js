const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 1001
  }
});

module.exports = mongoose.model('counter', CounterSchema);