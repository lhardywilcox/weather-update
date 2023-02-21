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

        let requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${apiKey}`;

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
                        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
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
                        var cardCount = 1;

                        for (var index = firstDay(data.list); index < data.list.length; index += 8) {

                            var currentDay = data.list[index];

                            const fcIcon = document.createElement("img");
                            fcIcon.class = "card-img-top"
                            fcIcon.src = `https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`;

                            const fcDescript = document.createElement("ul");
                            const fcTemp = document.createElement("li");
                            const fcPop = document.createElement("li");

                            fcDescript.textContent = currentDay.weather[0].description;
                            fcTemp.textContent = "Temperature:  " + currentDay.main.temp;
                            fcPop.textContent = "Chance of Preciptation:  " + currentDay.pop * 100 + "%";

                            var fcCard = document.getElementById(`fcCard${cardCount}`);
                            
                            fcCard.appendChild(fcIcon);
                            fcCard.appendChild(fcDescript);
                            fcCard.appendChild(fcTemp);
                            fcCard.appendChild(fcPop);
                            cardCount++;
                        }
                    })

                    .catch(function (err) {
                        console.log("Something's wrong: " + err);
                    });

            })

            .catch(function (err) {
                console.log("Something's wrong: " + err);
            });
    };
    function firstDay(dataArray) {
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].sys.pod === 'd') return i
        }
    }
});
