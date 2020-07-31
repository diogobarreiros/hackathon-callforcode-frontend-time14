import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { Feather } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import styles from './styles';

import api from '../../services/api';

interface Type {
  id: number;
  title: string;
  image_url: string;
}

interface Recycler {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Recyclers = () => {
  const navigation = useNavigation();

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [types, setTypes] = useState<Type[]>([]);
  const [recyclers, setRecyclers] = useState<Recycler[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Oops!',
          'Precisamos da sua permissão para obter a localização'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api
      .get('/recyclers', {
        params: {
          types: selectedTypes,
        },
      })
      .then((response) => {
        setRecyclers(response.data);
      });
  }, [selectedTypes]);

  useEffect(() => {
    api.get('/types').then((response) => {
      setTypes(response.data);
    });
  }, []);

  function handleSelectType(id: number) {
    const alreadySelected = selectedTypes.findIndex((type) => type === id);

    if (alreadySelected >= 0) {
      const filteredTypes = selectedTypes.filter((type) => type !== id);

      setSelectedTypes(filteredTypes);
    } else {
      setSelectedTypes([...selectedTypes, id]);
    }
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleNavigateToDetail(id: number) {
    navigation.navigate('Detail', { recycler_id: id });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" color="#34CB79" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo</Text>
        <Text style={styles.description}>
          Encontre no mapa um pronto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {recyclers.map((recycler) => (
                <Marker
                  key={String(recycler.id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(recycler.id)}
                  coordinate={{
                    latitude: recycler.latitude,
                    longitude: recycler.longitude,
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: 'https://callforcodeclimate2020.mybluemix.net/uploads/f5bd26ad7d18-logo2.png',
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{recycler.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.typesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {types.map((type) => (
            <TouchableOpacity
              key={String(type.id)}
              style={[
                styles.type,
                selectedTypes.includes(type.id) ? styles.selectedType : {},
              ]}
              onPress={() => handleSelectType(type.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={type.image_url} />
              <Text style={styles.typeTitle}>{type.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Recyclers;
