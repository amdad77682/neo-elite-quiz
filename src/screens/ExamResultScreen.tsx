import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

type ExamResultNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExamResult'
>;

type ExamResultRouteProp = RouteProp<RootStackParamList, 'ExamResult'>;

interface Props {
  navigation: ExamResultNavigationProp;
  route: ExamResultRouteProp;
}

const ExamResultScreen: React.FC<Props> = ({navigation, route}) => {
  const {totalQuestions, correctAnswers, wrongAnswers, points} = route.params;

  const handleTryAgain = () => {
    navigation.navigate('ExamDetails');
  };

  const handleSeeAnswers = () => {
    navigation.navigate('ExamSolution');
  };

  const isPassed = correctAnswers >= totalQuestions / 2;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Continue with Exam</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Result Icon */}
        <View style={styles.resultIconContainer}>
          <View
            style={[
              styles.resultIcon,
              isPassed ? styles.resultIconSuccess : styles.resultIconFail,
            ]}>
            <Text style={styles.resultEmoji}>
              {isPassed ? '🏆' : '😢'}
            </Text>
          </View>
        </View>

        {/* Result Title */}
        <Text style={styles.resultTitle}>
          {isPassed ? 'Awesome!' : 'Oops!'}
        </Text>
        <Text style={styles.resultSubtitle}>
          {isPassed
            ? 'You did great! Keep it up!'
            : "Don't worry, keep practicing!"}
        </Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, {backgroundColor: '#FEE2E2'}]}>
              <Text style={styles.statIcon}>📝</Text>
            </View>
            <Text style={styles.statValue}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Total Question</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, {backgroundColor: '#FEF3C7'}]}>
              <Text style={styles.statIcon}>⏱️</Text>
            </View>
            <Text style={styles.statValue}>02:30</Text>
            <Text style={styles.statLabel}>Time Taken</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, {backgroundColor: '#D1FAE5'}]}>
              <Text style={styles.statIcon}>✓</Text>
            </View>
            <Text style={styles.statValue}>{correctAnswers}</Text>
            <Text style={styles.statLabel}>Correct Answer</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, {backgroundColor: '#DBEAFE'}]}>
              <Text style={styles.statIcon}>✗</Text>
            </View>
            <Text style={styles.statValue}>{wrongAnswers}</Text>
            <Text style={styles.statLabel}>Wrong Answer</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, {backgroundColor: '#E0E7FF'}]}>
              <Text style={styles.statIcon}>🎯</Text>
            </View>
            <Text style={styles.statValue}>
              {Math.round((correctAnswers / totalQuestions) * 100)}%
            </Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconCircle, {backgroundColor: '#FCE7F3'}]}>
              <Text style={styles.statIcon}>🔥</Text>
            </View>
            <Text style={styles.statValue}>{points}p</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.tryAgainButton}
          onPress={handleTryAgain}>
          <Text style={styles.tryAgainButtonText}>🔄 Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.seeAnswersButton}
          onPress={handleSeeAnswers}>
          <Text style={styles.seeAnswersButtonText}>📖 See Answers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F7F8F9',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#1E1E1E',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  resultIconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultIconSuccess: {
    backgroundColor: '#FEF3C7',
  },
  resultIconFail: {
    backgroundColor: '#FEE2E2',
  },
  resultEmoji: {
    fontSize: 60,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '31%',
    backgroundColor: '#F7F8F9',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8ECF4',
    gap: 12,
  },
  tryAgainButton: {
    flex: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  tryAgainButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  seeAnswersButton: {
    flex: 1,
    backgroundColor: '#5B6FED',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  seeAnswersButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ExamResultScreen;
