import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useTheme } from '@/modules/shared/hooks/useTheme'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { SecureStorage } from '@arturocastro/react-native-rnc-library-ntt'
import { useLogin } from '@/store/LoginStore'

type Props = {
  isInitializing?: boolean
  nextScreen?: string
}

const SplashScreen = ({ isInitializing, nextScreen }: Props) => {

  const { colors } = useTheme()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.5)).current
  const translateYAnim = useRef(new Animated.Value(50)).current
  const navigate = useNavigation();
  const { userData, setUserData } = useLogin()

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      // Aqui se valoida con el token nativo
      const token = await SecureStorage.getItem('token');

      // Aqui se valida con el token de store en zustandxs
      //const token = userData?.token

      if (token !== undefined && token !== null && token !== '') {
        console.log("Token found, navigating to Init:", token);
        setUserData({
          idUser: 10,
          name: "Arturo",
          lastName: "Castro",
          email: "arturo@gmail.com",
          phone: "924187731",
          token: "dummy-auth-token-zustand"
        })
        navigate.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Init' as never }, // Define la nueva pila con 'Init' como única ruta
            ],
          })
        );
      } else {
        console.log("No token found, navigating to Login.");
        navigate.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Login' as never }, // Define la nueva pila con 'Init' como única ruta
            ],
          })
        );
      }
    }
    if (isInitializing) {
      setTimeout(() => {
        checkTokenAndNavigate();
      }, 2000);
    }
    if (nextScreen) {
      setTimeout(() => {
        navigate.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: nextScreen as never }, // Define la nueva pila con 'Init' como única ruta
            ],
          })
        );
      }, 2000);
    }

    // Ejecutar la función asíncrona

    // Nota: Es mejor limpiar el efecto para evitar navegaciones duplicadas
    // si el componente se desmonta mientras la promesa está pendiente.
  }, [navigate, isInitializing, nextScreen, userData]) // Dependencia de navigate

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, scaleAnim, translateYAnim])

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Logo/Icon Container */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      >
        <View
          style={[
            styles.logoCircle,
            { backgroundColor: colors.backgroundHighlight },
          ]}
        >
          <Text style={[styles.logoText, { color: colors.textPrimary }]}>
            RNC
          </Text>
        </View>
      </Animated.View>

      {/* App Name */}
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
      >
        <Text style={[styles.appTitle, { color: colors.textPrimary }]}>
          RNC Project
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          by NTT
        </Text>
      </Animated.View>

      {/* Loading Indicator */}
      <Animated.View
        style={[
          styles.loaderContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={[styles.loaderBar, { backgroundColor: colors.backgroundHighlight }]} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: 2,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  loaderBar: {
    width: 200,
    height: 3,
    borderRadius: 1.5,
    opacity: 0.6,
  },
})

export default SplashScreen