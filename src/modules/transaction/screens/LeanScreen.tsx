import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Button, Header, InputEmail, InputWithDelete, SecureStorage, Selector } from '@arturocastro/react-native-rnc-library-ntt';
import { useNavigation } from '@react-navigation/native';
import { SelectorItem } from 'node_modules/@arturocastro/react-native-rnc-library-ntt/lib/typescript/src/modules/shared/types';

type Props = {};

const installmentOptions: SelectorItem[] = [
  { id: 1, label: '3 cuotas' },
  { id: 2, label: '6 cuotas' },
  { id: 3, label: '12 cuotas' },
];
const docOptions: SelectorItem[] = [
  { id: 1, label: 'DNI' },
  { id: 2, label: 'RUC' },
];

const LeanScreen = ({}: Props) => {
  
  const [docType, setDocType] = useState<number | string>('');
  const [docNumber, setDocNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [amount, setAmount] = useState('');
  const [installments, setInstallments] = useState<number | string>('');

  const navigation = useNavigation();

  const onSubmit = () => {
    if (!docNumber.trim()) return Alert.alert('Validación', 'Ingrese número de documento');
    if (!phone.trim()) return Alert.alert('Validación', 'Ingrese teléfono');

    const payload = {
      docType,
      docNumber,
      email,
      phone,
      firstName,
      lastName,
      amount,
      installments,
    };

    console.log('Enviar datos:', payload);
    Alert.alert('Enviado', 'Tus datos han sido enviados.');
  };

  const getNativeData = async() => {
    const emailNative = await SecureStorage.getItem('email')
    const phoneNative = await SecureStorage.getItem('phone')
    const nameNative = await SecureStorage.getItem('name')
    const lastNameNative = await SecureStorage.getItem('lastName')
    setEmail(emailNative!)
    setPhone(phoneNative!)
    setFirstName(nameNative!)
    setLastName(lastNameNative!)
  }
  const handleInstallmentSelect = (item: SelectorItem) => {
    setInstallments(item.id);
  };
  const handleDocSelect = (item: SelectorItem) => {
    setDocType(item.id);
  };
  useEffect(() => {
    getNativeData()
  }, [])
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title='Préstamos' iconName='' onBack={()=>navigation.goBack()}/>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Formulario</Text>
        <Text style={styles.subtitle}>Completa tus datos y un colaborador se contactará contigo</Text>

        <View style={styles.row}>
          <View style={{minWidth: '30%'}}>
            <Selector
              items={docOptions}
              onSelect={handleDocSelect}
              selectedId={docType}
              placeholder='Doc'
            />
          </View>
          <View style={styles.flexInput}>
            <TextInput
              style={[styles.input, styles.inputRight]}
              placeholder="75012345"
              keyboardType="number-pad"
              value={docNumber}
              onChangeText={setDocNumber}
            />
          </View>
        </View>

        <InputEmail
          value={email}
          onChangeText={setEmail}
          onValidation={setIsValidEmail}
          placeholder='Correo'
        />
        <InputWithDelete
          value={phone}
          onChangeText={setPhone}
          placeholder='Teléfono'
        />
        <InputWithDelete
          value={firstName}
          onChangeText={setFirstName}
          placeholder='Nombres'
        />
        <InputWithDelete
          value={lastName}
          onChangeText={setLastName}
          placeholder='Apellidos'
        />
        <InputWithDelete
          value={amount}
          onChangeText={setAmount}
          placeholder='Monto del préstamo'
        />
        <View style={{gap: 16}}>
          <Selector
            items={installmentOptions}
            onSelect={handleInstallmentSelect}
            placeholder="Seleccione número de cuotas"
            selectedId={installments}
          />

          <Button
              title='Enviar datos'
              type='secondary'
              onPress={onSubmit}
              disabled={!isValidEmail}
          />
        </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111',
  },
  subtitle: {
    color: '#6b6b85',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4
  },
  docTypeButton: {
    borderWidth: 1.5,
    borderColor: '#7D2EFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 12,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  docTypeText: {
    color: '#7D2EFF',
    fontWeight: '600',
  },
  chev: {
    color: '#7D2EFF',
    fontSize: 12,
  },
  flexInput: {
    flex: 1,
  },
  fieldWrapper: {
    marginBottom: 12,
  },
  fieldWrapperRow: {
    marginBottom: 12,
    position: 'relative',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#7D2EFF',
    fontSize: 14,
  },
  inputRight: {
    // nothing special for now
  },
  clearButton: {
    position: 'absolute',
    right: 14,
    top: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    color: '#666',
    fontSize: 14,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  selectText: {
    color: '#999',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  submitText: {
    color: '#111',
    fontWeight: '600',
  },
});

export default LeanScreen;