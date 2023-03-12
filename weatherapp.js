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
  const req = unirest("GET", "https://weatherapi-com.p.rapidapi.com/current.json");

  let city = request.body.city;
  // city = city + ", USA"  //Add country if needed

  req.query({
    "q": city,
    "lang": "en",
    "units": "imperial"
  });

// Update your API keys
  req.headers({
    "x-rapidapi-key": "2f1f6b0119msh08d5367f5f550cap1153f4jsne5dac8c0ee08",
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    "useQueryString": true
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    //console.log(res.body)
    let results = res.body
    let resultcity = res.body.location.name
    let resultstate = res.body.location.region
    let working = results.current
    let temp = working.temp_f
    let head = '<head><link rel="stylesheet" href="style.css"></head>'
    //let feelslike = working.feels_like
    console.log(results)
    console.log(temp)
    //console.log(feelslike)
    //response.send("The current temp in "+ resultcity + " , "+ resultstate + " is  " + temp + " degrees Farenheit")
    //response.setHeader('<head><link rel="stylesheet" href="style.css"></head>')
    
    response.send( head + '<body> <p><div class=result>The current temp in ' + resultcity + " , " + resultstate + " is  " + temp + ' degrees Farenheit</div><div class=other> ' + results.current.condition.text + '<img src='+ results.current.condition.icon.slice(2) +' alt=' + results.current.condition.text + '></div></p></h1></body></html>');  
  });


});


app.listen(2008)