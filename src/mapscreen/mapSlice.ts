import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { act } from "react";
import { LatLng } from "react-native-maps"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Double, Float } from "react-native/Libraries/Types/CodegenTypes"
import { DrawPolygonBtnState } from "./ui/redux/types";

export type MarkerData = {
  coordinate: LatLng;
  temp: Float;
  feelsLikeTemp: Float,
  country: string
};

export type PolygonData = {
  coordinate: LatLng;
  key: string
}

export interface MapState {
  markers: { [key: string]: MarkerData }
  polygons: { [key: string]: PolygonData[] }
  markersDataTexts: { [key: string]: string }
  drawPolygonBtnState: DrawPolygonBtnState
}

const state: MapState = {
  markers: {},
  polygons: {},
  markersDataTexts: {},
  drawPolygonBtnState: {
    isDrawPolygonsEnabled: false,
    backgroundColor: "green",
    description: "Enable polygon drawing"
  }
}

const mapSlice = createSlice({
  name: "map",
  initialState: state,
  reducers: {

    addMarker: (state, action: PayloadAction<{ coordinate: LatLng, key: string, temp: Float, feelsLikeTemp: Float, country: string }>) => {
      const newState = Object.assign(state) as MapState

      newState.markers[action.payload.key] = {
        coordinate: action.payload.coordinate,
        temp: action.payload.temp,
        feelsLikeTemp: action.payload.feelsLikeTemp,
        country: action.payload.country
      }

      //apply new state
      state = newState
    },

    applyPolygonCoordinate: (state, action: PayloadAction<{ coordinate: LatLng, polygonKey: string, coordinateKey: string }>) => {

      const newState = Object.assign(state) as MapState
      let polygon = newState.polygons[action.payload.polygonKey]

      if (polygon === undefined) {
        polygon = []
        newState.polygons[action.payload.polygonKey] = polygon
      }

      polygon.push({
        coordinate: action.payload.coordinate,
        key: action.payload.coordinateKey
      })
      //apply new state
      state = newState
    },

    buildSavedMarkersDataTexts: (state, action: PayloadAction<{ markersDataTexts: { [key: string]: string } }>) => {
      const newState = Object.assign(state) as MapState
      newState.markersDataTexts = action.payload.markersDataTexts
      //apply new state
      state = newState
    },
    
    setDrawPolygonBtnState: (state, action: PayloadAction<{newState: DrawPolygonBtnState}>) => {
      const newState = Object.assign(state) as MapState
      newState.drawPolygonBtnState = action.payload.newState

      state = newState
    }
  },
});

export const {
  addMarker,
  applyPolygonCoordinate,
  buildSavedMarkersDataTexts,
  setDrawPolygonBtnState
} = mapSlice.actions;

export default mapSlice.reducer