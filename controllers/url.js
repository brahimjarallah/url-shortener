const path = require('path');
const os = require('os');
const url = require('url');
const Url = require('../models/url');

// From: http://stackoverflow.com/questions/161738
const URL_PATTERN = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

module.exports.new = function(req, res) {
  if (!req.originalUrl) {
    return res.redirect('/');
  }
  const rawUrl = req.originalUrl.slice(5);
  if (!validate(rawUrl)) {
    return res.json({
      error: 'Wrong url format, make sure you have a valid protocol and real site.'
    });
  }
  const url = new Url({
    original: rawUrl
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
      if (err || data.length === 0) {
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

function validate(potentialUrl) {
  return potentialUrl.match(URL_PATTERN);
}