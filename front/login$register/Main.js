import React, { Component } from 'react';
import {ImageBackground, AppRegistry, Text, TextInput, View, StyleSheet,Button } from 'react-native';

export default class Register extends Component {
static navigationOptions = {
              title: 'Main'
       };

  render() {
    return (
    <ImageBackground source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} style={{width: '100%', height: '100%'}}>
    <Text> You have entered the menu.</Text>
      </ImageBackground>
    );
  }
}
