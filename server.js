var express = require('express');
var app = express();
var moment = require('moment');
var cat = require('cat-me');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:sequence", function (request, response) {
  // ok here it goes: take a string or a number and return it's unix date and it's natural date. If the string is not a natural calendar date, return unix: null, and natural: null.
let inputDate = request.params.sequence;
let unixDate;
let natural;
// the result will be { "unix": unixDate, "natural": natural } if unixDate and natural date are valid
// the reult will be { "unix": null, "natural": null } if the unix date and natural date are not valid
function isSeconds() {
  if (Number(inputDate)) {
    unixDate = moment.unix(inputDate);
    natural = moment(unixDate).format('MMMM D, YYYY');
    response.send( `{"unix": ${inputDate}", "natural": ${natural} }`);

  } else {
  console.log('nope');
  }
}

function isCalendar() {
  if (isNaN(inputDate) && moment(inputDate).isValid()) {
    natural = moment(inputDate).format('MMMM D, YYYY');
    unixDate = Date.parse(inputDate);
    response.send(`{"unix": ${unixDate}, "natural": ${natural}}`);
} else if (isNaN(inputDate) && !moment(inputDate).isValid()){
   response.send(`{"unix": null, "natural": null}`);
}
}

isSeconds();
isCalendar();

 console.log(cat());
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
