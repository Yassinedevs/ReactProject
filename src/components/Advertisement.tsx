// components/Advertisement.tsx
import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { Button } from './Button';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../common/theme';

const { width } = Dimensions.get('window');

export const Advertisement = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/black_friday.png')} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: COLORS[theme].text }]}>
          Black friday is here!
        </Text>
        <Text style={[styles.description, { color: COLORS[theme].text }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra sociis pulvinar auctor nibh nibh iaculis id.
        </Text>
        <Button 
          variant="details" 
          onPress={() => console.log('Check details clicked')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});