const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const marked = require('marked');

const urlController = require('./controllers/url');

mongoose.connect(process.env.MONGODB_URI);

const app = express();
const readme = fs.readFileSync('./README.md').toString();
const index = marked(readme);

const newRoute = express.Router();

newRoute.route('/*')
  .get(urlController.new);

app.use('/new/*', newRoute);
app.use('/', (_, res) => res.send(index));

const port = process.env.PORT || 3750;
app.listen(port);
console.log('listening on ' + port);

exports = module.exports = app;

