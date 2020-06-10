import React from 'react';
import {TouchableHighlight, Text, FlatList, StyleSheet} from 'react-native';
import Container from './Container';

const links = [
  {title: 'People'},
  {title: 'Films'},
  {title: 'StarShips'},
  {title: 'Vehicles'},
  {title: 'Species'},
  {title: 'Planets'},
];

const StarWars = ({navigation}) => {
  navigation.setOptions({
    headerTitle: (
      <Text style={{fontSize: 34, color: 'rgb(255, 232, 31)'}}>Star Wars</Text>
    ),
    headerStyle: {backgroundColor: 'black', height: 110},
  });

  const renderItem = ({item, index}) => (
    <TouchableHighlight
      onPress={() => navigation.navigate(item.title)}
      style={[styles.item, {borderTopWidth: index === 0 ? 1 : null}]}>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableHighlight>
  );

  return (
    <Container>
      <FlatList
        data={links}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    justifyContent: 'center',
    borderColor: 'rgba(255,232,31, .2)',
    borderBottomWidth: 1,
  },
  text: {
    color: '#ffe81f',
    fontSize: 18,
  },
});

export default StarWars;
