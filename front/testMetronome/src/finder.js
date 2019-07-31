import React, { Component } from 'react';
import {
  Text, View, StyleSheet, ScrollView, FlatList, DeviceEventEmitter
} from 'react-native';
import {
  ListItem, Card, SearchBar, Divider,
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

var songList = [
  {
    title: 'Pachelbel\'s Canon',
    composer: 'Johann Sebastian Bach',
    icon: 'violin',
  },
  {
    title: 'Zigeunerweisen',
    composer: 'Pablo de Sarasate',
    icon: 'violin',
  },
  {
    title: 'La campanella',
    composer: 'Niccolò Paganini',
    icon: 'violin',
  },
  {
    title: 'Bohemian Rhapsody',
    composer: 'Queen',
    icon: 'chess-queen',
  },
  {
    title: 'Theme from \"Schindler\'s List\"',
    composer: 'John Williams',
    icon: 'violin',
  },
  {
    title: 'Le Quattro Stagioni',
    composer: 'Antonio Vivaldi',
    icon: 'violin',
  },
  {
    title: 'Op.25 No.11 in A minor (\"Winter Wind\")',
    composer: 'Fryderyk Franciszek Chopin',
    icon: 'piano',
  },
  {
    title: 'Theme from \"Magic Flute\"',
    composer: 'Wolfgang Amadeus Mozart',
    icon: 'guitar-acoustic',
  },
  {
    title: 'Autumn Leaves',
    composer: 'Joseph Kosma',
    icon: 'saxophone',
  },
  {
    title: 'Moonlight Sonata',
    composer: 'Ludwig van Beethoven',
    icon: 'piano',
  },
];


export default class Finder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      songs:'',
    };
  };

  componentDidMount() {
    fetch('https://sjtuhailuo.xyz:8445/api/scores/list',{
      method: 'GET',
    }).then((response)=> response.json())
      .then((responseJson)=>{
        this.setState({songs:responseJson});
        songList = this.state.songs;
      })

  }

  updateSearch = (searchText) => {
    this.setState({searchText:searchText});
    var s = JSON.parse(JSON.stringify(songList));

    if (searchText==='') {
      this.setState({songs:songList}/*,()=>{alert("!"+this.state.songs[0].title)}*/);
    } else {
      for (var i = 0; i < songList.length; i++) {
        if (songList[i]!=null && songList[i].title.indexOf(searchText)===-1)
          delete s[i];
      }
      s=s.filter(function(val){return val});

      for (var i=0;i<s.length;++i){
        for (var j=i;j<s.length;++j){
          if (s[i].title.indexOf(searchText) > s[j].title.indexOf(searchText)){
            var t = s[i];
            s[i]=s[j];
            s[j]=t;
          }
        }
      }
      this.setState({songs:s});
    }
  };


  render() {
    const { searchText } = this.state;
    const { gradient } = this.props;

    return (
      <View height='100%' width='100%' style={{marginTop: 80}}>
        <SearchBar
          placeholder='Search sheets here...'
          onChangeText={this.updateSearch}
          inputStyle={{fontFamily: 'Palatino'}}
          value={searchText}
          allDataOnEmptySearch={true}
          lightTheme round
          containerStyle={styles.searchBarContainer}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
          data={this.state.songs}
          renderItem={
            ({item}) => (
              <ListItem  onPress={() => this._onItemClick(item)}
                         containerStyle={styles.listItemContainer}
                         title={item.title}
                //_onItemClick(item) {                        alert(item.title)                    }
                         titleStyle={styles.listTitle}
                         subtitle={item.composer}
                         subtitleStyle={styles.listSubtitle}
                         leftIcon={<MaterialCommunityIcons name={item.icon} style={styles.listIcon}/>}
                         bottomDivider chevron
              />
            )
          }
        />
      </View>
    );
  }
  _onItemClick(item) {
    alert(item.title);
    DeviceEventEmitter.emit('displaySheet', item);
  }

}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
  },
  listItemContainer: {
    backgroundColor: 'transparent',
  },
  listTitle: {
    color: 'white',
    fontFamily: 'Palatino',
  },
  listSubtitle: {
    color: 'white',
    fontFamily: 'Palatino',
    fontStyle: 'italic',
  },
  listIcon: {
    color: 'white',
    fontSize: 32,
  },
});
