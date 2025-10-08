import { Dimensions, PixelRatio, Platform } from 'react-native';

// Base dimensions from Figma design
export const BASE_WIDTH = 375;   
export const BASE_HEIGHT = 812;  

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// For pixel-perfect layouts, don't scale - use exact values from Figma
// Only scale when you need responsive behavior across very different screen sizes

// Horizontal scaling (use sparingly)
export const horizontalScale = (size: number) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size * scale);
};

// Vertical scaling (use sparingly)
export const verticalScale = (size: number) => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  return Math.round(size * scale);
};

// Moderate scale for things like fonts (more conservative scaling)
export const moderateScale = (size: number, factor = 0.5) => {
  return Math.round(size + (horizontalScale(size) - size) * factor);
};

// Helper: Check if scaling is even needed
export const shouldScale = () => {
  return SCREEN_WIDTH !== BASE_WIDTH || SCREEN_HEIGHT !== BASE_HEIGHT;
};

// For truly pixel-perfect: Don't scale, use exact Figma values
export const exact = (size: number) => size;
