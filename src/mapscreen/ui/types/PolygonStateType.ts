import { LatLng } from "react-native-maps";
import uuid from 'react-native-uuid';

export default class PolygonState {
   coordinate: LatLng | undefined;
   key: String

  constructor() {
      this.key = uuid.v4().toString()
  }

  setCoordinate = (coordinate: LatLng) => {
    this.coordinate = coordinate
  }

  getCoordinate = () => {
    return this.coordinate
  }
}