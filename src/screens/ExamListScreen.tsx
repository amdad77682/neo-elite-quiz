import React, {useState} from 'react';
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

type ExamListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExamList'
>;

type ExamListRouteProp = RouteProp<RootStackParamList, 'ExamList'>;

interface Props {
  navigation: ExamListNavigationProp;
  route: ExamListRouteProp;
}

interface Exam {
  id: string;
  chapter: string;
  title: string;
  questions: string;
  duration: string;
  difficulty: string;
  status?: 'pass' | 'fail';
}

const ExamListScreen: React.FC<Props> = ({navigation, route}) => {
  const {subCategoryName} = route.params;
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');

  const liveExams: Exam[] = [
    {
      id: '1',
      chapter: 'Chapter 1',
      title: 'Physics Every Saturday Night Quiz',
      questions: '06 Question',
      duration: '10min',
      difficulty: '●10p',
      status: 'pass',
    },
    {
      id: '2',
      chapter: 'Chapter 1',
      title: 'Physics Every Saturday Night Quiz',
      questions: '06 Question',
      duration: '10min',
      difficulty: '●10p',
      status: 'pass',
    },
    {
      id: '3',
      chapter: 'Chapter 1',
      title: 'Physics Every Saturday Night Quiz',
      questions: '06 Question',
      duration: '10min',
      difficulty: '●10p',
      status: 'fail',
    },
  ];

  const historyExams: Exam[] = [
    {
      id: '1',
      chapter: 'Chapter 1',
      title: 'Physics Every Saturday Night Quiz',
      questions: '06 Question',
      duration: '10min',
      difficulty: '●10p',
      status: 'pass',
    },
    {
      id: '2',
      chapter: 'Chapter 1',
      title: 'Physics Every Saturday Night Quiz',
      questions: '06 Question',
      duration: '10min',
      difficulty: '●10p',
      status: 'pass',
    },
    {
      id: '3',
      chapter: 'Chapter 1',
      title: 'Physics Every Saturday Night Quiz',
      questions: '06 Question',
      duration: '10min',
      difficulty: '●10p',
      status: 'fail',
    },
  ];

  const exams = activeTab === 'live' ? liveExams : historyExams;

  const handleExamPress = (exam: Exam) => {
    navigation.navigate('ExamDetails');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{subCategoryName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'live' && styles.tabActive]}
          onPress={() => setActiveTab('live')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'live' && styles.tabTextActive,
            ]}>
            Live Exam
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' && styles.tabTextActive,
            ]}>
            Exam History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {exams.map(exam => (
          <TouchableOpacity
            key={exam.id}
            style={styles.examCard}
            onPress={() => handleExamPress(exam)}>
            <View style={styles.examHeader}>
              <Text style={styles.examChapter}>{exam.chapter}</Text>
              {activeTab === 'live' && exam.status && (
                <View
                  style={[
                    styles.statusBadge,
                    exam.status === 'pass'
                      ? styles.statusPass
                      : styles.statusFail,
                  ]}>
                  <Text style={styles.statusText}>
                    {exam.status === 'pass' ? '✓ Pass' : '✗ Fail'}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.examIcon}>
              <Text style={styles.examIconText}>📚</Text>
            </View>

            <Text style={styles.examTitle}>{exam.title}</Text>
            <Text style={styles.examMeta}>
              {exam.questions} • {exam.duration} • {exam.difficulty}
            </Text>

            {activeTab === 'live' && (
              <TouchableOpacity style={styles.resultButton}>
                <Text style={styles.resultButtonText}>📊 See Result</Text>
              </TouchableOpacity>
            )}

            {activeTab === 'history' && exam.status && (
              <View style={styles.historyActions}>
                {exam.status === 'pass' ? (
                  <View
                    style={[styles.statusBadge, styles.statusPass]}>
                    <Text style={styles.statusText}>✓ Pass</Text>
                  </View>
                ) : (
                  <View
                    style={[styles.statusBadge, styles.statusFail]}>
                    <Text style={styles.statusText}>✗ Fail</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.resultLink}>
                  <Text style={styles.resultLinkText}>📊 See Result</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={{height: 100}} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Explore')}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Leaderboard')}>
          <Text style={styles.navIcon}>🏆</Text>
          <Text style={styles.navLabel}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>❓</Text>
          <Text style={styles.navLabel}>My Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  placeholder: {
    width: 44,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F7F8F9',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#5B6FED',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  examCard: {
    backgroundColor: '#FECACA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  examChapter: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPass: {
    backgroundColor: '#D1FAE5',
  },
  statusFail: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  examIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  examIconText: {
    fontSize: 24,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  examMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  resultButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  resultButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  historyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLink: {
    paddingVertical: 4,
  },
  resultLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5B6FED',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#E8ECF4',
    paddingBottom: 24,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
});

export default ExamListScreen;
