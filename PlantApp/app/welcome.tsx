import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  StatusBar,
  Image,
  ImageBackground
} from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { useAppDispatch } from '@/hooks/redux';
import { resetOnboarding } from '@/store/slices/onboardingSlice';
import { horizontalScale, moderateScale, verticalScale } from '@/utils/scale';
import DebugInfo from '@/components/DebugInfo';

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  const handleGetStarted = () => {
    dispatch(resetOnboarding());
    router.push('/onboarding');
  };

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
        source={require('@/assets/images/firstPage/title.png')} 
        style={styles.titleImage}
        resizeMode='stretch'
      />

      {/* Main plant image */}
      <Image 
        source={require('@/assets/images/firstPage/Frame 13 (1).png')} 
        style={styles.welcomeImage}
        resizeMode='stretch'
      />

{/*       <Image 
        source={require('@/assets/images/firstPage/camera-line.png')} 
        style={styles.cameraLine}
        resizeMode="contain"
      />
      
      <Image 
        source={require('@/assets/images/firstPage/sticker-one.png')} 
        style={styles.stickerOne}
        resizeMode="contain"
      />      
      
      <Image 
        source={require('@/assets/images/firstPage/sticker-two.png')} 
        style={styles.stickerTwo}
        resizeMode="contain"
      />

      <Image 
        source={require('@/assets/images/firstPage/sticker-three.png')} 
        style={styles.stickerThree}
        resizeMode="contain"
      /> */}

      {/* Bottom Section */}
      <TouchableOpacity 
        style={[styles.getStartedButton, { backgroundColor: Colors.primary }]}
        onPress={handleGetStarted}
      >
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>

      {/* Terms and Privacy Text */}
      <Text style={[styles.termsText, { color: Colors.icon }]}>
        By tapping next, you are agreeing to PlantID{'\n'}
        <Text style={styles.linkText}>Terms of Use & Privacy Policy.</Text>
      </Text>
      
      {/* Debug Info - Remove after testing */}
      <DebugInfo />
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
  titleImage: {
    position: 'absolute',
    width: horizontalScale(300),
    height: verticalScale(85),
    top: verticalScale(59),
    left: horizontalScale(24),
    zIndex: 2,
  },
  welcomeImage: {
    position: 'absolute',
    width: horizontalScale(375),
    height: verticalScale(499),
    top: verticalScale(168),
    left: 0,
    zIndex: 3,
  },
  cameraLine: {
    position: 'absolute',
    width: horizontalScale(219),
    height: verticalScale(219),
    top: verticalScale(236),
    left: horizontalScale(78),
    zIndex: 4,
  },
  stickerOne: {
    position: 'absolute',
    width: horizontalScale(111.93),
    height: verticalScale(118.05),
    top: verticalScale(163),
    left: horizontalScale(20),
    zIndex: 5,
  },
  stickerTwo: {
    position: 'absolute',
    width: horizontalScale(375),
    height: verticalScale(499),
    top: verticalScale(168),
  },
  stickerThree: {
    position: 'absolute',
    width: horizontalScale(375),
    height: verticalScale(499),
    top: verticalScale(168),
  },
  getStartedButton: {
    position: 'absolute',
    width: horizontalScale(327),
    height: verticalScale(56),
    top: verticalScale(667),
    left: horizontalScale(24),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    position: 'absolute',
    top: verticalScale(740),
    left: horizontalScale(73),
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
});
