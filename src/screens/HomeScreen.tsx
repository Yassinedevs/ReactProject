// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { MovieCarousel } from '../components/MovieCarousel';
import { FilterHeader } from '../components/FilterHeader';
import { MovieListHeader } from '../components/MovieListHeader';
import { MovieCard } from '../components/MovieCard';
import { Advertisement } from '../components/Advertisement';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';
import { Movie, moviesApi } from '../data/api';

const { height } = Dimensions.get('window');

export function HomeScreen() {
  const { theme } = useTheme();
  const [marvelMovies, setMarvelMovies] = useState<Movie[]>([]);
  const [bestMovies, setBestMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const [popular, topRated] = await Promise.all([
        moviesApi.searchMovies('Marvel'),
        moviesApi.getTopRated()
      ]);
      setMarvelMovies(popular.slice(0, 20));
      setBestMovies(topRated.slice(0, 20));
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
    <View style={[styles.container, { backgroundColor: COLORS[theme].background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main content container with space for FilterHeader */}
        <View style={styles.content}>
          {/* Carousel section */}
          <View style={styles.carouselSection}>
            {/* FilterHeader on top */}
            <View style={styles.filterHeaderContainer}>
              <FilterHeader />
            </View>
            
            {/* Carousel below */}
            <MovieCarousel />
          </View>

          {/* Marvel Movies Section */}
          <View style={styles.section}>
            <MovieListHeader 
              title="Marvel Studios" 
              onSeeMore={() => console.log('See more Marvel')} 
            />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.movieList}
            >
              {marvelMovies.map(movie => (
                <View key={movie.id} style={styles.movieCard}>
                  <MovieCard
                    title={movie.title}
                    imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={Number(movie.vote_average.toFixed(1))}
                    onRemove={() => console.log('Remove:', movie.id)}
                    onDetails={() => console.log('Details:', movie.id)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Best Movies */}
          <View style={styles.section}>
            <MovieListHeader 
              title="Best Movies" 
              onSeeMore={() => console.log('See more Best')} 
            />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.movieList}
            >
              {bestMovies.map(movie => (
                <View key={movie.id} style={styles.movieCard}>
                  <MovieCard
                    title={movie.title}
                    imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    rating={Number(movie.vote_average.toFixed(1))}
                    onRemove={() => console.log('Remove:', movie.id)}
                    onDetails={() => console.log('Details:', movie.id)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Advertisement with bottom margin */}
          <View style={styles.advertisementContainer}>
            <Advertisement />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  carouselSection: {
    position: 'relative',
    height: height * 0.5, // Match MovieCarousel height
  },
  filterHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2, // Ensure FilterHeader is above carousel
  },
  section: {
    marginVertical: 16,
  },
  movieList: {
    paddingLeft: 16, // Add left margin to movie lists
  },
  movieCard: {
    marginRight: 16, // Add spacing between movies
  },
  advertisementContainer: {
    marginBottom: 24, // Add bottom margin to Advertisement
  },
});