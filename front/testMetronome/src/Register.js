import React, { Component } from 'react';
import {ImageBackground, AppRegistry, Text, TextInput, View, StyleSheet,Button } from 'react-native';

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

export default class Register extends Component {
  static navigationOptions = {
    title: 'Register'
  };
  constructor(props) {
    super(props);
    this.state = {name: '',pwd: '',cpwd:''};
  }
  onPressCheck = ()=>{
    if (this.state.name.length>0 && this.state.pwd.length>0){
      if (this.state.pwd==this.state.cpwd){
        fetch('http://10.0.2.2:8080/user/register',{
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
            if (responseJson.username=='exist')  alert('This name has been registered.Please choose another one.')
            else {
              alert('Success! Go to the Login.')
              this.props.navigation.navigate('Login')
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      else alert('Failed to confirm your password.')
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
            onChangeText={(name) => this.setState({name})}/>

          <Text style={styles.bigblue}>Password:</Text>
          <TextInput
            style={{height: 100}}
            placeholder="Input your password here."
            onChangeText={(pwd) => this.setState({pwd})}/>

          <Text style={styles.bigblue}>Confirm Password:</Text>
          <TextInput
            style={{height: 100}}
            placeholder="Confirm your password here."
            onChangeText={(cpwd) => this.setState({cpwd})}/>

          <Button
            onPress={this.onPressCheck}
            title="Register"
            color="#841584"/>
        </View>
      </ImageBackground>
    );
  }
}
