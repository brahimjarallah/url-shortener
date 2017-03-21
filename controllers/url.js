const path = require('path');
const os = require('os');
const url = require('url');
const Url = require('../models/url');

module.exports.new = function(req, res) {
  const url = new Url({
    original: req.originalUrl.slice(5)
  });
  url.save(function(err, url) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        original_url: url.original,
        short_url: makeShortUrl(req, url._id)
      });
    }
  });
};

function makeShortUrl(req, id) {
  return url.format({
    protocol: req.protocol,
    host: req.get('Host'),
    pathname: String(id)
  });
}