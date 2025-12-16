import { View, Text, ScrollView, StyleSheet, useColorScheme, Linking, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MenuCard } from '../components/molecules/MenuCard';
import { useLogin } from '@/store/LoginStore';

type RootStackParamList = {
  Tarjetas: undefined;
  Movimientos: undefined;
  Préstamos: undefined;
  Servicios: undefined;
};

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {};

const WelcomeScreen = ({ }: Props) => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const { userData } = useLogin()
  const menuItems = [
    {
      id: 'tarjetas',
      title: 'Tarjetas',
      description: 'Se listarán tus tarjetas de crédito y débito',
      onPress: () => navigation.navigate('CardHome' as never),
    },
    {
      id: 'movimientos',
      title: 'Movimientos',
      description: 'Aquí verás todos tus movimientos',
      onPress: () => navigation.navigate('TransactionHome' as never),
    },
    {
      id: 'préstamos',
      title: 'Préstamos',
      description: 'Descubre los préstamos que tenemos para ti',
      onPress: () => navigation.navigate('LeanHome' as never),
    },
    {
      id: 'servicios',
      title: 'Servicios',
      description: 'Aquí podrás pagar todos tus servicios',
      onPress: () => navigation.navigate('ServicesHome' as never),
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5' }]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bienvenid@ <Text style={styles.name}>{userData?.name} {userData?.lastName}</Text></Text>
      </View>

      <View style={styles.gridContainer}>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.cardWrapper}>
            <MenuCard
              icon={<IconPlaceholder />}
              title={item.title}
              description={item.description}
              onPress={item.onPress}
            />
          </View>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'example://configuracion'
            )
          }
        >
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/006/801/514/small/settings-configuration-icon-solid-style-icon-design-element-icon-template-background-free-vector.jpg',
            }}
            style={{ width: 150, height: 150, marginHorizontal: 8 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://t4.ftcdn.net/jpg/02/13/97/75/360_F_213977586_B23DBDMd1BMTjb405USK26GKBnXTOULQ.jpg'
            )
          }
        >
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/02/13/97/75/360_F_213977586_B23DBDMd1BMTjb405USK26GKBnXTOULQ.jpg',
            }}
            style={{ width: 150, height: 150, marginHorizontal: 8 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://t4.ftcdn.net/jpg/02/13/97/75/360_F_213977586_B23DBDMd1BMTjb405USK26GKBnXTOULQ.jpg'
            )
          }
        >
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/02/13/97/75/360_F_213977586_B23DBDMd1BMTjb405USK26GKBnXTOULQ.jpg',
            }}
            style={{ width: 150, height: 150, marginHorizontal: 8 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
};

// Placeholder para iconos. Puedes reemplazar con icons reales de una librería
const IconPlaceholder = () => (
  <Text style={{ fontSize: 28, color: '#FFF' }}>📦</Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  name: {
    fontWeight: '700',
    color: '#7D2EFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  cardWrapper: {
    width: '50%',
  },
});

export default WelcomeScreen;