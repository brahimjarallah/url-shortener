const crypto = require('crypto');


function hash(url, length = 4) {
  const hash = crypto.createHash('sha256');

  hash.update(url);
  return hash.digest('hex');
}