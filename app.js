let weather = {
  fetchWeather: function (city) {
    //fetching API
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=9bf03374752c6660f175f0968a2eac07"
    )
      .then((response) => response.json()) //Receive Data from server
      .then((data) => this.displayWaether(data));
  },
  displayWaether: function (data) {
    //Here getting data index
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // Set DOM
    $("h2.city").text("Weather in " + name);
    $(".icon").attr(
      "src",
      "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    );

    $(".description").text(description);
    $(".temp").text(temp + "°C");
    $(".humidity").text("Humidity: " + humidity + "%");
    $(".wind").text("Wind speed: " + speed + "km/h");
    document.querySelector(".weather").classList.remove("loading");
  },
  //Function to get value from searchBar
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

$(".search button").click(function () {
  weather.search();
});
//Here we add EnterKey function when someone press enter after giving value
$(".search-bar").keyup(function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Howrah");
