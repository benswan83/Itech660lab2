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
  const req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

  let city = request.body.city;
  // city = city + ", USA"  //Add country if needed

  req.query({
    "q": city,
    "lang": "en",
    "units": "imperial"
  });

// Update your API keys
  req.headers({
    "x-rapidapi-key": '8cbad62b31msh24b3ad48bf2ddd6p16d0cajsn490b5339aba7',
    "x-rapidapi-host": 'openweather43.p.rapidapi.com',
    "useQueryString": true
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    //console.log(res.body)
    let results = res.body
    let working = results.main
    let temp = working.temp
    let feelslike = working.feels_like
    console.log(results)
    console.log(temp)
    console.log(feelslike)
    response.send('<p>${temp}, ${feelslike}</p>'); //Update
  });


});


app.listen(3000)