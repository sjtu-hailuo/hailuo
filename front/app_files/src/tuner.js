import React, { Component } from 'react';
import {
  Text, View, StyleSheet, DeviceEventEmitter
} from 'react-native';

import ActionButton from './modified_packs/react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MicStream from 'react-native-microphone-stream';

//import PitchFinder from 'pitchfinder';
//const detectPitch = PitchFinder.DynamicWavelet();

import { Constants } from './music-core/utils';
import PitchDetect from './music-core/YINDetector';
import PitchView from './music-core/pitch-view';
import { Pitch } from './music-core/pitch';

export default class Tuner extends Component {

  static get defaultProps() {
    return {
      defaultActive: true,
    };
  }

  constructor(props){
    super(props);
    this.state = {
      active: this.props.defaultActive,
      pitchFreq: null,
      showColor: true,
    };
  }

  componentDidMount() {
    if (this.props.defaultActive) {
      this._start();
    }
    this.prevActiveState = this.props.defaultActive;
    this.activeListener = DeviceEventEmitter.addListener('tuner', (data) => {
      if (data == 'turnOn') {
        this._start();
      } else if (data == 'tunOff') {
        this._stop();
      } else if (data == 'back') {
        if (this.prevActiveState) {
          this._start();
        } else {
          this._stop();
        }
      }
      this.prevActiveState = this.state.active;
    });
  }

  componentWillUnmount() {
    this._stop();
    this.activeListener.remove();
  }

  _start() {
    if (this.state.active == true) {
      return;
    }

    MicStream.init({
      bufferSize: Constants.bufferSize,
      sampleRate: Constants.sampleRate,
      bitsPerChannel: 16,
      channelsPerFrame: 1,
    });

    this.prevData = [];
    this.listener = MicStream.addListener(data => {
      let curData = this.prevData.concat(data);
      let i = 0, curPitchFreq = null;
      for (; i <= curData.length - Constants.bufferSize; i += Constants.hopSize) {
        curPitchFreq = PitchDetect(curData.slice(i, i + Constants.bufferSize));
        /*
        // This part is used for log the record data
        let dat = curData.slice(i, i + Constants.bufferSize);
        if (curPitchFreq) {
          console.log(dat.map((x) => `${x},`).join(' '));
          console.log('\n');
          console.log(curPitchFreq);
          console.log('\n');
        }
        */
        DeviceEventEmitter.emit('pitchMidi', this.props.pitchSystem.toMidi(curPitchFreq));
        DeviceEventEmitter.emit('pitchFreq', curPitchFreq);
      }
      this.prevData = curData.slice(i);
      this.setState({ pitchFreq: curPitchFreq });
    });

    MicStream.start();
    this.setState({ active: true });
  }

  _stop() {
    if (this.state.active == false) {
      return;
    }

    MicStream.stop();
    this.listener.remove();
    this.setState({
      active: false,
      pitchFreq: null,
    });
  }

  _reverseActive() {
    if (this.state.active) {
      this._stop();
    } else {
      this._start();
    }
  }

  render () {
    const { gradient, pitchSystem, show } = this.props;
    const { pitchFreq, showColor } = this.state;
    if (!show) {
      return null;
    }
    return (
      <View style={{flex:1, backgroundColor: 'transparent'}}>
        <ActionButton
          degrees={0} size={60} position='left' spacing={16} autoInactive={false}
          buttonColor={gradient.toRGBA(
            (showColor ? Pitch.error(pitchSystem.toMidi(pitchFreq)) * 0.618 : 0) + 0.5
          )}
          renderIcon={() => (
            <View style={styles.actionButton}>
              { this.state.active ?
                (pitchFreq == null ?
                  (<MaterialCommunityIcons name='record' style={styles.actionButton} />) : (
                    <PitchView
                      midi={pitchSystem.toMidi(pitchFreq)}
                      style={styles.actionButton}
                    />
                  )
                ):
                (<MaterialCommunityIcons name='tune' style={styles.actionButton} />)
              }
            </View>
          )}
          onLongPress={() => {this._reverseActive()}}
        >
          <ActionButton.Item buttonColor='#3498db' size = {48}
            onPress={() => {}}
          >
            <Text style={styles.errorDisplayButton}>{Pitch.errorRepr(pitchSystem.toMidi(pitchFreq))}</Text>
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#1abc9c' size = {48}
            onPressIn={() => this.setState({showColor: !showColor})}
          >
            <MaterialCommunityIcons
              name={showColor ? 'blur' : 'blur-off'}
              style={styles.actionButtonItem}
            />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButton: {
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    flexDirection: 'row',
  },
  errorDisplayButton: {
    color: 'white',
    fontFamily: 'Menlo',
    fontSize: 22,
  },
  actionButtonItem: {
    marginLeft: 2,
    fontSize: 24,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
