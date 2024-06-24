import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {MarkerData, PolygonData} from '../mapSlice';
import type {AppDispatch} from '../../redux/store';
import uuid from 'react-native-uuid';

const MapScreen = ({navigation}: any) => {
  const dispatch: AppDispatch = useAppDispatch();

  const {markers, polygons, drawPolygonBtnState} = useAppSelector(
    (state: RootState) => ({
      markers: state.mapSlice.markers,
      polygons: state.mapSlice.polygons,
      drawPolygonBtnState: state.mapSlice.drawPolygonBtnState,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actions.drawMockedData());
    // dispatch(actions.drawMockedMarkers());
  }, []);
  


  const [polygonKey, setPolygonKey] = useState<string>(uuid.v4().toString());

  //controls on apply polygon button , when false the view is invisible otherwise, visible
  // const [isApplyPolygonVisible, setApplyPolygonBtnVisibility] =
  //   useState<boolean>(false);

  const onApplyPolygonClick = () => {
    // setApplyPolygonBtnVisibility(false);
    setPolygonKey(uuid.v4().toString());
  };

  const addPolygonCoordinate = (
    coordinate: LatLng,
    isDrawPolygonsEnabled: boolean,
  ) => {
    dispatch(
      actions.addPolygonCoordinateIfAllowed(
        polygonKey,
        coordinate,
        isDrawPolygonsEnabled,
      ),
    );
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
    const polygonElements: React.ReactElement[] = [];

    Object.keys(polygons).map(polygonKey => {
      const coordinates = polygons[polygonKey].map((data, index) => {
        return data.coordinate;
      });
      polygonElements.push(
        <Polygon key={polygonKey} coordinates={coordinates} />,
      );
    });

    return polygonElements;
  };

  const onMapDoublePress = (coordinate: LatLng) => {
    //show apply polygon button
    // setApplyPolygonBtnVisibility(true);
    addPolygonCoordinate(coordinate, drawPolygonBtnState.isDrawPolygonsEnabled);
  };

  const onSavedMarkersBtnClick = () => {
    dispatch(actions.dispatchSavedMarkersDataTexts(markers));
    navigation.navigate('MarkersData');
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        // this solves the problem of: double tap on map draws polygon and zooming at the same time
        zoomEnabled={!drawPolygonBtnState.isDrawPolygonsEnabled}
        onDoublePress={event => {
          onMapDoublePress(event.nativeEvent.coordinate);
        }}
        onLongPress={event => {
          dispatch(actions.onMapLongPress(event.nativeEvent.coordinate));
        }}>
        {drawMarkers(markers)}

        {drawPolygons(polygons)}
      </MapView>

      <View style={styles.buttonsContainer}>
        <Text
          style={[
            styles.polygonApplyButton,
            // {opacity: isApplyPolygonVisible ? 1 : 0},
          ]}
          onPress={() => {
            onApplyPolygonClick();
          }}>
          Apply Polygon
        </Text>

        <Text
          style={styles.savedMarkersBtn}
          onPress={() => onSavedMarkersBtnClick()}>
          Saved Data
        </Text>
      </View>

      <Text
        style={[
          styles.applyPolygonBtn,
          {backgroundColor: drawPolygonBtnState.backgroundColor},
        ]}
        onPress={() =>
          dispatch(actions.onDrawPolygonBtnClick(drawPolygonBtnState))
        }>
        {drawPolygonBtnState.description}
      </Text>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {
    width: '100%',
    height: '100%',
    pointerEvents: 'box-only',
  },
  applyPolygonBtn: {
    position: 'absolute',
    elevation: 1,
    height: 'auto',
    paddingVertical: 10,
    width: '30%',
    borderRadius: 50,
    backgroundColor: 'green',
    marginTop: 10,
    marginStart: 10,
    opacity: 0.8,
    textAlign: 'center',
    color: 'white',
  },

  buttonsWrapper: {
    display: 'flex',
    flex: 1,
    position: 'absolute',
    elevation: 1,
    width: '100%',
    height: '100%',
  },
  polygonApplyButton: {
    borderRadius: 10,
    width: '30%',
    height: 'auto',
    paddingVertical: 10,
    backgroundColor: 'blue',
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    textAlignVertical: 'center',
    pointerEvents: 'box-none',
  },

  savedMarkersBtn: {
    borderRadius: 10,
    width: '30%',
    height: 'auto',
    paddingVertical: 10,
    backgroundColor: 'blue',
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    textAlignVertical: 'center',
    pointerEvents: 'box-none',
  },

  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 'auto',
    elevation: 1,
    width: 'auto',
    height: 'auto',
    marginBottom: 20,
  },
});
