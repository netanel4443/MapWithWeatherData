import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
} from 'react-native-maps';
import * as actions from '../actions/MapViewActions';
import {useAppSelector, useAppDispatch} from '../../redux/reduxHooks';
import {shallowEqual} from 'react-redux';
import {RootState} from '../../redux/store';
import {MapState, MarkerData, PolygonData} from '../mapSlice';
import type {AppDispatch} from '../../redux/store';
import PolygonState from './types/PolygonStateType';
import uuid from 'react-native-uuid';

const MapScreen = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const {markers, polygons}: MapState = useAppSelector(
    (state: RootState) => ({
      markers: state.mapSlice.markers,
      polygons: state.mapSlice.polygons,
    }),
    shallowEqual,
  );

  const [polygonKey, setPolygonKey] = useState<string>(uuid.v4().toString());

  const onApplyPolygonClick = () => {
    setPolygonKey(uuid.v4().toString());
  };

  const addPolygonCoordinate = (coordinate: LatLng) => {
    dispatch(actions.addPolygonCoordinate(polygonKey, coordinate));
  };

  const drawMarkers = (markersData: {[key: string]: MarkerData}) => {
    return Object.keys(markersData).map(key => (
      <Marker
        key={key}
        coordinate={markersData[key].coordinate}
        title={markersData[key].temp.toString()}
      />
    ));
  };

  const drawPolygons = (polygons: {[key: string]: PolygonData[]}) => {
    console.log(polygons);
    const polygonElements: React.ReactElement[] = [];

     Object.keys(polygons).map(polygonKey => {
      const coordinates = polygons[polygonKey].map((data, index) => {
        return data.coordinate;
      });
      polygonElements.push(
        <Polygon key={polygonKey} coordinates={coordinates} />,
      )
    })
    
    return polygonElements
  };

  return (
    <View>
      <Text
        style={styles.polygonApplyButton}
        onPress={() => {
          onApplyPolygonClick();
        }}>
        Apply Polygon
      </Text>

      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        onDoublePress={event => {
          addPolygonCoordinate(event.nativeEvent.coordinate);
        }}
        onLongPress={event => {
          dispatch(actions.onMapLongPress(event.nativeEvent.coordinate));
        }}>
        {drawMarkers(markers)}

        {drawPolygons(polygons)}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  polygonApplyButton: {
    width: '30%',
    height: 50,
    backgroundColor: 'blue',
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
});
