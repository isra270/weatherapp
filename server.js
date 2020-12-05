// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function

// Callback function to complete GET '/all'
const weatherData =[];
app.get('/all', getData)

function getData(req,res){
    res.send(weatherData)
    console.log(weatherData)
}
// Post Route

app.post('/addWeather',addWeather);
function addWeather(req,res){
    newEntry = {
        date: req.body.date,
        temperature: req.body.temperature,
        userresponse: req.body.userresponse
    }
    weatherData.push(newEntry)
    res.send(weatherData)
    console.log(weatherData)
}