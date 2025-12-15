import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  ViewToken,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type OnboardingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

interface Props {
  navigation: OnboardingNavigationProp;
}

interface OnboardingItem {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    emoji: '💡',
    title: 'The best\ntime to start\nis now!',
    subtitle: 'Quiz App, for you 🙌',
  },
  {
    id: '2',
    emoji: '📝',
    title: 'The best\ntime to start\nis now!',
    subtitle: 'Quiz App, for you 🙌',
  },
  {
    id: '3',
    emoji: '🏆',
    title: 'The best\ntime to start\nis now!',
    subtitle: 'Quiz App, for you 🙌',
  },
];

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
  ).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handleGetStarted = () => {
    navigation.replace('Login');
  };

  const renderItem = ({item}: {item: OnboardingItem}) => (
    <View style={styles.slide}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  const Pagination = () => (
    <View style={styles.paginationContainer}>
      {onboardingData.map((_, index) => {
        const inputRange = [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[styles.dot, {width: dotWidth, opacity}]}
          />
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={16}
      />

      <View style={styles.bottomContainer}>
        <Pagination />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleGetStarted}>
            <Text style={styles.emailButtonText}>✉️  Get Started with Email</Text>
          </TouchableOpacity>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>🍎 Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>G Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>f Facebook</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleGetStarted}>
            <Text style={styles.loginText}>
              I Already have an Account? <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {currentIndex < onboardingData.length - 1 && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>▶</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B6FED',
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: 50,
    left: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: 150,
    right: 30,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: 250,
    left: 100,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emojiContainer: {
    marginBottom: 60,
  },
  emoji: {
    fontSize: 140,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 50,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  emailButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5B6FED',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  loginText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nextButton: {
    position: 'absolute',
    right: 30,
    bottom: 220,
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#5B6FED',
  },
});

export default OnboardingScreen;
