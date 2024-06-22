import { LatLng } from "react-native-maps"
import { createAsyncThunk, } from '@reduxjs/toolkit'

const API_KEY = "1b866147a6baea68d35aa2cefc9d3fa6"
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`


export const fetchWeather = (coordinate: LatLng) => {
  const fullUrl = `${baseUrl}?${WeatherParams(coordinate)}`;
  return fetch(fullUrl)
}

const WeatherParams = (coordinate: LatLng) => {
  return new URLSearchParams({
    lat: coordinate.latitude.toString(),
    lon: coordinate.longitude.toString(),
    appid: API_KEY,
    units: 'metric'
  });

}