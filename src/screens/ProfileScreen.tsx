// screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FilterHeader } from '../components/FilterHeader';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';

export function ProfileScreen() {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.container, 
      { backgroundColor: COLORS[theme].background }
    ]}>
      <FilterHeader />
      <View style={styles.content}>
        <Text style={{ color: COLORS[theme].text }}>Profile Screen</Text>
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
});