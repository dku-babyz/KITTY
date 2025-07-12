import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const links = [
  { label: 'Wikipedia', url: 'https://wikipedia.org' },
  { label: 'YouTube', url: 'https://youtube.com' },
  { label: 'Google', url: 'https://google.com' },
  { label: 'Naver', url: 'https://naver.com' },
  { label: 'Daum', url: 'https://daum.net' },
  { label: 'Bing', url: 'https://bing.com' },
];

export default function SearchScreen() {
  const nav = useNavigation();
  const [query, setQuery] = useState('');

  const openLink = (url: string) => {
    const final = query ? `${url}/search?q=${encodeURIComponent(query)}` : url;
    Linking.openURL(final);
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Text style={styles.arrow}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      {/* 검색바 */}
      <View style={styles.searchBar}>
        <Image source={require('../../../assets/icon/search.png')} style={styles.sIcon} />
        <TextInput
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        {query !== '' && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Text style={styles.clear}>ⓧ</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 링크 버튼 6개 */}
      <View style={styles.grid}>
        {links.map(item => (
          <TouchableOpacity
            key={item.label}
            style={styles.btn}
            onPress={() => openLink(item.url)}>
            <Image
              source={require('../../../assets/icon/search.png')}
              style={styles.btnIcon}
            />
            <Text style={styles.btnTxt}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  arrow: { fontSize: 22, marginRight: 8 },
  headerTitle: { fontSize: 16, fontWeight: '700' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 16,
  },
  sIcon: { width: 18, height: 18, marginRight: 6, opacity: 0.6 },
  input: { flex: 1, fontSize: 14 },
  clear: { fontSize: 14, opacity: 0.6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  btn: {
    flexBasis: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  btnIcon: { width: 18, height: 18, marginRight: 6, opacity: 0.7 },
  btnTxt: { fontSize: 14 },
});
