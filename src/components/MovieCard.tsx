// components/MovieCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Button } from './Button';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 64) / 2.5; // Reduced width to show partial third card

interface MovieCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  onRemove: () => void;
  onDetails: () => void;
}

export const MovieCard = ({ title, imageUrl, rating, onRemove, onDetails }: MovieCardProps) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text 
            style={[styles.title, { color: '#FFFFFF' }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text style={styles.rating}>
            ⭐ {rating}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: 16,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: cardWidth * 1.5, // Maintain aspect ratio
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
    color: '#FFFFFF',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});