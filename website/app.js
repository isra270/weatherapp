/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey ='&appid=dc6bbc3f82df0877f93e0bf324f1af22';
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',performAction);
/* Function called by event listener */
function performAction(e){
    e.preventDefault();

    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherDemo(baseURL,zip,apiKey)
//New syntax
        .then(function (data){
        //    Add data
            console.log(data)
            postData('/addweather',{date:newDate ,temp:data.main.temp,feelings:feelings })
        //    we can do this beacuse of async
            updateUI()
        })
}

/* Function to GET Web API Data*/
const getWeatherDemo= async (baseURL,zip , key)=>{
    const res = await fetch(baseURL+zip+key)
    try{
        const data = await res.json();
        console.log(data)
        return data
    }catch(error){
        console.log("error ",error);
    }
}
/* Function to POST data */
// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: data.date,
            temperature: data.temp,
            userresponse: data.feelings
        }), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};

/*Update ui demo*/
const updateUI = async ()=>{
    const request = await fetch('/all')
    try{
        const allData = await request.json();
        console.log("===========   ",allData);

        document.getElementById('date').innerHTML ="date :   " +allData[0].date
        // ({date: document.getElementById('date').innerHTML} = allData[0]);
        // ({temperature: document.getElementById('temp').innerHTML} = allData[1]);
        document.getElementById('temp').innerHTML = "temperature :   "+   allData[0].temperature;
        document.getElementById('content').innerHTML ="userresponse :   "+ allData[0].userresponse;
    }catch (error) {
        console.log("error", error);
    }
}
/* Function to GET Project Data */
