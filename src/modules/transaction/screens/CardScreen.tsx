import { ScrollView } from 'react-native'
import React from 'react'
import { Card, Header } from '@arturocastro/react-native-rnc-library-ntt'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const CardScreen = ({}: Props) => {

    const navigate = useNavigation();

  return (
    <>
        <Header title='Tarjetas' iconName='' onBack={()=>navigate.goBack()}/>
        <ScrollView>
            <Card type='black'/>
            <Card type='platinum'/>
            <Card type='gold'/>
            <Card type='blue'/>
        </ScrollView>
    </>
  )
}

export default CardScreen