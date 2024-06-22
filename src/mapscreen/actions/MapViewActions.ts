import { LatLng } from "react-native-maps";
import { AppDispatch } from '../../redux/store'; // Adjust path as necessary
import { addMarker, applyPolygonCoordinate } from '../../mapscreen/mapSlice'
import * as WeatherApi from '../api/WeatherApi'
import uuid from 'react-native-uuid';

export const onMapLongPress = (coordinate: LatLng) => {
  return async (dispatch: AppDispatch) => {

    const temp = await WeatherApi.fetchWeather(coordinate)
    const json = await temp.json()
    console.log(json)
    dispatch(addMarker({
      coordinate: coordinate,
      key: uuid.v4().toString(),
      temp: json.main.temp
    }));
  }
}

export const addPolygonCoordinate = (polygonKey: string, coordinate: LatLng) => {
  return (dispatch: AppDispatch) => {
    dispatch(
      applyPolygonCoordinate(
        {
          polygonKey: polygonKey,
          coordinate: coordinate,
          coordinateKey: uuid.v4().toString()
        }
      )
    )
  }
}

