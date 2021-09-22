import rainyImg from "../images/back-ground/rainy.jpeg";
import cloudyImg from "../images/back-ground/cloudy.jpeg";
import sunnyImg from "../images/back-ground/sunny.jpeg";

import clear from "../images/weather-icon/clear.svg";
import cloudy from "../images/weather-icon/mostly-clear.svg";
import mostlyClear from "../images/weather-icon/mostly-clear.svg";
import partlyClear from "../images/weather-icon/partly-clear.svg";
import partlyCloudy from "../images/weather-icon/partly-cloudy.svg";
import mostlyCloudy from "../images/weather-icon/mostly-cloudy.svg";
import rainy from "../images/weather-icon/rainy.svg";
import localRain from "../images/weather-icon/local-showers.svg";
import ClearRain from "../images/weather-icon/occasional-after-shower.svg";
import partlyClearRain from "../images/weather-icon/mostly-clear-with-shower.svg";
import thunderRain from "../images/weather-icon/thundershowers.svg";
import clearThunderRain from "../images/weather-icon/clear-thundershower.svg";
import clearThundershower from "../images/weather-icon/clear-thunderRain.svg";
import cloudyRainSnow from "../images/weather-icon/cloudy-with-rain-or-snow.svg";
import clearFog from "../images/weather-icon/clear-fog.svg";
import fog from "../images/weather-icon/fog.svg";
import RainFog from "../images/weather-icon/rain-and-fog.svg";
import RainFogSnow from "../images/weather-icon/rain-fog-snow.svg";
import thundershowersFog from "../images/weather-icon/mostly-cloudy-with-fog-and-thundershowers.svg";
import snow from "../images/weather-icon/snow.svg";

const background = {
  rainyImg: {
    dark: rainyImg,
    day: rainyImg,
  },
  cloudyImg: {
    dark: cloudyImg,
    day: cloudyImg,
  },
  sunnyImg: {
    dark: sunnyImg,
    day: sunnyImg,
  },
};

const weatherIcon = [
  "",
  clear,
  mostlyClear,
  partlyClear,
  partlyCloudy,
  mostlyCloudy,
  mostlyCloudy,
  cloudy,
  ClearRain,
  localRain,
  localRain, //10
  partlyClearRain,
  localRain,
  rainy,
  rainy,
  thunderRain, //15
  thunderRain,
  thunderRain,
  clearThundershower,
  clearThunderRain,
  clearThunderRain, //20
  clearThunderRain,
  clearThunderRain,
  cloudyRainSnow, //23
  clearFog,
  clearFog, //25
  fog,
  fog,
  RainFog, //28
  localRain,
  RainFog, //30
  RainFog,
  RainFog, //32
  thunderRain,
  thunderRain,
  RainFog, //35
  RainFog,
  RainFogSnow,
  RainFogSnow,
  RainFog,
  RainFog, //40
  thundershowersFog,
  snow,
];

export { background, weatherIcon };
