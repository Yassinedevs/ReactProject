// components/FilterHeader.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';

const genres = [
  'All',
  'Romance',
  'Sport',
  'Kids',
  'Horror'
];

export const FilterHeader = () => {
  const { theme } = useTheme();
  const [selectedGenre, setSelectedGenre] = useState('All');

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genreChip,
              selectedGenre === genre && styles.selectedGenreChip
            ]}
            onPress={() => setSelectedGenre(genre)}
          >
            <Text style={[
              styles.genreText,
              selectedGenre === genre && styles.selectedGenreText
            ]}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondary,
    borderRadius: 40,
    padding: 8,
  },
  genreChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  selectedGenreChip: {
    backgroundColor: '#FFFFFF',
  },
  genreText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  selectedGenreText: {
    color: '#000000',
    fontWeight: '600',
  }
});