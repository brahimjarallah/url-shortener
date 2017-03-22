const mongoose = require('mongoose');
const counter = require('./counter');

const UrlSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  original: {
    type: String,
    required: true
  }
});

UrlSchema.pre('save', function(next) {
  const newUrl = this;
  const options = {
    new: true,
    upsert: true,
  };
  counter.findByIdAndUpdate(
    {_id: 'counter'},
    {$inc: {value: 1}},
    options, 
    setUrlId
  );
  function setUrlId(err, count) {
    if (err) {
      return next(err);
    }
    newUrl._id = count.value;
    next();
  }
});

module.exports = mongoose.model('url', UrlSchema);