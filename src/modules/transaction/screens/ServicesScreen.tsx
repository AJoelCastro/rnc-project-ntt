import { View, StyleSheet, FlatList } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Header, InputWithDelete, ServiceItem } from '@arturocastro/react-native-rnc-library-ntt'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { HomeStackParamList } from '@/navigation/root.stack/init.tabs/home/_layout'
import { MOCK_SERVICES } from '@/modules/shared/data/MockServices'

type Props = {}
type ServicesNavigationProp =
  NativeStackNavigationProp<HomeStackParamList, 'ServicesHome'>

const ServicesScreen = ({ }: Props) => {
  const navigation = useNavigation<ServicesNavigationProp>()
  const [search, setSearch] = useState('')

  const filteredServices = useMemo(() => {
    if (!search.trim()) return MOCK_SERVICES

    return MOCK_SERVICES.filter(service =>
      service.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])
  const onPressService = (id: number) => {
    navigation.navigate('ServiceDetailHome', { id })
  }
  return (
    <View style={styles.container}>
      <Header
        title="Servicios"
        iconName=""
        onBack={() => navigation.goBack()}
      />

      <View style={styles.input}>
        <InputWithDelete
          value={search}
          placeholder="Buscar servicio"
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServiceItem title={item.title} onPress={() => onPressService(item.id)} />
        )}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: '8%',
    marginHorizontal: 8,
  },
})

export default ServicesScreen
