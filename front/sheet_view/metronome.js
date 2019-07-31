import React, { Component } from 'react'
import {
  Text, View, StyleSheet, DeviceEventEmitter, Button
} from 'react-native'

import {Overlay} from 'react-native-elements'
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
      met:false,
      mdf:false
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

  onPressDis = ()=>{
    if (this.state.met===false)
          this.setState({met:true})
    else
    this.setState({met:false})
    }

  _tic=() => {

    if (!this.state.muted) {
      this.wav.play();
    }
    this.ticTimer = setTimeout(this._tic.bind(this), 1000 * 60 / this.state.tempo);
  }

  _tempoOnPressIn1=() =>{
    this.setState({
      tempo: Math.min(Math.max(this.state.tempo + 1, this.props.minTempo), this.props.maxTempo),
      timeOutInterval: Math.max(this.state.timeOutInterval * this.props.timeOutRatio, 10),
      mdf:true
    });
    DeviceEventEmitter.emit('tempo', this.state.tempo);
    this.pressTimer = setTimeout(this._tempoOnPressIn1.bind(this, 1), this.state.timeOutInterval);
  }

  _tempoOnPressIn2=() =>{
      this.setState({
        tempo: Math.min(Math.max(this.state.tempo -1, this.props.minTempo), this.props.maxTempo),
        timeOutInterval: Math.max(this.state.timeOutInterval * this.props.timeOutRatio, 10),
        mdf:true
      });
      DeviceEventEmitter.emit('tempo', this.state.tempo);
      this.pressTimer = setTimeout(this._tempoOnPressIn2.bind(this, -1), this.state.timeOutInterval);
    }

  _tempoOnPressOut=() => {
    this.setState({
      timeOutInterval: 1000,
      mdf:false
    })
    clearTimeout(this.pressTimer)
  }

  _reverseMute=() => {
    this.setState(prev => ({muted: !prev.muted}));
  }

  render() {
    const { gradient, show } = this.props;
    if (!show) {
      return null;
    }
    return (
      <View style={{flex:1, backgroundColor: 'transparent'}}>
        <Overlay isVisible={this.state.met} onBackdropPress={() => this.setState({ met: false })}>
                           <View style={{alignItems: 'center',justifyContent: 'center'},{marginTop:300}}>
                           <Button title="Plus" color="#841584" disabled={this.state.mdf} onPress={this._tempoOnPressIn1}/>
                           <Text style={{height: 100}}> </Text>
                           <Button title="Minus" color="#841584" disabled={this.state.mdf} onPress={this._tempoOnPressIn2}/>
                           <Text style={{height: 100}}> </Text>
                           <Button title="Stop modifying the speed" disabled={!this.state.mdf} color="#841584" onPress={this._tempoOnPressOut}/>
                           <Text style={{height: 100}}> </Text>
                           <Button title="Play/Stop playing" color="#841584" onPress={this._reverseMute}/>
                           <Text style={{height: 100}}> </Text>
                           <Text style={{color:'blue'},{fontSize:40}}>
                                   Temporary speed: {this.state.tempo}
                           </Text>
                           </View>
        </Overlay>
        <Button title="M" color="#841584" onPress={this.onPressDis}/>
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
