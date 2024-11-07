// screens/SearchScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Advertisement } from '../components/Advertisement';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';

export function SearchScreen() {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      { backgroundColor: COLORS[theme].background }
    ]}>
      <Advertisement />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});