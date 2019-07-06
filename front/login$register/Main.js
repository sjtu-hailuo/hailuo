import React, { Component } from 'react';
import {ImageBackground, AppRegistry, Text, TextInput, View, StyleSheet,Button } from 'react-native';
import Login from './Login'
import TabNavigator from 'react-navigation'

export default class Main extends Component<Props> {
       static navigationOptions = {
              title: 'Main'
       };

  render() {
    let { params } = this.props.navigation.state;
    return (
    <ImageBackground source={require('./img/timg.jpg')} style={{width: '100%', height: '100%'}}>
    <Button
           style={{color:blue}}
    />
    <View style={{marginTop:500}}>
    <Text> Welcome! </Text>
    <Text> {params.name} </Text>
    <Text>You have entered the menu.</Text>
    </View>
    </ImageBackground>
    );
  };
  }