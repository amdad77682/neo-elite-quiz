import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to Onboarding after animation
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />
      
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Text style={styles.logoNeo}>NEO</Text>
        <Text style={styles.logoQuiz}>QUIZ</Text>
      </Animated.View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Build with </Text>
        <Text style={styles.footerBrand}>Zyric</Text>
      </View>
      <View style={styles.loadingBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5B6FED',
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: 100,
    left: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: 200,
    right: -30,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    bottom: 200,
    left: 50,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoNeo: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FF6B35',
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  logoQuiz: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 4,
    marginTop: -15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footerBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingBar: {
    position: 'absolute',
    bottom: 60,
    width: 150,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
});

export default SplashScreen;
