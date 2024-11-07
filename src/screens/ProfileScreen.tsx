// screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';

export function ProfileScreen() {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={[
            styles.themeButton, 
            { backgroundColor: COLORS[theme === 'light' ? 'dark' : 'light'].background }
          ]} 
          onPress={toggleTheme}
        >
          <Icon 
            name={theme === 'light' ? 'moon' : 'sunny'} 
            size={24} 
            color={theme === 'light' ? '#FFFFFF' : '#000000'} 
          />
          <Text style={[
            styles.buttonText,
            { color: theme === 'light' ? '#FFFFFF' : '#000000' }
          ]}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});