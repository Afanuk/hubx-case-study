import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAppSelector } from '@/hooks/redux';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const { hasCompletedOnboarding } = useAppSelector((state) => state.onboarding);

  useEffect(() => {
    // Small delay to ensure the app is fully mounted
    const timer = setTimeout(() => {
      if (!hasCompletedOnboarding) {
        router.replace('/welcome');
      } else {
        router.replace('/(tabs)');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hasCompletedOnboarding]);

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
