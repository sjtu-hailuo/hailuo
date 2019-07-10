import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Picker, DeviceEventEmitter, ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Sheet } from './music-core/sheet';
import PitchView from './music-core/pitch-view';

export default class SheetView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matchedInterval: [0, 0],
    };
  }

  componentDidMount() {
    this.intervalListener = DeviceEventEmitter.addListener(
      'matchedInterval', (matchedInterval) => {
        this.setState({matchedInterval});
      }
    );
  }

  componentWillUnmount() {
    this.intervalListener.remove();
  }

  render() {
    const { matchedInterval } = this.state;
    return (
      <WebView
        source={{ uri:'http://localhost:8081/src/sheet_view.html' }}
        style={{flex: 1}}
      />
      //<View style={styles.sheetViewContainer}
      //</View>
    );
  }

}

const styles = StyleSheet.create({
  sheetViewContainer: {
    flex: 1,
  },
  tempSheetNote: {
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    flexDirection: 'row',
  },
});
