const apiKey = "7a7989f3e4e9807b566e7c41ae7941db"

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day} ${date} ${month}`;

}


navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude={part}&appid=${apiKey}&units=metric&lang=en`)
        .then(res => {
            if(!res.ok) {
                throw Error("Weather is not currently available. Please try later")
            }
            return res.json()
        })
        .then(data => {
            console.log(data)

            let url = data.timezone;
            let parts = url.split("/");
            //current day
            let now = new Date();
            //day 2
            let dayTwo = new Date();
            dayTwo.setDate(dayTwo.getDate() + 1);
            //day 3
            let dayThree = new Date()
            dayThree.setDate(dayThree.getDate() + 2);
            //day 4
            let dayFour = new Date()
            dayFour.setDate(dayFour.getDate() + 3);
            //day 5
            let dayFive = new Date()
            dayFive.setDate(dayFive.getDate() + 4);
            //day 5
            let daySix = new Date()
            daySix.setDate(daySix.getDate() + 5);
            //day 5
            let daySeven = new Date()
            daySeven.setDate(daySeven.getDate() + 6);
            
            
            const iconUrl = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
            document.getElementById("location").innerHTML = `
                <p>${parts[parts.length-1]}</p>
                <p>${dateBuilder(now)}</p>
            `

            //current weather
                document.getElementById("current-location-weather").innerHTML = `
                <img src=${iconUrl}>
                <p class="current-temperature">${Math.round(data.current.temp)}&ordm; C</p>
                <p>${Math.round(data.daily[0].temp.min)}&ordm; C / ${Math.round(data.daily[0].temp.max)}&ordm; C</p>
                <p>${data.current.weather[0].description}</p>

            `
            document.getElementById("weather-wrapper").style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + parts[parts.length-1] + "')"

            //3-day forecast
            
            document.getElementById("daily").innerHTML =
            `
                <div class="daily-forecast">
                    <div>
                        <p>${dateBuilder(dayTwo)}</p>
                        <img src="http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png">
                        <p>${Math.round(data.daily[1].temp.day)}&ordm; C</p>
                        <p>${Math.round(data.daily[1].temp.min)}&ordm; C / ${Math.round(data.daily[1].temp.max)}&ordm; C</p>
                    </div>

                    <div>
                        <p>${dateBuilder(dayThree)}</p>
                        <img src="http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png">
                        <p>${Math.round(data.daily[2].temp.day)}&ordm; C</p>
                        <p>${Math.round(data.daily[2].temp.min)}&ordm; C / ${Math.round(data.daily[2].temp.max)}&ordm; C</p>
                    </div>

                    <div>
                        <p>${dateBuilder(dayFour)}</p>
                        <img src="http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png">
                        <p>${Math.round(data.daily[3].temp.day)}&ordm; C</p>
                        <p>${Math.round(data.daily[3].temp.min)}&ordm; C / ${Math.round(data.daily[3].temp.max)}&ordm; C</p>
                    </div>

                    <div>
                        <p>${dateBuilder(dayFive)}</p>
                        <img src="http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png">
                        <p>${Math.round(data.daily[4].temp.day)}&ordm; C</p>
                        <p>${Math.round(data.daily[4].temp.min)}&ordm; C / ${Math.round(data.daily[4].temp.max)}&ordm; C</p>
                    </div>

                    <div>
                        <p>${dateBuilder(daySix)}</p>
                        <img src="http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png">
                        <p>${Math.round(data.daily[5].temp.day)}&ordm; C</p>
                        <p>${Math.round(data.daily[5].temp.min)}&ordm; C / ${Math.round(data.daily[5].temp.max)}&ordm; C</p>
                    </div>

                    <div>
                        <p>${dateBuilder(daySeven)}</p>
                        <img src="http://openweathermap.org/img/wn/${data.daily[6].weather[0].icon}@2x.png">
                        <p>${Math.round(data.daily[6].temp.day)}&ordm; C</p>
                        <p>${Math.round(data.daily[6].temp.min)}&ordm; C / ${Math.round(data.daily[6].temp.max)}&ordm; C</p>
                    </div>

                </div>
            `
        })
})


//search
const searchbox = document.getElementById("search-box")
searchbox.addEventListener("keypress", setQuery)

function setQuery(e) {
    if(e.keyCode == 13) {
        getResults(searchbox.value)
    }
}

function getResults (query) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${apiKey}`)
      .then(weather => {
        return weather.json();
      }).then(data => {
          console.log(data)
          document.getElementById("city").innerHTML = data.name 
          document.getElementById("search-location").style.cssText = "background-image: url('https://source.unsplash.com/1600x900/?" + data.name + "'); background-size: cover "
      });
     
  }

  



