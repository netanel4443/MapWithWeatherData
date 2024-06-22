import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { act } from "react";
import { LatLng } from "react-native-maps"
import { Double, Float } from "react-native/Libraries/Types/CodegenTypes"

export type MarkerData = {
  coordinate: LatLng;
  temp: Float;
};

export type PolygonData = {
  coordinate: LatLng;
  key: string
}

export interface MapState {
  markers: { [key: string]: MarkerData }
  polygons: { [key: string]: PolygonData[] }
}

const state: MapState = {
  markers: {},
  polygons: {}
}

const mapSlice = createSlice({
  name: "map",
  initialState: state,
  reducers: {

    addMarker: (state, action: PayloadAction<{ coordinate: LatLng, key: string, temp: Float }>) => {
      const coordinate = action.payload.coordinate
      const temp = action.payload.temp
      state.markers[action.payload.key] = {
        coordinate,
        temp
      }
    },

    applyPolygonCoordinate: (state, action: PayloadAction<{ coordinate: LatLng, polygonKey: string, coordinateKey: string }>) => {
      console.log(`polykey ${action.payload.polygonKey}`)
      // console.log(coordinate)
      const newState = Object.assign(state) as MapState
      let polygon = newState.polygons[action.payload.polygonKey]

      if(polygon === undefined) {
        polygon = []
        newState.polygons[action.payload.polygonKey] = polygon
      }
    
      polygon.push({
        coordinate: action.payload.coordinate,
        key: action.payload.coordinateKey
      })

      state = newState
    },
  }
});

export const { addMarker, applyPolygonCoordinate } = mapSlice.actions;

export default mapSlice.reducer