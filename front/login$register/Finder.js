import React, { Component } from 'react';
import {
  Text, View, StyleSheet, ScrollView, FlatList
} from 'react-native';
import {
  ListItem, Card, SearchBar, Divider,
} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const songList = [
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

        var songs = songList;

export default class Finder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  };

  updateSearch = (searchText) => {
          this.setState({searchText});
          var j = 0;
          if (searchText==='') {
              songs=songList;
          } else {
              for (var i = 0; i < songList.length; i++) {
                   if (songList[i].title.indexOf(searchText)!==-1) {
                       songs[j] = songList[i];
                       ++j;
                   }
              }
          }
          for (var i = songList.length-1; i>= j; i--){
               delete songs[i];
          }
          alert(j)
  }


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
          data={songs}
          renderItem={
            ({item}) => (
              <ListItem
                containerStyle={styles.listItemContainer}
                title={item.title}
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
    color: 'blue',
    fontFamily: 'Palatino',
  },
  listSubtitle: {
    color: 'blue',
    fontFamily: 'Palatino',
    fontStyle: 'italic',
  },
  listIcon: {
    color: 'blue',
    fontSize: 32,
  },
});
