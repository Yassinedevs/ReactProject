// components/Button.tsx
import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../common/theme';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps {
  onPress: () => void;
  variant: 'wishlist' | 'details';
  style?: ViewStyle;
}

export const Button = ({ onPress, variant, style }: ButtonProps) => {
  const { theme } = useTheme();

  if (variant === 'wishlist') {
    return (
      <TouchableOpacity 
        style={[
          styles.wishlistButton, 
          { backgroundColor: COLORS.secondary },
          style
        ]} 
        onPress={onPress}
      >
        <Icon 
          name="add" 
          size={20} 
          color="#FFFFFF"
        />
        <Text style={styles.wishlistText}>
          Wishlist
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.detailsButton, style]} 
      onPress={onPress}
    >
      <Text style={[
        styles.detailsText,
        { color: theme === 'light' ? '#FFFFFF' : '#000000' }
      ]}>
        Details
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap: 4, // Space between icon and text
  },
  wishlistText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF', // Always white
  },
  detailsButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '600',
  },
});