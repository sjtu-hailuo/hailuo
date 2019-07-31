import React, { Component } from 'react';
import {
  Text, View, StyleSheet, SafeAreaView
} from 'react-native';
import {
  Button, Header, Overlay,
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Metronome from './src/metronome';
import Tuner from './src/tuner';
import Finder from './src/finder';
import Settings from './src/settings';
import SheetView from './src/sheet-view';

import Gradient from './src/gradient';
import { PitchSystem } from './src/music-core/pitch';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tempo: 80,
      config: {
        gradient: new Gradient(),
        pitchSystem: new PitchSystem(),
        showMetronome: true,
        showTuner: true,
      },
      overlay: null,
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const { config, tempo, overlay } = this.state;
    const { gradient, pitchSystem, showTuner, showMetronome } = config;
    return (
      <View style={styles.safeArea}>
        <Header
          containerStyle={{marginTop: 0, backgroundColor: gradient.toRGBA(0.5)}}
          leftComponent={
            <Button type='clear'
              icon={<MaterialCommunityIcons name='file-find' style={styles.HeaderButton} />}
              onPress={() => { this.setState({overlay: 'finder'}); }}
            />
          }
          centerComponent={{
            text: 'Pachelbel\'s Canon',
            style: { color: 'white', fontFamily: 'Palatino', fontSize: 24 },
          }}
          rightComponent={
            <Button type='clear'
              icon={<MaterialCommunityIcons name='settings' style={styles.HeaderButton} />}
              onPress={() => this.setState({overlay: 'settings'})}
            />
          }
        />
        <View style={{flex: 1}}>
          <Text>test1634</Text>
          <SheetView
            pitchSystem={pitchSystem}
            gradient={gradient}
          />
        </View>
        <View style={styles.floatButtons}>
          <Tuner
            gradient={gradient}
            pitchSystem={pitchSystem}
            show={showTuner}
            defaultActive={false}
          />
          <Metronome
            gradient={gradient}
            show={showMetronome}
            defaultTempo={tempo} defaultMuted={true}
          />
        </View>
        <Overlay
          isVisible={overlay !== null}
          windowBackgroundColor='rgba(255, 255, 222, 0.4)'
          overlayBackgroundColor={gradient.toRGBA(0.5, 0.94)}
          width='66.667%'
          height='66.667%'
          onBackdropPress={() => this.setState({ overlay: null})}
          borderRadius={12}
          overlayStyle={styles.overlay}
        >
          {
            overlay === 'finder' ? (
              <Finder
                gradient={gradient}
              />
            ) : ( overlay === 'settings' ? (
              <Settings
                config={config}
                getConfig={(config) => this.setState({config})}
              />
            ) : ( <View></View> ) )
          }
        </Overlay>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  floatButtons: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    borderColor: 'black',
    flexDirection: 'row',
    bottom: 0,
    marginBottom: '10%',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderButton: {
    fontSize: 24,
    color: 'white',
  },
});
