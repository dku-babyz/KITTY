import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import ChatListScreen from './ChatListScreen'; 
import FriendsScreen from './FriendsScreen';
import SearchScreen from './SearchScreen';
import SettingsScreen from './SettingsScreen';
import type { MainTabParamList } from '../../../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

const icon = {
    Home: require('../../../assets/icon/home.png'),
    Chat: require('../../../assets/icon/chat.png'),
    Friends: require('../../../assets/icon/friends.png'),
    Search: require('../../../assets/icon/search.png'),
    Settings: require('../../../assets/icon/settings.png'),
} as const;

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size }) => (
          <Image
            source={icon[route.name as keyof typeof icon]}
            style={{ width: size, height: size, opacity: focused ? 1 : 0.4 }}
          />
        ),
        tabBarStyle: { height: 60 },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatListScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
