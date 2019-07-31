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
import { PYinMain } from './music-core/YIN';
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
      startTime:'',
      endTime:''
    };
  }

  componentDidMount() {
    if (this.props.defaultActive) {
      this._start();
    }
    this.prevActiveState = this.props.defaultActive;
    this.pitchDetector = new PYinMain(this.props.pitchSystem);
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
      //  var time = new Date().getTime();
      //   console.log(time);
        let curData = this.prevData.concat(data);
        let i = 0, demoPitchFreq = null, validPitches = 0;
        for (; i <= curData.length - Constants.bufferSize; i += Constants.hopSize) {
          const curPitchFreq = this.pitchDetector.process(curData.slice(i, i + Constants.bufferSize));
          DeviceEventEmitter.emit('pitchMidi', this.props.pitchSystem.toMidi(curPitchFreq));
          DeviceEventEmitter.emit('pitchFreq', curPitchFreq);
          if (curPitchFreq !== null) {
            demoPitchFreq = ( (demoPitchFreq === null ? 0 : demoPitchFreq)
              * validPitches + curPitchFreq ) / (validPitches + 1);
            validPitches += 1;
          }
          /* This part is used for log the record data

          let dat = curData.slice(i, i + Constants.bufferSize);
          if (curPitchFreq) {
            console.log(dat.map((x) => `${x},`).join(' '));
            console.log('\n');
            console.log(curPitchFreq);
            console.log('\n');
          }
          */
        }
      this.prevData = curData.slice(i);
      this.setState({ pitchFreq: demoPitchFreq });
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
      var start =  this.state.startTime;
      var timee = new Date();
      var end = timee.getTime().toString();
      var dateDiff = end-start;//时间差的毫秒数
      console.log(dateDiff);
      var hours=Math.floor(dateDiff/(3600*1000));//计算出小时数
      //计算相差分钟数
      var leave2=dateDiff%(3600*1000)  ;  //计算小时数后剩余的毫秒数
      var minutes=Math.floor(leave2/(60*1000));//计算相差分钟数
      // 计算相差秒数
      var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
      var seconds=Math.round(leave3/1000);
      alert(`本次练习时长为${hours}小时${minutes}分钟${seconds}秒！`);
      this._stop();
    } else {
      this.setState({startTime:new Date().getTime().toString()})
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
