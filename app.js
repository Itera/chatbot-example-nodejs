var express = require('express');
var path = require('path');

// Web app
var app = express();

// Register Bot
var bot = require('./bot');
app.post('/api/messages', bot.listen());

// Start listening
var port = process.env.port || process.env.PORT || 3978;
app.listen(port, function () {
  console.log('Web Server listening on port %s', port);
});