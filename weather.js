const weather = document.querySelector(".js-weather");

const API_KEY = "8e08b42e33abea52d941320bdc8327c7";                 //  날씨 정보 얻어올 API
const COORDS = "coords";

function getWeather(latitude, longitude) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem (COORDS, JSON.stringify(coordsObj));       //  localStorage에 coordsObj를 문자열로 바꿔서 저장.
}

function handleGeoSuccess(position) {               
    const latitude = position.coords.latitude;              //  latitude에 latitude 좌표를 담음.
    const longitude = position.coords.longitude;            //  longitude에 longitude 좌표를 담음.
    const coordsObj = {
        latitude,
        longitude
    }; 
    saveCoords(coordsObj);                                  //  saveCoords 실행.
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess , handleGeoError);    //  navigator객체의 geolocation.getCurrentPosition
}                                                                                   //  성공일 경우 handleGeoSuccess, 실패일 경우 handleGeoError

function loadedCoords() {                                         
    const loadedCoords = localStorage.getItem(COORDS);      //  localStorage에 COORDS 저장.
    if(loadedCoords === null) {                              //  Coords가 null일 경우
        askForCoords();                                     //  askForCoords 실행.
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadedCoords();
}

init();