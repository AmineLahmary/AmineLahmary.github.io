const apiKey = "f675e2ac7af234106da80487060e4a72"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`


const searchBtn = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
const cartBody = document.querySelector(".cart-body");
const temperature = document.querySelector(".temperature > h1");
const cityNameElement = document.querySelector(".city-name");
const humidityValue = document.querySelector(".humidity-value");
const windValue = document.querySelector(".wind-value");

const weatherAnimations = {
    clear: "https://lottie.host/6e61f93c-2344-47c7-a5a2-edbb4946cda9/11ftixdWl8.json",
    snow: "https://lottie.host/23ef6c8b-9569-42c1-896b-3c786f34432b/HS2jASbhni.json",
    rain: "https://lottie.host/a0a5682d-f599-4245-995e-dcc7985e5bbf/IeGogr18d8.json",
    clouds: "https://lottie.host/4a3e67f8-092b-4542-81bb-6dd4c7d01ae7/KfmQkZnP9y.json",
    mist: "https://lottie.host/853c72d2-3c4a-4cd5-b01f-9665cd61fb7f/xTJJcz3O3r.json"
  };


searchBtn.addEventListener('click',() => {
    cartBody.classList.remove('active');
    changeWeatherData(searchInput.value)
})

async function changeWeatherData(cityName) {
    
    try {
        const res = await fetch( `${apiUrl}&q=${cityName}&appid=${apiKey}` )
        const data = await res.json();
    
        document.querySelector(".temperature > h1").textContent = Math.round( data.main.temp ) + "c°"
        document.querySelector(".city-name").textContent = data.name
        document.querySelector(".humidity-value").textContent = data.main.humidity + "%";
        document.querySelector(".wind-value").textContent = data.wind.speed + " Km/h"
    
        const weatherStatus = data.weather[0].main.toLowerCase();

        setTimeout(()=>{cartBody.classList.add('active');},200)
        
        
        if(weatherAnimations[weatherStatus]) changeThePath(weatherAnimations[weatherStatus])
        else changeThePath(weatherAnimations['clear'])
        console.log(data)
    
    } catch(error) {
        console.error("Invalid city name");
        cartBody.classList.remove('active');
    }
    
}




function changeThePath(path) {
    let animation = bodymovin;
    animation.destroy()

    bodymovin.loadAnimation({
        wrapper: document.getElementById('svg'), // Required
        path: path, // Required
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true, // Optional
        name: "Hello World", // Name for future reference. Optional.
      }).setSpeed(0.5);
}