// common/theme.ts
export const COLORS = {
  primary: '#F2C94C',
  secondary: '#7D8790',

  light: {
    background: '#FFFFFF',
    text: '#000000',
    card: '#FFFFFF',
    border: '#E5E5E5',
    notification: '#FF453A',
  },
  
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    card: '#1C1C1E',
    border: '#2C2C2E',
    notification: '#FF453A',
  },
} as const;
  
  // Optional: Add other theme constants
  export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  } as const;
  
  export const FONT_SIZES = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  } as const;
  
  // Optional: Add border radius constants
  export const BORDER_RADIUS = {
    sm: 4,
    md: 8,
    lg: 15,
  } as const;