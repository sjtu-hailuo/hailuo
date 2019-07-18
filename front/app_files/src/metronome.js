import React, { Component } from 'react'
import {
  Text, View, StyleSheet, DeviceEventEmitter
} from 'react-native'

import Sound from 'react-native-sound'
import ActionButton from './modified_packs/react-native-action-button'
import PropTypes from "prop-types";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Metronome extends Component{

  static get defaultProps() {
    return {
      timeOutRatio : 0.7,
      minTempo: 30,
      defaultTempo : 90,
      maxTempo: 300,
      defaultMuted : false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      tempo: this.props.defaultTempo,
      muted: this.props.defaultMuted,
      timeOutInterval: 540,
    };
    this.pressTimer = null;
    this.ticTimer = null;
  }

  componentDidMount() {
    this.wav = new Sound('metronome_01.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      console.log(
        `duration in seconds: ${this.wav.getDuration()} number of channels: ${this.wav.getNumberOfChannels()}`
      );
    });
    DeviceEventEmitter.emit('tempo', this.state.tempo);
    this._tic();
  }

  componentWillUnmount() {
    clearTimeout(this.pressTimer);
    clearTimeout(this.ticTimer);
  }

  _tic() {
    if (!this.state.muted) {
      this.wav.play();
    }
    this.ticTimer = setTimeout(this._tic.bind(this), 1000 * 60 / this.state.tempo);
  }

  _tempoOnPressIn(amount) {
    this.setState({
      tempo: Math.min(Math.max(this.state.tempo + amount, this.props.minTempo), this.props.maxTempo),
      timeOutInterval: Math.max(this.state.timeOutInterval * this.props.timeOutRatio, 10),
    });
    DeviceEventEmitter.emit('tempo', this.state.tempo);
    this.pressTimer = setTimeout(this._tempoOnPressIn.bind(this, amount), this.state.timeOutInterval);
  }

  _tempoOnPressOut() {
    this.setState({
      timeOutInterval: 1000,
    });
    clearTimeout(this.pressTimer);
  }

  _reverseMute() {
    this.setState(prev => ({muted: !prev.muted}));
  }

  render() {
    const { gradient, show } = this.props;
    if (!show) {
      return null;
    }
    return (
      <View style={{flex:1, backgroundColor: 'transparent'}}>
        <ActionButton buttonColor={gradient.toRGBA(0.5)} degrees={0} autoInactive={false}
          size = {60} spacing = {16}
          renderIcon={(iconActive) => (
            <View style={styles.actionButton}>
              { iconActive ?
                (<Text style={styles.actionButton}>{this.state.tempo}</Text>):
                (<MaterialCommunityIcons name='metronome' style={styles.actionButton} />)
              }
            </View>
          )}
        >
          <ActionButton.Item buttonColor='#9b59b6' size = {48}
            onPressIn={() => {this._tempoOnPressIn(1)}}
            onPressOut={() => {this._tempoOnPressOut()}}
          >
            <MaterialCommunityIcons name="plus" style={styles.actionButtonItem} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#3498db' size = {48}
            onPressIn={() => {this._tempoOnPressIn(-1)}}
            onPressOut={() => {this._tempoOnPressOut()}}
          >
            <MaterialCommunityIcons name="minus" style={styles.actionButtonItem} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='#1abc9c' size = {48}
            onPress={() => {this._reverseMute()}}
          >
            <MaterialCommunityIcons name={
              this.state.muted ? 'volume-off' : 'volume-high'
            } style={styles.actionButtonItem} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButton: {
    fontSize: 24,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Menlo',
  },
  actionButtonItem: {
    fontSize: 24,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
