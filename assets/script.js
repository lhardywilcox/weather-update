$(document).ready(function () {
    var apiKey = '62b2ebee1dd3d81b4b4a10b045e5f835'
    var searchBtn = document.querySelector('.submit');
    console.log(searchBtn);
    var cityLat;
    var cityLon;
    var cityState = document.getElementById('citydata');
    var currentWeather = document.getElementById('currentWeather');



    searchBtn.addEventListener('click', getCoord);

    function getCoord(event) {
        event.preventDefault();

        console.log(cityState.value);
        const userInput = cityState.value.replaceAll(" ", "");

        let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${apiKey}`;

        fetch(requestUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                // console.log(data)

                const lat = data[0].lat;
                const lon = data[0].lon;


                requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

                fetch(requestUrl)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {

                        console.log(data);

                        const icon = document.createElement("img");
                        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                        const descript = document.createElement("h3");
                        const temp = document.createElement("p");
                        const press = document.createElement("p");
                        const humid = document.createElement("p");


                        descript.textContent = data.weather[0].description;
                        temp.textContent = "Temperature:  " + data.main.temp;
                        press.textContent = "Pressure:  " + data.main.pressure;
                        humid.textContent = "Humidity:  " + data.main.humidity;

                        currentWeather.appendChild(icon);
                        currentWeather.appendChild(descript);
                        currentWeather.appendChild(temp);
                        currentWeather.appendChild(press);
                        currentWeather.appendChild(humid);
                    })
                    .catch(function (err) {
                        console.log("Something's wrong: " + err);
                    });

                requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

                fetch(requestUrl)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (data) {

                        console.log(data);

                    })
                    .catch(function (err) {
                        console.log("Something's wrong: " + err);
                    });

            })
            .catch(function (err) {
                console.log("Something's wrong: " + err);
            });
    }

});
