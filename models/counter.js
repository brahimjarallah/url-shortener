const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 1000
  }
});

const Counter = mongoose.model('counter', CounterSchema);

// Seed counter to start at 1000

Counter.update(
  {_id: 'counter'}, 
  {}, 
  {upsert: true, setDefaultsOnInsert: true}, 
  function(err) {
    if (err) {
      console.error(err);
    }
  }
);

module.exports = Counter;