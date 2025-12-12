import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { InputEmail, InputPassword } from '@arturocastro/react-native-rnc-library-ntt'

type Props = {
  navigation?: any
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigation();
  const onLogin = () => {
    // if (!email || !password) {
    //   Alert.alert('Error', 'Por favor ingresa email y contraseña')
    //   return
    // }
    // Aquí iría la lógica real de autenticación
    navigate.navigate('Init')
    // Alert.alert('Login', `Email: ${email}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      
      <InputEmail
        value={email}
        onChangeText={setEmail}
      />
      <InputPassword
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
          <Text style={styles.link}> Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0a84ff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    color: '#333',
  },
  link: {
    color: '#0a84ff',
    fontWeight: '600',
  },
})

export default LoginScreen