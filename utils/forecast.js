const request = require("request");

const getUrlForecast = coordinates => {
  const forecastBaseUrl = "https://api.darksky.net/forecast/";
  const forecastToken = "260e5723011c73bd2331d63ed3b9d264";
  const forecastCoordinates =
    coordinates.latitude + "," + coordinates.longitude;
  const forecastQueries = "exclude=minutely,hourly,alerts,flags&units=si";
  debugger;
  return (
    forecastBaseUrl +
    forecastToken +
    "/" +
    forecastCoordinates +
    "?" +
    forecastQueries
  );
};

const forecast = (coordinates, callback) => {
  const forecastUrl = getUrlForecast(coordinates);
  request({ url: forecastUrl, json: true }, (error, data) => {
    if (error) {
      callback("Unable to connect to the weather API.", undefined);
    } else {
      callback(undefined, data);
    }
  });
};

const handleDataForecast = (error, data) => {
  if (error) {
    console.log(error);
    return {};
  } else if (data.body.error === undefined) {
    dataWeather = {
      temperature: data.body.currently.temperature,
      feelsLike: data.body.currently.apparentTemperature,
      summary: data.body.currently.summary,
      precipitationProbability: data.body.currently.precipProbability
    };
    console.log("weather data retrieved!");
    console.log(dataWeather);
    return dataWeather;
  } else {
    const msg = "Error " + data.body.code + ":" + data.body.error;
    console.log(msg);
    return {};
  }
};

module.exports = { forecast, handleDataForecast };
