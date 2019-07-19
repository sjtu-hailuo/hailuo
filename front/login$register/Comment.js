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

export default class Comment extends Component {
  static navigationOptions = {
      title: 'Comment'
  };
  constructor(props) {
    super(props);
    this.state = {CommentText: ''};  
  }
  
  onPressCheck = ()=>{
  if (this.state.CommentText.length>0){
      fetch('https://sjtuhailuo.xyz:8445/api/user/comment',{
                                           method: 'POST',
                                           headers: {
                                             'Accept': 'application/json',
                                             'Content-Type': 'application/json',
                                           },
                                           body: JSON.stringify({
                                             comment: this.state.comment,
                                           })
                                         }
                                         )
            .then((response) => response.json())
            .then((responseJson) => {
            	console.log(responseJson.message);
              if (responseJson.code==400)  alert('Comment Failed.')
              else {
              
                   alert('Success! Thank you for your advice.')
                   this.props.navigation.navigate('Main')
              }
            })
            .catch((error) => {
              console.error(error);
            });
  }
  else alert('Comment cannot be null!')
  }
  _onpress = () =>{
    TextInput.refs.into.clear();

  }
  render() {
    return (
    <ImageBackground style={{width: '100%', height: '100%'}}>

      <View style={{alignItems: 'center', marginTop: 200}}>
      <Text style={styles.bigblue}>Your Advice:</Text>
        <TextInput
          style={{height: 500}}
          placeholder='Talk about your advice.'
          ref='into'
          placeholder="Input your comment here."
          multiline= {true}
          placeholderTextColor = '#999999'
          numberOfLines = {10}
        
          onChangeText={(text) => this.setState({text})}
        />

  

                <Button
                  onPress={this.onPressCheck}
                  title="Submit"
                  color="#841584"
                />
                <Button
                  onPress={this._onpress}
                  title="Reset"
                  color="#841584"
                />
      </View>
      </ImageBackground>
    );
  }
}
