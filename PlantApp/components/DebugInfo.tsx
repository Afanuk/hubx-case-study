import React from 'react';
import { View, Text, StyleSheet, Dimensions, PixelRatio, Platform } from 'react-native';
import { horizontalScale, verticalScale, BASE_WIDTH, BASE_HEIGHT } from '@/utils/scale';

export default function DebugInfo() {
  const { width, height } = Dimensions.get('window');
  const screenDimensions = Dimensions.get('screen');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debug Info</Text>
      <Text style={styles.text}>Window: {width} × {height}</Text>
      <Text style={styles.text}>Screen: {screenDimensions.width} × {screenDimensions.height}</Text>
      <Text style={styles.text}>Pixel Ratio: {PixelRatio.get()}x</Text>
      <Text style={styles.text}>Font Scale: {PixelRatio.getFontScale()}</Text>
      <Text style={styles.text}>Platform: {Platform.OS}</Text>
      <Text style={styles.text}>Base: {BASE_WIDTH} × {BASE_HEIGHT}</Text>
      <Text style={styles.text}>---</Text>
      <Text style={styles.text}>hScale(375) = {horizontalScale(375)}</Text>
      <Text style={styles.text}>vScale(499) = {verticalScale(499)}</Text>
      <Text style={styles.text}>hScale(24) = {horizontalScale(24)}</Text>
      <Text style={styles.text}>Scale factor: {(width/BASE_WIDTH).toFixed(3)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 10,
    borderRadius: 8,
    zIndex: 9999,
  },
  title: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});
