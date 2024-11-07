// components/MovieCarousel.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  FlatList, 
  Image, 
  Dimensions, 
  StyleSheet 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';
import { Movie, moviesApi } from '../data/api';
import { Button } from './Button';

const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.5; // Total height (40% + 5% + 5%)
const IMAGE_HEIGHT = height * 0.4; // 40% for image
const BUTTON_HEIGHT = height * 0.05; // 5% for buttons
const PAGINATION_HEIGHT = height * 0.05; // 5% for pagination

interface MovieCarouselProps {
  movies: Movie[];
}

export const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const popularMovies = await moviesApi.getPopular();
      setMovies(popularMovies.slice(0, 5));
    } catch (error) {
      console.error('Error fetching carousel movies:', error);
    }
  };

  const gradientColors = theme === 'light' 
    ? ['transparent', '#FFFFFF']
    : ['transparent', '#000000'];

  return (
    <View style={styles.container}>
      {/* Sliding images layer */}
      <FlatList
        data={movies}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          setActiveIndex(Math.round(x / width));
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }}
              style={styles.image}
              resizeMode="cover"
            />
            <LinearGradient
              colors={gradientColors}
              style={styles.gradient}
            />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />

      {/* Text labels */}
      <View style={styles.textContainer}>
        <Text style={[
          styles.text, 
          styles.leftText,
          { color: COLORS[theme].text }
        ]}>
          List
        </Text>
        <Text style={[
          styles.text, 
          styles.rightText,
          { color: COLORS[theme].text }
        ]}>
          Discover
        </Text>
      </View>

      {/* Fixed buttons layer */}
      <View style={styles.buttonsContainer}>
        <Button 
          variant="wishlist" 
          onPress={() => console.log('Add to wishlist:', movies[activeIndex]?.id)}
          style={styles.leftButton}
        />
        <Button 
          variant="details" 
          onPress={() => console.log('Show details:', movies[activeIndex]?.id)}
          style={styles.rightButton}
        />
      </View>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {movies.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
  },
  slide: {
    width,
    height: ITEM_HEIGHT,
  },
  image: {
    width,
    height: IMAGE_HEIGHT,
  },
  gradient: {
    position: 'absolute',
    bottom: BUTTON_HEIGHT + PAGINATION_HEIGHT,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT * 0.3,
    zIndex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    top: IMAGE_HEIGHT,
    width: '100%',
    height: BUTTON_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    height: PAGINATION_HEIGHT,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  leftButton: {
    marginLeft: '10%',
    width: '37%',
    marginRight: '3%',
    height: 40,
  },
  rightButton: {
    marginLeft: '3%',
    width: '37%',
    marginRight: '10%',
    height: 40,
  },
  textContainer: {
    position: 'absolute',
    top: IMAGE_HEIGHT - height * 0.05,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  leftText: {
    marginLeft: '37%',
    textAlign: 'right',
  },
  rightText: {
    marginLeft: '12%',
    textAlign: 'left',
  }
});