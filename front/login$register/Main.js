import React, { Component } from 'react';
import {ImageBackground, AppRegistry, Text, TextInput, View, StyleSheet,Button } from 'react-native';
import Login from './Login'
import TabNavigator from 'react-navigation'
import {Overlay} from 'react-native-elements'
import Finder from './Finder'

export default class Main extends Component<Props> {
       static navigationOptions = {
              title: 'Main'
       };

constructor(props) {
    super(props);
    this.state = {isVisible:false};
  }

  render() {
    let { params } = this.props.navigation.state;

    return (
    <ImageBackground source={require('./img/timg.jpg')} style={{width: '100%', height: '100%'}}>
    <View style={{marginTop:200}}>
    <Text> Welcome! </Text>
    <Text> {params.name} </Text>
    <Text>You have entered the menu.</Text>

    <Button title="Open the songlist" onPress={() => this.setState({ isVisible:true})} />

    <Overlay isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}>
      <View>
             <Finder></Finder>
      </View>

    </Overlay>

    </View>
    </ImageBackground>
    );
  };
  }