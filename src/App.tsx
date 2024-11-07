import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeScreen} from './screens/HomeScreen';
import {SearchScreen} from './screens/SearchScreen';
import {WishlistScreen} from './screens/WishlistScreen';
import {ProfileScreen} from './screens/ProfileScreen';
import { COLORS } from './common/theme';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Tab = createBottomTabNavigator();

function AppContent(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: theme === 'dark',
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: 'bold'
          },
          medium: {
            fontFamily: 'System',
            fontWeight: 'bold'
          },
          bold: {
            fontFamily: '',
            fontWeight: 'bold'
          },
          heavy: {
            fontFamily: '',
            fontWeight: 'bold'
          }
        },
        colors: {
          ...COLORS[theme],
          primary: COLORS.primary,
        },
      }}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string = '';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Wishlist') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.secondary,
          headerShown: false,
          tabBarStyle: {
            paddingVertical: 5,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderTopColor: COLORS[theme].border,
            backgroundColor: COLORS[theme].background,
            position: 'absolute',
            borderTopWidth: 0,
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Wishlist" component={WishlistScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;