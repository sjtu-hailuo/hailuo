import React, { Component } from 'react';
import {ImageBackground, AppRegistry, Text, TextInput, View, StyleSheet,Button } from 'react-native';
import Login from './Login'

export default class Register extends Component {
static navigationOptions = {
              title: 'Main'
       };

  render() {
    let { params } = this.props.navigation.state;
    return (
    <ImageBackground source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} style={{width: '100%', height: '100%'}}>
    <Text> Welcome! </Text>
    <Text> {params.name} </Text>
    <Text>You have entered the menu.</Text>
      </ImageBackground>
    );
  }
}
