import React, { Component } from 'react';
import {Text, TextInput, View, StyleSheet,Button ,DeviceEventEmitter } from 'react-native';
import TabNavigator from 'react-navigation'
import {Overlay} from 'react-native-elements'
import SheetView from './sheet-view'

export default class Exercise extends Component<Props> {
constructor(props) {
    super(props);
    this.state = {isVisible:false,title:''};
  }

  componentDidMount(){
    this.listener=DeviceEventEmitter.addListener('title',(title)=>{
        this.setState({title:title});
        this.setState({isVisible:true});
        /*fetch('http://10.0.2.2:8080/login',{
              method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({
              title: this.state.title,
              })
        }
        )
        .then((response) => response.blob())
        .then((responseJson) => {*/
    });
  };

  componentWillUnmount(){
      this.listener.remove();
  };

  render() {
    return (
    <Overlay isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}>
             <View>
             <Text>{this.state.title}</Text>
             </View>
    </Overlay>
    );
  };
  }