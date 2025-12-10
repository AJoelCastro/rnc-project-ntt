import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

type Props = {};

const LeanScreen = (props: Props) => {
  const [docType, setDocType] = useState<'D.N.I.' | 'R.U.C.'>('D.N.I.');
  const [docNumber, setDocNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [amount, setAmount] = useState('');
  const [installments, setInstallments] = useState('');

  const clear = (setter: (v: string) => void) => () => setter('');

  const onSubmit = () => {
    // simple validation
    if (!docNumber.trim()) return Alert.alert('Validación', 'Ingrese número de documento');
    if (!email.trim() || !email.includes('@')) return Alert.alert('Validación', 'Ingrese un correo válido');
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Formulario</Text>
        <Text style={styles.subtitle}>Completa tus datos y un colaborador se contactará contigo</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.docTypeButton}
            onPress={() => setDocType((d) => (d === 'D.N.I.' ? 'R.U.C.' : 'D.N.I.'))}
            accessibilityLabel="Cambiar tipo de documento"
          >
            <Text style={styles.docTypeText}>{docType} <Text style={styles.chev}>⌃</Text></Text>
          </TouchableOpacity>

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

        <View style={styles.fieldWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.fieldWrapperRow}>
          <TextInput
            style={styles.input}
            placeholder="Número de celular"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          {phone.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clear(setPhone)}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.fieldWrapperRow}>
          <TextInput
            style={styles.input}
            placeholder="Nombres"
            value={firstName}
            onChangeText={setFirstName}
          />
          {firstName.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clear(setFirstName)}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.fieldWrapperRow}>
          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            value={lastName}
            onChangeText={setLastName}
          />
          {lastName.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clear(setLastName)}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.fieldWrapperRow}>
          <TextInput
            style={styles.input}
            placeholder="Monto del prestamo"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          {amount.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={clear(setAmount)}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.fieldWrapperRow}>
          <TouchableOpacity style={[styles.input, styles.selectInput]} onPress={() => { /* aquí podrías abrir un picker */ }}>
            <Text style={styles.selectText}>{installments || 'Cuotas'}</Text>
            <Text style={styles.chev}>⌃</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={onSubmit} accessibilityLabel="Enviar datos">
          <Text style={styles.submitText}>Enviar datos</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F5F5F5',
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
    marginBottom: 12,
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
    paddingVertical: 14,
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