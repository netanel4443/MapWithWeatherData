import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {shallowEqual} from 'react-redux';
import {MapState, MarkerData} from '../mapscreen/mapSlice';
import {useAppSelector} from '../redux/reduxHooks';
import {RootState} from '../redux/store';

const SavedDataScreen = () => {
  const {markersDataTexts} = useAppSelector(
    (state: RootState) => ({
      markersDataTexts: state.mapSlice.markersDataTexts,
    }),
    shallowEqual,
  );

  const createListItem = () => {
    const elements: React.ReactElement[] = [];
    Object.keys(markersDataTexts).map(key => {
      elements.push(
        <Text key={key} style={styles.item}>
          {' '}
          {markersDataTexts[key]}{' '}
        </Text>,
      );
    });

    return elements;
  };

  return (
    <View style={styles.container}>
      <Text style = {styles.description}>
        In this screen there are weather data by selected markers on the screen
      </Text>

      <ScrollView style={styles.list}>{createListItem()}</ScrollView>
    </View>
  );
};

export default SavedDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    marginTop: 10,
    fontStyle: 'italic',
    color: 'black',
    padding: 5,
  },
  list: {
    marginTop: 10,
  },
  item: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    padding: 5,
    elevation: 5,
    marginBottom: 10,
    fontStyle: 'italic',
    color: 'black',
  },
});
