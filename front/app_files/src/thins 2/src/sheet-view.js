import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Picker, DeviceEventEmitter, ScrollView
} from 'react-native';

import { Sheet } from './music-core/sheet';
import PitchView from './music-core/pitch-view';
import Core from './music-core/core';

export default class SheetView extends Component {

  constructor(props) {
    super(props);
    /*
     *  props includes
     *  - props.gradient for rendering
     */
    this.state = {
      /* TODO */
    };
    this.core = new Core();
    /*
     * TODO, for OSMD, like
     *   this.osmd = new OSMD(defaultSheet);
     * ?
     */
  }

  componentDidMount() {
    this.rerenderListener = DeviceEventEmitter.addListener(
      'rerenderPlz', (data) => {
        /*
         * TODO, rerender after receiving it ---
         * The data is a string which could be
         * - 'newSheet',
         * - 'somethingHasBeenModifed',
         */
      }
    );
  }

  componentWillUnmount() {
    this.rerenderListener.remove();
  }

  render() {
    const {
      sheet,
      matchedInterval,
      noteDeviations,
    } = this.core;
    const { gradient } = this.props;
    return (
      <View style={styles.sheetViewContainer}>
        {sheet.notes.map((note, i) => (
          <PitchView
            key={i}
            midi={note.pitch}
            style={Object.assign({}, styles.tempSheetNote, {
              color : (matchedInterval[0] <= note.onset && note.offset <= matchedInterval[1] ?
                'blue' : 'black'),
            })}
          />
        ))}
        <Text>{`${matchedInterval[0]}, ${matchedInterval[1]}`}</Text>
      </View>
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
