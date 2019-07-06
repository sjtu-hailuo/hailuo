import React, { Component } from 'react';
import {ImageBackground, AppRegistry, Text, TextInput, View, StyleSheet,Button } from 'react-native';
import Register from './Register'

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default class Login extends Component {
  static navigationOptions = {
              title: 'Login'
       };
  constructor(props) {
    super(props);
    this.state = {name: '',pwd: ''};
  }
  onPressCheck = ()=>{
  if (this.state.name.length>0 && this.state.pwd.length>0){
      fetch('http://10.0.2.2:8080/login',{
                                           method: 'POST',
                                           headers: {
                                             'Accept': 'application/json',
                                             'Content-Type': 'application/json',
                                           },
                                           body: JSON.stringify({
                                             username: this.state.name,
                                             password: this.state.pwd,
                                           })
                                         }
                                         )
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.right==-1)  alert('No such user.')
              else if (responseJson.right==0)  alert('You have been banned!')
              else {
                   if (responseJson.password==this.state.pwd){
                       alert('Success! Go to the Menu.')
                       this.props.navigation.navigate('Main',{name:this.state.name})
                   }
                   else alert('Wrong password!');
              }
            })
            .catch((error) => {
              console.error(error);
            });
      }
      else alert('Name or Password cannot be null!')
    }

  render() {
    return (
    <ImageBackground source={require('./img/timg.jpg')} style={{width: '100%', height: '100%'}}>

      <View style={{alignItems: 'center', marginTop: 200}}>
      <Text style={styles.bigblue}>User Name:</Text>
        <TextInput
          style={{height: 100}}
          placeholder="Input your name here."
          onChangeText={(name) => this.setState({name})}
        />

        <Text style={styles.bigblue}>Password:</Text>
                <TextInput
                  style={{height: 100}}
                  placeholder="Input your password here."
                  onChangeText={(pwd) => this.setState({pwd})}
                />

                <Button
                  onPress={this.onPressCheck}
                  title="Login"
                  color="#841584"
                />
      </View>
      </ImageBackground>
    );
  }
}
