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

const SignIn = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNavigateToHome() {
    navigation.navigate('Home', {
      email,
      password,
    });
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
              Separe seu lixo da maneira correta e preserve o nosso planeta
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta ou catadores de forma
              eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite a sua senha"
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            secureTextEntry={true}
          />

          <RectButton style={styles.button} onPress={handleNavigateToHome}>
            <View style={styles.buttonIcon}>
              <Feather name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
