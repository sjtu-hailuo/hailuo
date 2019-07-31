import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Picker, DeviceEventEmitter
} from 'react-native';
import {
  CheckBox, Card, Input, Button
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pitch, PitchSystem } from './music-core/pitch';
//import PitchView from './music-core/pitch-view';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customMidi: 9,
      customAccidental: 0,
      customMidiOctave: 4,
      customFreqText: null,
      customFreq: this.props.config.pitchSystem.fA4,
      recording: false,
    };
  }

  _startRecording() {
    DeviceEventEmitter.emit('tuner', 'turnOn');
    this.pitchFreqListener = DeviceEventEmitter.addListener('pitchFreq', (data) => {
      if (data !== null) {
        this.setState({customFreq: data});
      }
    });
  }

  _stopRecording(customMidiRes) {
    const { config, getConfig } = this.props;
    const { customFreq } = this.state
    this.pitchFreqListener.remove();
    console.log('%%cc', customMidiRes, customFreq);
    getConfig(Object.assign(config, {
      pitchSystem: new PitchSystem(customFreq, customMidiRes),
    }))
    DeviceEventEmitter.emit('tuner', 'back');
  }

  render() {
    const { config, getConfig } = this.props;
    const {
      customMidi,
      customAccidental,
      customMidiOctave,
      customFreq,
      customFreqText,
      recording,
    } = this.state;
    const { pitchSystem, gradient } = config;
    const customMidiRes = customMidi + customAccidental + customMidiOctave * 12 + 12;
    return (
      <View height='95%' width='90%'>
        <CheckBox
          title='Show Metronome'
          checked={config.showMetronome}
          onPress={() => getConfig(Object.assign(config, {showMetronome: !config.showMetronome}))}
          right iconRight
        />
        <CheckBox
          title='Show Tuner'
          checked={config.showTuner}
          onPress={() => getConfig(Object.assign(config, {showTuner: !config.showTuner}))}
          right iconRight
        />
        <View style={styles.pitchSystemConfigContainer} backgroundColor='white' margin={10} >
          <View style={styles.pickersContainer}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerText}
              selectedValue={customAccidental + 1}
              onValueChange={(index) => this.setState({customAccidental: index-1})}
            >
              { ['♭', '♮', '♯'].map((value, i) => (
                <Picker.Item label={value} value={i} key={"money"+value}/>
              ))}
            </Picker>

            <Picker
              style={styles.picker}
              itemStyle={styles.pickerText}
              selectedValue={customMidi}
              onValueChange={(index) => this.setState({customMidi: index})}
            >
              { [0, 2, 4, 5, 7, 9, 11].map((value, i) => (
                <Picker.Item label={Pitch.noteNames[value]} value={value} key={"money"+value}/>
              ))}
            </Picker>

            <Picker
              style={styles.picker}
              itemStyle={styles.pickerText}
              selectedValue={customMidiOctave}
              onValueChange={(index) => this.setState({customMidiOctave: index})}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((value, i) => (
                <Picker.Item label={value.toString()} value={i+1} key={"money"+value}/>
              ))}
            </Picker>
          </View>

          <View style={styles.equalSignContainer}>
            <Text style={styles.pickerText}>=</Text>
          </View>

          <View style={styles.freqSetterContainer}>
            <Input
              containerStyle={[styles.inputContainer]}
              placeholder={`${
                (recording ? customFreq : pitchSystem.toFreq(customMidiRes)).toFixed(2)
              }`}
              onChangeText={(text) => this.setState({customFreqText: text})}
              onEndEditing={() => {
                let newFreq = Number(customFreqText) > 0 ? Number(customFreqText) : customFreq;
                this.setState({
                  customFreq: newFreq,
                  customFreqText: null,
                });
                getConfig(Object.assign(config, {
                  pitchSystem: new PitchSystem(newFreq, customMidiRes),
                }))
              }}
              editable={!recording}
              value={customFreqText}
            />
            <Button
              type='clear'
              icon={
                <MaterialCommunityIcons
                  name='record'
                  color={recording?'red':'rgba(222,222,222,1)'}
                  size={20}
                />
              }
              onPress={() => {
                recording ?
                  this._stopRecording(customMidiRes):
                  this._startRecording();
                this.setState({recording: !recording});
              }}
            />
          </View>
        </View>
        <View style={styles.restPartContainer}>
          <Text> </Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  pitchSystemConfigContainer: {
    flex: 1,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickersContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '5%',
  },
  freqSetterContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: '10%',
  },
  picker: {
    flex: 1,
  },
  equalSignContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Palatino',
  },
  inputContainer: {
    width: '100%',
  },
  restPartContainer: {
    flex: 1.5,
    borderRadius: 3,
  },
});
