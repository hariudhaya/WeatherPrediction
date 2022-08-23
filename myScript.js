//API Key
const openAPIKey ='9f47dbe7e74e9cca1168773c174db9a2';
//Weather result retuns in kelvin 
const kelvin = 273;

//span ids
const mLocation = document.getElementById('locaiton');
const mTemperature = document.getElementById('temp');
const mIcon = document.querySelector('.weather-icon');
const mDescription = document.getElementById('description');
const mCountry = document.getElementById('country');

const weatherObject ={
    //empty data will be added from response
}

//api.openweathermap.org/data/2.5/weather?id=524901&appid=YOUR_API_KEY

const submitButton = document.getElementById('submit-button');
//getting the input value
const locationInput = document.getElementById('search-input');
//const locationhello = locationInput;


submitButton.addEventListener('click',function(){
    let inputLocation = locationInput.value;
    getWeather(inputLocation);
});

function getWeather(pCityID){
    //let api = `api.openweathermap.org/data/2.5/weather?id=${pCityName}&appid=${openAPIKey}`;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+pCityID+"&appid="+openAPIKey;
    
    fetch(url).then((response) =>{
        if(!response.ok){
          spanError = document.getElementById('onError').innerHTML="Not a valid location please try again";
            showWeatherError();
        }
        else{
        response.json().then((data) =>{

            weatherObject['temp'] = Math.floor(data.main.temp) - kelvin ;
            weatherObject['location'] = data.name;
            weatherObject['country'] = data.sys.country;
            //console.log(data);
            for(let weather of data.weather){
                //console.log(weather.description);
                weatherObject['description'] = weather.description;
                weatherObject['icon'] = weather.icon;
            }
            spanError = document.getElementById('onError').innerHTML='';
        })
        .then(function(){
            showWeather();
           
        })
        //.then(()=>{
            //showWeather();
        //}
        .catch((err) =>{
            showWeatherError();
            console.log(err);
        })
        }
    });
    

}


function showWeather(){
//show the weather on the screen 
mLocation.innerHTML = weatherObject['location'];
mCountry.innerHTML = weatherObject['country'];
mTemperature.innerHTML = weatherObject['temp'] +"&#176" + "C";
mIcon.innerHTML = `<img src="icons/${weatherObject['icon']}.png"/>`;
mDescription.innerHTML = weatherObject['description'];
}


function showWeatherError(){
    //change on screen text to error messages
    mLocation.innerHTML = "City not found";
    mCountry.innerHTML ="Error";
    mTemperature.innerHTML ="0";
    mIcon.innerHTML = `<img src="icons/${unknown}.png"/>`;
}

//App info 

const appInfo = document.getElementById('app-info');

appInfo.addEventListener('click',function(){
    swal("Find the local weather in your city. If looking for a location in multiple countries use York,UK");
   
});

