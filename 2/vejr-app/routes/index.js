var express = require('express');
var path = require('path');
var router = express.Router();

/* GET index route */
app.get('/vejr', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = router;