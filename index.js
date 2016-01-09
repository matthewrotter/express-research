var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  console.log('outer start');

  setTimeout(function () {
    console.log('otimer');
    res.end();
  }, 7500);
  return;

  request({
    method: 'GET',
    url: 'http://localhost:3000/inner'
  }, function(err, status, response) {
    console.log('inner finish', err, status.statusCode, response);
    if (err) {
      console.error('error', err);
    }

    res.end('finished');
  });

});

router.get('/inner', function(req, res, next) {
  console.log('inner start');
  var interval = setInterval(function () {
    console.log('timer');
  }, 1000);

  req.close();

  setTimeout(function() {
    clearInterval(interval);
    res.end('OK');
  }, 10000);
});

app.use(function(err, req, res, next) {
  console.error('error handler!');

  res.status(500).end('errorhandler');
})

app.use(router);

app.listen(3000, function() {
  console.log('app started');
});
