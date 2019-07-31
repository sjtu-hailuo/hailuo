import React, { Component } from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';
import { Pitch } from './pitch';

export default class PitchView extends Component {

  static get defaultProps() {
    return {
      showOctave: true,
      showAccidental: true,
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { midi, style, showOctave, showAccidental } = this.props;
    inheritedStyle = {
      color: style.color,
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
    };
    scriptStyle = {
      fontSize: style.fontSize * 2 / 3,
      height: style.fontSize * 2 / 3,
    };
    return midi == 0 ? (
      <View style={style}>
        <Text style={style}>Rest</Text>
      </View>
    ) : (
      <View style={style}>
        <Text style={inheritedStyle}>{Pitch.step(midi)[0]}</Text>
        <View style={styles.noteScript}>
          <Text style={[inheritedStyle, scriptStyle]}>{showAccidental ? Pitch.step(midi).slice(1) : ''}</Text>
          <Text style={[inheritedStyle, scriptStyle]}>{showOctave ? Pitch.octave(midi) : ''}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  noteScript: {
    flexDirection: 'column',
  },
});
