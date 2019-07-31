import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Picker, DeviceEventEmitter, ScrollView
} from 'react-native';

import { Sheet } from './music-core/sheet';
import { Pitch } from './music-core/pitch'
import PitchView from './music-core/pitch-view';
import Core from './music-core/core';
import {Button} from "react-native-elements";
import {WebView} from "react-native-webview";

export default class SheetView extends Component {

  constructor(props) {
    super(props);
    /*
     *  props includes
     *  - props.gradient for rendering
     */
    this.state = {
      rerender: false,
      /* TODO */
    };
    this.core = new Core();
    /*
     * TODO, for OSMD, like
     *   this.osmd = new OSMD(defaultSheet);
     * ?
     */
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
      'displaySheet', (item) => {
        var title = item.title;
        var type = item.type;
        console.log(RNFS.DocumentDirectoryPath+'/'+title+'.'+type);
        RNFS.exists(RNFS.DocumentDirectoryPath+'/'+title+'.'+type)
          .then((exists)=>{
            if(exists){
              console.log("Score found:"+title);
              //this.setState({sheet_route:`file://`+`${RNFS.ExternalDirectoryPath}/`+title+`.xml`})
              this.setState({sheet_route:`http://localhost:8081/src/musicxml/`+title+`.`+type});
              //this.setState({sheet_route:`http://localhost:8081/src/musicxml/firstdemo.xml`});
            }
            else{
              console.log("Score not found. Downloading Score:"+title);
              RNFS.downloadFile({
                fromUrl: 'https://sjtuhailuo.xyz:8445/scores/'+title+'.xml',
                toFile: `${RNFS.DocumentDirectoryPath}/`+title+'.xml',
              }).promise.then((r) => {
                //this.setState({sheet_route:`file://`+`${RNFS.ExternalDirectoryPath}/`+title+`.xml`});
                this.setState({sheet_route:`http://localhost:8081/src/musicxml/`+title+`.`+type});
                //this.setState({sheet_route:`http://localhost:8081/src/musicxml/firstdemo.xml`});
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
            console.log("Sending message");
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

    this.rerenderListener = DeviceEventEmitter.addListener(
      'rerenderPlz', (data) => {
        console.log(this.core.noteDeviation);
        var notes = [];
        for(var i=0;i<this.core.noteDeviation.length;i++){
          if(this.core.noteDeviation[i].dPitch>0.6){
            var tmp1 = [i,'high'];
            notes.push(tmp1);
          }
          else if(this.core.noteDeviation[i].dPitch<-0.6){
            var tmp2 = [i,'low'];
            notes.push(tmp2);
          }
        }
        const color_message = {
          type:'color',
          content:notes
        };
        this.setState({rerender: !this.state.rerender});
        console.log(color_message);
        if(notes.length > 0){
          this.webview.postMessage(JSON.stringify(color_message));
        }
      }
    );
  }

  componentWillUnmount() {
    this.rerenderListener.remove();
  }

  messageHandler(data){
    console.log(data);
    this.core.resetBySheetName(data);
    this.core.reset();
    console.log("reset");
  }

  render() {
    const {
      sheet,
      matchedInterval,
      noteDeviation,
    } = this.core;
    const { gradient } = this.props;
    return (
      <ScrollView>
        <View style={styles.sheetViewContainer}>
          {sheet.notes.map((note, i) => (
            <View key={i} style={styles.deviationLog}>
              <View style={{width: 200}}>
                <PitchView
                  midi={note.pitch}
                  style={Object.assign({}, styles.tempSheetNote, {
                    color : (matchedInterval[0] <= note.onset && note.offset <= matchedInterval[1] ?
                      'blue' : 'black'),
                  })}
                />
              </View>
              <View style={{width: 100}}>
                <Text>{Pitch.repr(note.withDeviation(noteDeviation[i]).pitch)}</Text>
              </View>
              <View style={{width: 100}}>
                <Text>{`${noteDeviation[i].dOnset.toFixed(3)}`.padStart(6, '0').padStart(7)}</Text>
              </View>
              <View style={{width: 100}}>
                <Text>{`${noteDeviation[i].dOffset.toFixed(3)}`.padStart(6, '0').padStart(7)}</Text>
              </View>
            </View>
          ))}
          <Text>{`${matchedInterval[0]}, ${matchedInterval[1]}`}</Text>
        </View>
        <WebView
          ref = { webview => this.webview = webview}
          //source={{ uri:'file:///android_asset/html/sheet_view.html'}}  *load html from native,failed,script not executed*
          source={{ uri:'http://localhost:8081/src/sheet-view.html'}}
          onMessage={event => {
            this.messageHandler(JSON.parse(event.nativeEvent.data));
          }}
          style={{flex: 0,height:1000}}
        />

      </ScrollView>

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
  deviationLog: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
