import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Dimensions,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchCategories } from '@/store/slices/categoriesSlice';
import { fetchQuestions as fetchQuestionsAction } from '@/store/slices/questionsSlice';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { categories, loading: categoriesLoading } = useAppSelector((state) => state.categories);
  const { questions, loading: questionsLoading } = useAppSelector((state) => state.questions);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchQuestionsAction());
  }, [dispatch]);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 17) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: Colors.text }]}>Hi, plant lover!</Text>
        <View style={styles.greetingRow}>
          <Text style={[styles.timeGreeting, { color: Colors.text }]}>{getCurrentGreeting()}</Text>
          <Ionicons name="partly-sunny" size={20} color={Colors.accent} />
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: Colors.card, borderColor: Colors.border }]}>
        <Ionicons name="search" size={20} color={Colors.icon} />
        <TextInput
          style={[styles.searchInput, { color: Colors.text }]}
          placeholder="Search for plants"
          placeholderTextColor={Colors.icon}
        />
      </View>

      {/* Premium Banner */}
      <TouchableOpacity 
        style={[styles.premiumBanner, { backgroundColor: Colors.premium }]}
        onPress={() => router.push('/paywall')}
      >
        <View style={styles.premiumContent}>
          <View style={styles.premiumLeft}>
            <View style={styles.envelopeContainer}>
              <Ionicons name="mail" size={20} color="white" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </View>
            <View style={styles.premiumText}>
              <Text style={styles.premiumTitle}>FREE Premium Available</Text>
              <Text style={styles.premiumSubtitle}>Tap to upgrade your account!</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </View>
      </TouchableOpacity>

      {/* Get Started Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.text }]}>Get Started</Text>
        {questionsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {questions.map((question) => (
              <TouchableOpacity 
                key={question.id} 
                style={[styles.getStartedCard, { backgroundColor: Colors.card }]}
              >
                <Image 
                  source={{ uri: question.image_uri }} 
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardText}>{question.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Plant Categories */}
      <View style={styles.section}>
        {categoriesLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={[styles.categoryCard, { backgroundColor: Colors.card, borderColor: Colors.border }]}
              >
                <Text style={[styles.categoryTitle, { color: Colors.text }]}>{category.title}</Text>
                <View style={styles.categoryImage}>
                  <Image 
                    source={{ uri: category.image.url }} 
                    style={styles.categoryImageStyle}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 5,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeGreeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  premiumBanner: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 15,
    padding: 20,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  envelopeContainer: {
    position: 'relative',
    marginRight: 15,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  premiumSubtitle: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  getStartedCard: {
    width: 280,
    height: 180,
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
  },
  cardText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
  },
  categoryCard: {
    width: (width - 55) / 2,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    minHeight: 120,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImageStyle: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});
