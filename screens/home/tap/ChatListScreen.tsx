import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const chats = [
  { id: '1', avatar: require('../../../assets/logo/kitty.jpeg'), name: 'Family', sub: '1' },
  { id: '2', avatar: require('../../../assets/logo/kitty.jpeg'), name: 'School Friends', sub: '2' },
  { id: '3', avatar: require('../../../assets/logo/kitty.jpeg'), name: 'Classmates', sub: '3' },
  { id: '4', avatar: require('../../../assets/logo/kitty.jpeg'), name: 'Playground Buddies', sub: '4' },
  { id: '5', avatar: require('../../../assets/logo/kitty.jpeg'), name: 'Neighborhood Kids', sub: '5' },
];

export default function ChatListScreen() {
  return (
    <View style={styles.container}>
      {/* ─── 헤더 ─── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>

        {/* 우측 + 버튼 */}
        <TouchableOpacity style={styles.plusBtn}>
          <Text style={styles.plusTxt}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* ─── 채팅 리스트 ─── */}
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <Image source={item.avatar} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.sub}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  /* ─── 헤더 ─── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 47,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    flex: 1,                 // 남는 공간 모두 차지 → 중앙정렬
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  plusBtn: {
    position: 'absolute',    // 헤더 우측 끝에 고정
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  plusTxt: { fontSize: 22, color: '#2563eb', fontWeight: '600' },

  /* ─── 채팅 셀 ─── */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 72,             
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 14 },
  name: { fontSize: 17, fontWeight: '700' },
  sub: { fontSize: 13, color: '#6b7280' },

  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#f3f4f6' },
});
