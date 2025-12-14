import { ScrollView } from 'react-native'
import React from 'react'
import { Card, Header } from '@arturocastro/react-native-rnc-library-ntt'

type Props = {}

const CardScreen = ({}: Props) => {
  return (
    <>
        <Header title='Tarjetas' iconName=''/>
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