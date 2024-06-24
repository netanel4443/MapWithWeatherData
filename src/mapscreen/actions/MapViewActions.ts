import { LatLng } from "react-native-maps";
import { AppDispatch } from '../../redux/store'; // Adjust path as necessary
import { MarkerData, PolygonData, addMarker, applyPolygonCoordinate, buildSavedMarkersDataTexts, setDrawPolygonBtnState, setMockedPolygons } from '../../mapscreen/mapSlice'
import * as WeatherApi from '../api/WeatherApi'
import uuid from 'react-native-uuid';
import { getName } from 'country-list';
import { DrawPolygonBtnState } from "../ui/redux/types";


export const onMapLongPress = (coordinate: LatLng) => {
  console.log(coordinate)
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

export const addPolygonCoordinateIfAllowed = (polygonKey: string, coordinate: LatLng, isDrawPolygonsEnabled: boolean) => {

  return (dispatch: AppDispatch) => {
    // if drawing polygons is disabled , return -> don't draw polygon
    if (!isDrawPolygonsEnabled) {
      return
    }

    dispatch(
      addPolygonCoordinate(polygonKey, coordinate)
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


export const drawMockedData = () => {
  return (dispatch: AppDispatch) => {
    //draw mocked markers
    dispatch( 
      drawMockedMarkers()
    )
    //draw mocked polygons
    dispatch(
      setMockedPolygons({
        polygons: drawMockedPolygons()
      }),
    )
  }
}

const drawMockedPolygons = () => {

  const polygons =
  {

    [uuid.v4().toString()]: buildPolygonDataObject([
      { "latitude": 66.63277642452101, "longitude": 86.65596932172775 },
      { "latitude": 62.50039041353416, "longitude": 114.52983476221561 },
      { "latitude": 56.642026250732094, "longitude": 97.05216854810715 },
    ]),

    [uuid.v4().toString()]: buildPolygonDataObject([
      { "latitude": -17.16846761269981, "longitude": 123.16254492849112 },
      { "latitude": -21.573463156675814, "longitude": 145.66252682358027 },
      { "latitude": -31.571114762289696, "longitude": 118.14022623002528 },
      { "latitude": -35.46380219932164, "longitude": 143.8544949889183 },
    ]),

    [uuid.v4().toString()]: buildPolygonDataObject([
      { "latitude": 67.22335817307791, "longitude": -145.8349797874689 },
      { "latitude": 64.75257466864251, "longitude": -96.36514786630869 },
      { "latitude": 32.92678730129044, "longitude": -99.57943372428417 },
      { "latitude": 54.25037919871992, "longitude": -89.93658050894737 },
    ]),

    [uuid.v4().toString()]: buildPolygonDataObject([
      { "latitude": 32.909180519918735, "longitude": 34.98253874480724 },
      { "latitude": 32.057650493094606, "longitude": 35.407012067735195 },
      { "latitude": 29.882445863219893, "longitude": 34.72727157175541 },
    ]),

    [uuid.v4().toString()]: buildPolygonDataObject([
      { "latitude": 39.93490909970508, "longitude": 31.50500144809484 },
      { "latitude": 33.934730162694024, "longitude": 49.969227723777294 },
      { "latitude": 25.075294966233745, "longitude": 43.620251566171646 }
    ])
  }

  return polygons
}

const buildPolygonDataObject = (coordinates: LatLng[]) => {

  const polygon = coordinates.map(coordinate => {
    const data: PolygonData = {
      coordinate: coordinate,
      key: uuid.v4().toString(),
    }
    return data
  })

  return polygon
}

export const drawMockedMarkers = () => {
  return (dispatch: AppDispatch) => {
    dispatch(onMapLongPress({ "latitude": 31.25781104323006, "longitude": 34.77883268147707 }))
    dispatch(onMapLongPress({ "latitude": 40.52045205556071, "longitude": 21.793541684746742 }))
    dispatch(onMapLongPress({ "latitude": 53.10742158711122, "longitude": -1.5064911916851997 }))
    dispatch(onMapLongPress({ "latitude": 66.44530904202563, "longitude": 19.726979099214077 }))
    dispatch(onMapLongPress({ "latitude": 27.710254964973107, "longitude": -81.5471188724041 }))
  }
}


