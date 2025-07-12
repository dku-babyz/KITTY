import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const kitty = require('../../assets/logo/kitty.jpeg');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={kitty} style={styles.kittyImg} />
      <Text style={styles.caption}>행복한 키티</Text>
      {/* TODO: 퀘스트·일기 카드 등 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dbeafe', justifyContent: 'center' },
  kittyImg: { width: 180, height: 180, alignSelf: 'center' },
  caption: { textAlign: 'center', marginTop: 12, fontWeight: '700' },
});
