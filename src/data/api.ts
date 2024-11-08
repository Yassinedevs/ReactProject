// data/api.ts
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image sizes from TMDB
export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
};

// Types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

// API instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmY3NTI2YmVhMTVhNDhjNTJiZTI1MWYwMjE0YzEwNiIsIm5iZiI6MTczMDk4MzYxNS43NDkwMjUzLCJzdWIiOiI2NzJjYjVhYjkxNGJhZTk0YTFiYmFhNjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WafcNtLk2kjFXJ8-OMEDi5Z4iiooZvsSgsDS7UCvfsA`,
  },
});

// Helper function to build image URLs
export const getImageUrl = (path: string, size: string = IMAGE_SIZES.backdrop.large): string => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// API functions
export const moviesApi = {
  getTrending: async (): Promise<Movie[]> => {
    try {
      const response = await api.get<MovieResponse>('/trending/movie/week');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  },

  getPopular: async (): Promise<Movie[]> => {
    try {
      const response = await api.get<MovieResponse>('/movie/popular');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  },

  getTopRated: async (): Promise<Movie[]> => {
    try {
      const response = await api.get<MovieResponse>('/movie/top_rated');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      return [];
    }
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    try {
      const response = await api.get<MovieResponse>('/search/movie', {
        params: { query },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  },

  getMoviesByGenre: async (genreId: string): Promise<Movie[]> => {
    try {
      const response = await api.get<MovieResponse>('/discover/movie', {
        params: { with_genres: genreId }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      return [];
    }
  },

  searchMoviesWithGenre: async (query: string, genreId: string): Promise<Movie[]> => {
    try {
      const response = await api.get<MovieResponse>('/search/movie', {
        params: { 
          query,
          with_genres: genreId
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies with genre:', error);
      return [];
    }
  },

  getTopRatedByGenre: async (genreId: string): Promise<Movie[]> => {
    try {
      const response = await api.get<MovieResponse>('/discover/movie', {
        params: { 
          with_genres: genreId,
          sort_by: 'vote_average.desc',
          'vote_count.gte': 1000
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated movies by genre:', error);
      return [];
    }
  },
};