import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Picker, DeviceEventEmitter, ScrollView
} from 'react-native';
import { Button} from 'react-native-elements';
import { WebView } from 'react-native-webview';


import { Sheet } from './music-core/sheet';
import PitchView from './music-core/pitch-view';

export default class SheetView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matchedInterval: [0, 0],
      sheet_route:''
    };
  }


  componentDidMount() {
    var RNFS = require('react-native-fs');
    var count = 0;
    this.intervalListener = DeviceEventEmitter.addListener(
      'matchedInterval', (matchedInterval) => {
        this.setState({matchedInterval});
      }
    );
    this.rerenderListener = DeviceEventEmitter.addListener(
      'displaySheet', (title) => {
        console.log(RNFS.ExternalDirectoryPath+'/'+title+'.xml');
        RNFS.exists(RNFS.ExternalDirectoryPath+'/'+title+'.xml')
          .then((exists)=>{
            if(exists){
              console.log("Score found:"+title);
              //this.setState({sheet_route:`file://`+`${RNFS.ExternalDirectoryPath}/`+title+`.xml`})
              this.setState({sheet_route:`http://10.0.2.2:8081/src/musicxml/`+title+`.xml`});
            }
            else{
              console.log("Downloading Score:"+title);
              RNFS.downloadFile({
                fromUrl: 'https://sjtuhailuo.xyz:8445/scores/'+title+'.xml',
                toFile: `${RNFS.ExternalDirectoryPath}/`+title+'.xml',
              }).promise.then((r) => {
                //this.setState({sheet_route:`file://`+`${RNFS.ExternalDirectoryPath}/`+title+`.xml`});
                this.setState({sheet_route:`http://10.0.2.2:8081/src/musicxml/`+title+`.xml`});
                console.log("Score downloaded:"+title);
                const route_message2 = {
                  type:'route',
                  content:this.state.sheet_route
                };
                this.webview.postMessage(JSON.stringify(route_message2));
              });
            }
          })
          .then(()=> {
            console.log("Displaying score:"+title+" from "+this.state.sheet_route);
            const route_message = {
              type:'route',
              content:this.state.sheet_route
            };
            this.webview.postMessage(JSON.stringify(route_message));
          });
      }
    );

    this.modifyListener = DeviceEventEmitter.addListener(
      'modify_note', (note) => {
        const test = {
          bar:0,
          line:1,
          hpos:count,
          vpos:0,
          color:"#0000FF"
        };
        const color_message = {
          type:'color',
          content:test
        };
        this.webview.postMessage(JSON.stringify(color_message));
        count++;
      }
    );
    // RNFS.downloadFile({
    //   fromUrl: 'https://sjtuhailuo.xyz:8445/scores/Beethoven_AnDieFerneGeliebte.xml',
    //   toFile: `${RNFS.ExternalDirectoryPath}/test3.xml`,
    // }).promise.then((r) => {
    //   console.log(RNFS.ExternalDirectoryPath);
    // });
    // fetch('http://10.0.2.2:8445/api/scores/Beethoven_AnDieFerneGeliebte',{
    //   method: 'GET',
    //
    // }).then((response)=>{
    //   console.log(response);
    //
    //
    // })
  }


  componentWillUnmount() {
    this.intervalListener.remove();
  }

  render() {
    const { matchedInterval } = this.state;
    return (
      <ScrollView>
        <View>
          <Button
            title="Change color"
            onPress={()=>{DeviceEventEmitter.emit('modify_note', 'test');}}
          />
        </View>
        <WebView
          ref = { webview => this.webview = webview}
          //source={{ uri:'file:///android_asset/html/sheet_view.html'}}  *load html from native,failed,script not executed*
          source={{ uri:'http://10.0.2.2:8081/src/sheet_view.html'}}
          style={{flex: 0,height:1000}}
        />
      </ScrollView>


      //<View style={styles.sheetViewContainer}
      //</View>
    );
  }

}

const styles = StyleSheet.create({
  sheetViewContainer: {
    flex: 1,
  },
  tempSheetNote: {
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    flexDirection: 'row',
  },
});
