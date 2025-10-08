import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  StatusBar,
  ImageBackground 
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCurrentStep, setOnboardingCompleted } from '@/store/slices/onboardingSlice';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.onboarding);

  const onboardingSteps = [
    {
      title: require('@/assets/images/secondPage/title.png'),
      image: require('@/assets/images/secondPage/content.png')
    },
    {
      title: require('@/assets/images/thirdPage/title.png'),
      image: require('@/assets/images/thirdPage/content.png'),
      backgroundImage: require('@/assets/images/thirdPage/background.png'),
      smallImage: require('@/assets/images/thirdPage/small-content.png'),
      overlayImage: require('@/assets/images/thirdPage/overlay.png'),
    },
    {
      title: "Empty step",
    }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      // Navigate to paywall instead of home
      router.push('/paywall');
    }
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <ImageBackground 
      source={require('@/assets/images/background.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      {/* White overlay to lighten the background */}
      <View style={styles.overlay} />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Title at top */}
      <Image 
        source={currentStepData.title} 
        style={currentStep === 0 ? styles.titleImageFirst : styles.titleImageSecond}
        resizeMode="contain"
      />

      {/* Main plant image */}
      {currentStep === 0 && (
        <Image 
          source={currentStepData.image} 
          style={styles.onboardingImageFirst}
          resizeMode="contain"
        />
      )}

      {currentStep === 1 && (
        <>
          <Image 
            source={currentStepData.backgroundImage} 
            style={styles.onboardingBackgroundImageSecond}
            resizeMode="contain"
          />
          <Image 
            source={currentStepData.image} 
            style={styles.onboardingImageSecond}
            resizeMode="contain"
          />
          <Image 
            source={currentStepData.smallImage} 
            style={styles.onboardingSmallImageSecond}
            resizeMode="contain"
          />
          <Image 
            source={currentStepData.overlayImage} 
            style={styles.onboardingOverlayImageSecond}
            resizeMode="contain"
          />
        </>
      )}

      {/* Bottom Section */}
      <TouchableOpacity 
        style={[styles.continueButton, { backgroundColor: Colors.primary }]}
        onPress={handleNext}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {onboardingSteps.map((_, index) => (
          <View
            key={index}
            style={[ styles.dot, 
              { 
                backgroundColor: index === currentStep ? '#13231B' : '#13231B40',
                width: index === currentStep ? horizontalScale(10) : horizontalScale(6),
                height: index === currentStep ? horizontalScale(10) : horizontalScale(6),
                top: index === currentStep ? 0 : verticalScale(2),
              }
            ]}
          />
        ))}
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  },
  titleImageFirst: {
    position: 'absolute',
    width: horizontalScale(315),
    height: verticalScale(66),
    top: verticalScale(59),
    left: horizontalScale(24),
  },
  titleImageSecond: {
    position: 'absolute',
    width: horizontalScale(277),
    height: verticalScale(49),
    top: verticalScale(59),
    left: horizontalScale(24),
  },
  onboardingImageFirst: {
    position: 'absolute',
    width: horizontalScale(375),
    height: verticalScale(530),
    top: verticalScale(137),
  },
  onboardingImageSecond: {
    position: 'absolute',
    width: horizontalScale(261),
    height: verticalScale(540),
    top: verticalScale(187),
    left: horizontalScale(57),
    zIndex: 2,
  },
  onboardingSmallImageSecond: {
    position: 'absolute',
    width: horizontalScale(167.69),
    height: verticalScale(185),
    top: verticalScale(128),
    left: horizontalScale(195),
    zIndex: 3,
  },
  onboardingBackgroundImageSecond: {
    position: 'absolute',
    width: horizontalScale(411),
    height: verticalScale(325.4),
    top: verticalScale(109),
    left: horizontalScale(-21),

    zIndex: 1,
  },
  onboardingOverlayImageSecond: {
    position: 'absolute',
    width: horizontalScale(375),
    height: verticalScale(235),
    top: verticalScale(577),
    zIndex: 4,
  },
  continueButton: {
    position: 'absolute',
    width: horizontalScale(327),
    height: verticalScale(56),
    top: verticalScale(667),
    left: horizontalScale(24),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  continueText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    top: verticalScale(755),
    justifyContent: 'center',
  },
  dot: {
    borderRadius: 8,
    zIndex: 5
  },
});
