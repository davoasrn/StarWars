import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Container from './Container';
import HomeWorld from './HomeWorld';

//as we use render callback for this screen we should use React.memo for optimization
const People = React.memo(({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState('all');
  const [url, setUrl] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  navigation.setOptions({
    headerTitle: 'People',
    headerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: '#ffe81f',
      backgroundColor: 'black',
    },
    headerTintColor: '#ffe81f',
    pressColorAndroid: 'white',
  });

  useEffect(() => {
    fetch('https://swapi.co/api/people/')
      .then((res) => res.json())
      .then((json) => {
        setData(json.results);
        setLoading(false);
      })
      .catch((err) => console.log('err:', err));
  }, []);

  const openHomeWorld = (homeworld) => {
    setUrl(homeworld);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const togglePicker = () => {
    setPickerVisible(!pickerVisible);
  };

  const filter = ({gender: star_gender}) => {
    setGender(star_gender);
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>Height: {item.height}</Text>
      <Text style={styles.info}>Birth Year: {item.birth_year}</Text>
      <Text style={styles.info}>Gender: {item.gender}</Text>
      <TouchableHighlight
        style={styles.button}
        onPress={() => openHomeWorld(item.homeworld)}>
        <Text style={styles.info}>View Homeworld</Text>
      </TouchableHighlight>
    </View>
  );

  if (gender !== 'all') {
    setData(data.filter((f) => f.gender === gender));
  }

  return (
    <Container>
      <TouchableHighlight
        style={styles.pickerToggleContainer}
        onPress={togglePicker}>
        <Text style={styles.pickerToggle}>
          {pickerVisible ? 'Close Filter' : 'Open Filter'}
        </Text>
      </TouchableHighlight>
      {loading ? (
        <ActivityIndicator color="#ffe81f" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
        />
      )}
      <Modal
        onRequestClose={() => console.log('onrequest close called')}
        animationType="slide"
        visible={modalVisible}>
        <HomeWorld closeModal={closeModal} url={url} />
      </Modal>
      {pickerVisible && (
        <View style={styles.pickerContainer}>
          <Picker
            style={{backgroundColor: '#ffe81f'}}
            selectedValue={gender}
            onValueChange={(item) => filter(item)}>
            <Picker.Item
              itemStyle={{color: 'yellow'}}
              label="All"
              value="all"
            />
            <Picker.Item label="Males" value="male" />
            <Picker.Item label="Females" value="female" />
            <Picker.Item label="Other" value="n/a" />
          </Picker>
        </View>
      )}
    </Container>
  );
});

const styles = StyleSheet.create({
  pickerToggleContainer: {
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerToggle: {
    color: '#ffe81f',
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffe81f',
  },
  name: {
    color: '#ffe81f',
    fontSize: 18,
  },
  info: {
    color: '#ffe81f',
    fontSize: 14,
    marginTop: 5,
  },
});

export default People;
