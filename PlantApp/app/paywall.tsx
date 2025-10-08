import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Image,
  StatusBar,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { useAppDispatch } from '@/hooks/redux';
import { setOnboardingCompleted } from '@/store/slices/onboardingSlice';

const { width, height } = Dimensions.get('window');

export default function PaywallScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const dispatch = useAppDispatch();
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const features = [
    {
      icon: 'camera',
      title: 'Unlimited',
      subtitle: 'Plant Identify'
    },
    {
      icon: 'flash',
      title: 'Faster',
      subtitle: 'Process'
    },
    {
      icon: 'shield-checkmark',
      title: 'Premium',
      subtitle: 'Support'
    }
  ];

  const plans = [
    {
      id: 'monthly',
      title: '1 Month',
      price: '$2.99/month',
      description: 'auto renewable',
      selected: selectedPlan === 'monthly'
    },
    {
      id: 'yearly',
      title: '1 Year',
      price: 'First 3 days free, then $529,99/year',
      description: '',
      selected: selectedPlan === 'yearly',
      badge: 'Save 50%'
    }
  ];

  const handleClose = () => {
    // Mark onboarding as completed and navigate to home
    dispatch(setOnboardingCompleted(true));
    router.replace('/(tabs)');
  };

  const handleSubscribe = () => {
    // Handle subscription logic
    console.log('Subscribing to:', selectedPlan);
    // After successful subscription, mark onboarding as completed
    dispatch(setOnboardingCompleted(true));
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B1B1B" />
      
      {/* Background Image */}
      <View style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.scanOverlay}>
          <View style={[styles.scanBracket, styles.topLeft]} />
          <View style={[styles.scanBracket, styles.topRight]} />
          <View style={[styles.scanBracket, styles.bottomLeft]} />
          <View style={[styles.scanBracket, styles.bottomRight]} />
        </View>
      </View>

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Title */}
        <View style={styles.titleSection}>
          <Text style={styles.appTitle}>PlantApp Premium</Text>
          <Text style={styles.appSubtitle}>Access All Features</Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.featuresSection}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon as any} size={24} color="white" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </View>
          ))}
        </View>

        {/* Subscription Plans */}
        <View style={styles.plansSection}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                plan.selected && styles.selectedPlan
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              <View style={styles.planContent}>
                <View style={styles.planLeft}>
                  <View style={[
                    styles.radioButton,
                    plan.selected && styles.selectedRadio
                  ]}>
                    {plan.selected && <View style={styles.radioDot} />}
                  </View>
                  <View style={styles.planText}>
                    <Text style={styles.planTitle}>{plan.title}</Text>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    {plan.description && (
                      <Text style={styles.planDescription}>{plan.description}</Text>
                    )}
                  </View>
                </View>
                {plan.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{plan.badge}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subscribe Button */}
        <TouchableOpacity 
          style={[styles.subscribeButton, { backgroundColor: colors.primary }]}
          onPress={handleSubscribe}
        >
          <Text style={styles.subscribeText}>Try free for 3 days</Text>
        </TouchableOpacity>

        {/* Legal Text */}
        <Text style={styles.legalText}>
          After the 3-day free trial period you'll be charged $274.99 per year unless you cancel before the trial expires. Yearly Subscription is Auto-Renewable
        </Text>

        {/* Links */}
        <View style={styles.linksSection}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Terms</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>•</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Privacy</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>•</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Restore</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: '#2D5A3D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scanOverlay: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
  scanBracket: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: 'white',
    borderWidth: 2,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingTop: height * 0.4,
    paddingHorizontal: 20,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  featuresSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  featureSubtitle: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  plansSection: {
    marginBottom: 30,
  },
  planCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlan: {
    borderColor: '#4CAF50',
  },
  planContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  planLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: '#4CAF50',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  planText: {
    flex: 1,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  planPrice: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  planDescription: {
    fontSize: 12,
    color: 'white',
    opacity: 0.6,
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subscribeButton: {
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  subscribeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  legalText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  linksSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  linkText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textDecorationLine: 'underline',
  },
  separator: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginHorizontal: 10,
  },
});
