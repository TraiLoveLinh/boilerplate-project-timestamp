// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  const D = new Date();
  unixTime = D.valueOf();
  utcTime = D.toUTCString();
  res.json({
    utc: utcTime,
    unix: unixTime
  });
});

app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  let D = new Date(date);
  unixTime = D.valueOf();
  utcTime = D.toUTCString();
  if (utcTime == "Invalid Date") {
    D = new Date(parseInt(date));
    unixTime = D.valueOf();
    utcTime = D.toUTCString();
  }
  if (utcTime == "Invalid Date") {
    res.json({
      error: "Invalid Date"
    });
  }
  else {
    res.json({
      unix: unixTime,
      utc: utcTime
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
