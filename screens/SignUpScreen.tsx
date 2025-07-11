import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

export default function SignUpScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 8자↑, 영문·숫자·특수문자 각 1개 이상
  const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}|\\:;'"<>,.?/~`+=_-]).{8,}$/;

  const validate = () => {
    if (!pwRegex.test(password)) {
      setErrorMsg('비밀번호 형식이 올바르지 않습니다.');
      return false;
    }
    if (password !== passwordConfirm) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSignUp = () => {
    if (!validate()) return;

    // TODO: API 연동
    Alert.alert('회원가입 완료', '로그인 페이지로 이동합니다.', [
      { text: '확인', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      {/* 아이디 */}
      <Text style={styles.label}>아이디</Text>
      <TextInput
        value={userId}
        onChangeText={setUserId}
        style={styles.input}
        autoCapitalize="none"
      />

      {/* 비밀번호 */}
      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Text style={styles.helper}>* 영문, 숫자, 특수문자 포함 8자 이상</Text>

      {/* 비밀번호 확인 */}
      <Text style={styles.label}>비밀번호 확인</Text>
      <TextInput
        secureTextEntry
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        style={styles.input}
      />
      {errorMsg !== '' && <Text style={styles.error}>{errorMsg}</Text>}

      <TouchableOpacity style={styles.primaryBtn} onPress={handleSignUp}>
        <Text style={styles.btnText}>회원가입</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        이미 계정이 있으신가요?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          로그인
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 32,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    fontSize: 16,
  },
  helper: {
    alignSelf: 'flex-start',
    marginTop: 4,
    fontSize: 12,
    color: '#6b7280',
  },
  error: {
    alignSelf: 'flex-start',
    marginTop: 4,
    fontSize: 13,
    color: '#dc2626',
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: '#2563eb',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { marginTop: 24, fontSize: 14, color: '#555' },
  link: { color: '#2563eb', fontWeight: 'bold' },
});
