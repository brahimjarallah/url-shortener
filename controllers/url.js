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

module.exports.redirect = function(req, res, next) {
  if (!req.params.id) {
    return res.redirect('/');
  }
  Url.find(
    {_id: req.params.id},
    function(err, data) {
      if (err) {
        return res.json({
          error: 'No short url found for given input'
        });

      } else {
        const url = data[0];
        res.redirect(301, url.original);
      }
    }
  );
}

function makeShortUrl(req, id) {
  return url.format({
    protocol: req.protocol,
    host: req.get('Host'),
    pathname: String(id)
  });
}