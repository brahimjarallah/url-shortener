const path = require('path');
const os = require('os');
const Url = require('../models/url');

module.exports.new = function(req, res) {
  console.log(req.originalUrl);
  const url = req.params.url;
  const newUrl = new Url({
    original: url
  });
  newUrl.save(function(err, savedUrl) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        original_url: savedUrl.original,
        short_url: path.join(os.hostname(), savedUrl._id)
      });
    }
  });
};