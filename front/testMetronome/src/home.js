import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground
}from 'react-native'

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  };
  render(){
    const navigate = this.props.navigation;
    return (
      <ImageBackground source={require('./img/timg.jpg')} style={{width: '100%', height: '100%'}}>
        <View style={{alignItems: 'center',justifyContent: 'center'},{marginTop:300}}>
          <Button
            title="Go to Login"
            onPress={()=>navigate.navigate('Login')}
          />
          <Text style={{height: 100}}> </Text>
          <Button
            title="Go to Register"
            onPress={()=>navigate.navigate('Register')}
          />
          <Text style={{height: 100}}> </Text>
          <Button
            title="Visitor,experience first."
            onPress={()=>navigate.navigate('Main',{name:'Visitor'})}
          />
        </View>
      </ImageBackground>
    );
  }
}
