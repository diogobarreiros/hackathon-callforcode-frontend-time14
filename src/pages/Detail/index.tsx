import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather, FontAwesome } from '@expo/vector-icons';
import styles from './styles';

import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

interface Params {
  recycler_id: number;
}

interface Data {
  recycler: {
    name: string;
    email: string;
    phone: string;
  };
  types: {
    title: string;
  }[];
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`/recyclers/${routeParams.recycler_id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.recycler.phone}&text=Tenho interesse em ajudar na coleta de resíduos`
    );
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.recycler.email],
    });
  }

  if (!data.recycler) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" color="#34CB79" size={24} />
        </TouchableOpacity>

        <Image
          style={styles.recyclerImage}
          source={{
            uri: 'https://callforcodeclimate2020.mybluemix.net/uploads/f5bd26ad7d18-logo2.png',
          }}
        />
        <Text style={styles.recyclerName}>{data.recycler.name}</Text>
        <Text style={styles.recyclerItems}>
          {data.types.map((type) => type.title).join(', ')}
        </Text>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
