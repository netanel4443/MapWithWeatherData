import { LatLng } from "react-native-maps";
import { AppDispatch } from '../../redux/store'; // Adjust path as necessary
import { MarkerData, addMarker, applyPolygonCoordinate, buildSavedMarkersDataTexts, setDrawPolygonBtnState } from '../../mapscreen/mapSlice'
import * as WeatherApi from '../api/WeatherApi'
import uuid from 'react-native-uuid';
import { getName } from 'country-list';
import { DrawPolygonBtnState } from "../ui/redux/types";


export const onMapLongPress = (coordinate: LatLng) => {

  return async (dispatch: AppDispatch) => {

    const temp = await WeatherApi.fetchWeather(coordinate)
    const json = await temp.json()

    let country: string = ""

    if (json.sys.country != undefined) {
      //getName might return undefined, if it does, don't apply its result, otherwise do
      const result = getName(json.sys.country)

      if (result != undefined) {
        country = result
      }

    }

    console.log(json)
    console.log(country)
    console.log(json.sys.country)
    dispatch(
      addMarker(
        {
          coordinate: coordinate,
          key: uuid.v4().toString(),
          temp: json.main.temp,
          feelsLikeTemp: json.main.feels_like,
          country: country ? country : ""
        }
      )
    )
  }
}

export const addPolygonCoordinate = (polygonKey: string, coordinate: LatLng, isDrawPolygonsEnabled: boolean) => {


  return (dispatch: AppDispatch) => {
    // if drawing polygons is disabled , return -> don't draw polygon
    if (!isDrawPolygonsEnabled) {
      return
    }

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

export const dispatchSavedMarkersDataTexts = (markersData: { [key: string]: MarkerData }) => {
  return (dispatch: AppDispatch) => {
    dispatch(
      buildSavedMarkersDataTexts(
        {
          markersDataTexts: _buildSavedMarkersDataTexts(markersData)
        }
      )
    );
  }
}

const _buildSavedMarkersDataTexts = (markersData: { [key: string]: MarkerData }) => {
  const stringBuilder: { [key: string]: string } = {}

  Object.keys(markersData).map(key => {
    const tmpString: string[] = []
    //add country if the weather api returned a country code. (it might not return a country code)
    if (markersData[key].country != "") {
      const coutnry = `country: ${markersData[key].country}`
      tmpString.push(coutnry)
      tmpString.push(`\n`)
      tmpString.push(`\n`)
    }

    tmpString.push(`temp: ${markersData[key].temp} C°`)
    tmpString.push(`\n`)
    tmpString.push(`\n`)
    tmpString.push(`feels like Temperature: ${markersData[key].temp}`)
    tmpString.push(`\n`)
    tmpString.push(`\n`)
    tmpString.push(`latitude: ${markersData[key].coordinate.latitude}`)
    tmpString.push(`\n`)
    tmpString.push(`\n`)
    tmpString.push(`longitude: ${markersData[key].coordinate.longitude}`)

    stringBuilder[key] = tmpString.join('')
  })
  return stringBuilder
}

export const onDrawPolygonBtnClick = (currentState: DrawPolygonBtnState) => {
  return (dispatch: AppDispatch) => {
    const newState = buildDrawPolygonButtonState(currentState)
    console.log(currentState)
    dispatch(
      setDrawPolygonBtnState(
        {
          newState: newState
        }
      )
    );
  }
}

const buildDrawPolygonButtonState = (currentState: DrawPolygonBtnState) => {
  let newState: DrawPolygonBtnState

  if (currentState.isDrawPolygonsEnabled) {
    newState = {
      isDrawPolygonsEnabled: false,
      backgroundColor: 'green',
      description: "Enable polygon drawing"
    }
  }
  else {
    newState = {
      isDrawPolygonsEnabled: true,
      backgroundColor: 'red',
      description: "Disable polygon drawing"
    }
  }

  return newState
}



