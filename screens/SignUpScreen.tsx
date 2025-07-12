import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

export default function SignUpScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /* ─────── 상태 ─────── */
  const [userId, setUserId] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [idMsg, setIdMsg] = useState('');

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  /* ─────── 정규식 ─────── */
  const idRegex = /^[A-Za-z\d]{4,12}$/;
  const phoneRegex = /^\d{10,11}$/;
  const pwRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{}|\\:;'"<>,.?/~`+=_-]).{8,}$/;

  /* ─────── 아이디 중복 확인 (더미) ─────── */
  const handleCheckId = async () => {
    if (!idRegex.test(userId)) {
      setIdMsg('형식이 올바르지 않습니다.');
      setIsIdChecked(false);
      return;
    }

    setChecking(true);
    // TODO: 실제 서버 호출로 변경
    await new Promise(r => setTimeout(r, 600)); // 모의 네트워크 지연
    const isTaken = userId.toLowerCase() === 'kitty'; // 예: "kitty"는 이미 사용중

    if (isTaken) {
      setIdMsg('이미 사용 중인 아이디입니다.');
      setIsIdChecked(false);
    } else {
      setIdMsg('사용 가능한 아이디입니다.');
      setIsIdChecked(true);
    }
    setChecking(false);
  };

  /* ─────── 폼 전체 검증 ─────── */
  const validate = () => {
    if (!isIdChecked) {
      setErrorMsg('아이디 중복 확인을 해주세요.');
      return false;
    }
    const cleanPhone = phone.replace(/-/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg('전화번호 형식이 올바르지 않습니다.');
      return false;
    }
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

    Alert.alert('회원가입 완료', '로그인 페이지로 이동합니다.', [
      { text: '확인', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      {/* ─── 아이디 + 중복확인 ─── */}
      <Text style={styles.label}>아이디</Text>
      <View style={styles.idRow}>
        <TextInput
          value={userId}
          onChangeText={text => {
            setUserId(text);
            setIsIdChecked(false);
            setIdMsg('');
          }}
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.idBtn} onPress={handleCheckId}>
          {checking ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.idBtnTxt}>중복확인</Text>
          )}
        </TouchableOpacity>
      </View>
      {idMsg !== '' && (
        <Text style={[styles.helper, !isIdChecked && { color: '#dc2626' }]}>
          {idMsg}
        </Text>
      )}

      {/* 전화번호 */}
      <Text style={styles.label}>전화번호</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="01012345678"
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
  /* 레이아웃 */
  container: {
    flex: 1,
    backgroundColor: '#e8f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1e40af', marginBottom: 32 },

  /* 아이디 행 */
  idRow: { flexDirection: 'row', alignItems: 'center' },
  idBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  idBtnTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },

  /* 라벨·입력 */
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

  /* 텍스트 */
  helper: { alignSelf: 'flex-start', marginTop: 4, fontSize: 12, color: '#6b7280' },
  error: { alignSelf: 'flex-start', marginTop: 4, fontSize: 13, color: '#dc2626', fontWeight: '600' },

  /* 버튼·푸터 */
  primaryBtn: {
    backgroundColor: '#2563eb',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { marginTop: 24, fontSize: 14, color: '#555' },
  link: { color: '#2563eb', fontWeight: 'bold' },
});
