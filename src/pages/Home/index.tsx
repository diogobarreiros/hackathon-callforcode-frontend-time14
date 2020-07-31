import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const Home = () => {
  const navigation = useNavigation();

  function handleNavigateToRecyclers() {
    navigation.navigate('Recyclers');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginBottom: 25 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        style={styles.container}
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />

          <View>
            <Text style={styles.title}>
              Escolha para quem você quer entregar o seu lixo.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RectButton style={styles.button}>
            <View style={styles.buttonIcon}>
              <Feather name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Clique aqui para um catador ou empresa busque seu lixo</Text>
          </RectButton>
          <RectButton style={styles.button}  onPress={handleNavigateToRecyclers}>
            <View style={styles.buttonIcon}>
              <Feather name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Entregue seu lixo em um ponto de coleta</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
