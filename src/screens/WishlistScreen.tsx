// screens/WishlistScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { MovieCard } from '../components/MovieCard';
import { MovieListHeader } from '../components/MovieListHeader';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';
import { moviesApi, Movie } from '../data/api';

export function WishlistScreen() {
  const { theme } = useTheme();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const popularMovies = await moviesApi.getPopular();
      setMovies(popularMovies.slice(0, 20));
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={[
      styles.container, 
      { backgroundColor: COLORS[theme].background }
    ]}>
      <MovieListHeader 
        title="Marvel Studios" 
        onSeeMore={() => console.log('See more clicked')} 
      />
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            rating={Number(item.vote_average.toFixed(1))}
            onRemove={() => console.log('Remove:', item.id)}
            onDetails={() => console.log('Details:', item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 16,
    gap: 16,
  },
});