// components/MovieListHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';

interface MovieListHeaderProps {
  title: string;
  onSeeMore: () => void;
}

export const MovieListHeader = ({ title, onSeeMore }: MovieListHeaderProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: COLORS[theme].text }]}>
        {title}
      </Text>
      <TouchableOpacity onPress={onSeeMore}>
        <Text style={[
          styles.seeMore, 
          { color: theme === 'light' ? COLORS.primary : COLORS.secondary }
        ]}>
          See more
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMore: {
    fontSize: 14,
    fontWeight: '600',
  },
});