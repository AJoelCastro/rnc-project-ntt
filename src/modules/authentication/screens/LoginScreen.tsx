import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { InputEmail, InputPassword, SecureStorage } from '@arturocastro/react-native-rnc-library-ntt'
import { useLogin } from '@/store/LoginStore'

type Props = {
  navigation?: any
}

const LoginScreen = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [password, setPassword] = useState('')
  const navigate = useNavigation();
  const { setUserData } = useLogin()

  const onLogin = async () => {
    setIsLoading(true)
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña')
      setIsLoading(false)
      return
    }
    try {
      await SecureStorage.setItem('email', email)
      await SecureStorage.setItem('password', password)
      await SecureStorage.setItem('token', 'dummy-auth-token')
      setUserData({
        idUser: 10,
        name: "Cesar",
        lastName: "Solano",
        email: "cesar@hotmail.com",
        phone: "9426517213",
        token: "dummy-auth-token-zustand"
      })
      // Aquí iría la lógica real de autenticación
      setTimeout(() => {
        navigate.navigate('Init' as never)
        setIsLoading(false)
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al iniciar sesión'
      Alert.alert('Error', errorMessage)
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      
      <InputEmail
        value={email}
        onChangeText={setEmail}
        onValidation={setIsEmailValid}
      />
      <InputPassword
        value={password}
        onChangeText={setPassword}
      />

      {
        isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0a84ff" />
            <Text style={styles.loadingText}>Iniciando sesión...</Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={[styles.button, (!isEmailValid || !password) && styles.buttonDisabled]}
            onPress={onLogin}
            disabled={!isEmailValid || !password}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        )
      }

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
    backgroundColor: '#4c00ffff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonDisabled: {
    backgroundColor: '#9e9e9e', // Un color gris para indicar que está deshabilitado
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    backgroundColor: '#0a84ff',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 8,
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