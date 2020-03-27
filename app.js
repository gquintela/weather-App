const request = require("request");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
const clear = require("clear");
const process = require("process");

debugger;
let adress = "";
if (process.argv.length < 3) {
  adress = "buenos aires";
  debugger;
} else {
  adress = process.argv[2];
}

geoCode.geoCode(adress, (error, data) => {
  coordinates = handleDataGeoCode(error, data);

  forecast.forecast(coordinates, (error, data) => {
    myForecast = forecast.handleDataForecast(error, data);
  });
});
