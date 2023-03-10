const unirest = require("unirest");
const express = require('express');
const bodyText = require('body-parser')

const app = express();
app.use(bodyText.urlencoded({extended:true})); //To use body parser with post request

//include all static files so we can use CSS
app.use(express.static( __dirname + '/public'));


//main page
app.get("/", function(req,res) {
	res.sendFile(__dirname +"/public/index.html" );
});

// Display the information when there is post request
app.post("/", function(request,response) {

  //Get the weather data
  const req = unirest("GET", "https://api.openweathermap.org ");

  let city = request.body.city;
  // city = city + ", USA"  //Add country if needed

  req.query({
    "q": city,
    "lang": "en",
    "units": "imperial"
  });

// Update your API keys
  req.headers({
    "x-rapidapi-key": "eef09ac44ae73de852bca91ffeac61e5",
    "x-rapidapi-host": "https://api.openweathermap.org",
    "useQueryString": true
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    response.send(res.body); //Update
  });


});

//let port = process.env.PORT || 8002;
//app.listen(port, function() {
    //console.log ("Server running on port 8002");
//})
app.listen(8002)

