import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChevronLeft} from 'lucide-react-native';
import {RootStackParamList} from '../../navigation/types';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type StudentAnalyticsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StudentAnalytics'
>;

interface Props {
  navigation: StudentAnalyticsNavigationProp;
}

interface StudentSummary {
  id: string;
  name: string;
  points: number;
  examsCompleted: number;
  avgScore: number;
  trend: 'up' | 'down' | 'neutral';
}

const StudentAnalyticsScreen: React.FC<Props> = ({navigation}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const topStudents: StudentSummary[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      points: 2450,
      examsCompleted: 45,
      avgScore: 92,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Bob Smith',
      points: 2200,
      examsCompleted: 42,
      avgScore: 88,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Carol White',
      points: 2100,
      examsCompleted: 40,
      avgScore: 85,
      trend: 'neutral',
    },
    {
      id: '4',
      name: 'David Brown',
      points: 1950,
      examsCompleted: 38,
      avgScore: 82,
      trend: 'down',
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '➡️';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Student Analytics</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === 'week' && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod('week')}>
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'week' && styles.periodTextActive,
              ]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === 'month' && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod('month')}>
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'month' && styles.periodTextActive,
              ]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === 'year' && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod('year')}>
            <Text
              style={[
                styles.periodText,
                selectedPeriod === 'year' && styles.periodTextActive,
              ]}>
              Year
            </Text>
          </TouchableOpacity>
        </View>

        {/* Overall Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>245</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>78%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1,240</Text>
            <Text style={styles.statLabel}>Exams Taken</Text>
          </View>
        </View>

        {/* Top Performers */}
        <Text style={styles.sectionTitle}>Top Performers 🏆</Text>
        {topStudents.map((student, index) => (
          <View key={student.id} style={styles.studentCard}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>#{index + 1}</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>{student.name}</Text>
              <View style={styles.studentStats}>
                <Text style={styles.studentStatText}>
                  ⭐ {student.points} pts
                </Text>
                <Text style={styles.studentStatText}>
                  📝 {student.examsCompleted} exams
                </Text>
                <Text style={styles.studentStatText}>
                  📊 {student.avgScore}% avg
                </Text>
              </View>
            </View>
            <Text style={styles.trendIcon}>{getTrendIcon(student.trend)}</Text>
          </View>
        ))}

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity 📊</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>
            💡 15 students completed "Math Quiz" today
          </Text>
          <Text style={styles.activityTime}>2 hours ago</Text>
        </View>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>
            🎯 New high score in "Science Quiz" by Alice Johnson
          </Text>
          <Text style={styles.activityTime}>5 hours ago</Text>
        </View>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>
            📈 Average score increased by 5% this week
          </Text>
          <Text style={styles.activityTime}>1 day ago</Text>
        </View>
      </ScrollView>
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
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF4',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F8F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#1E1E1E',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  periodContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F7F8F9',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#5B6FED',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6A707C',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F7F8F9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6A707C',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5B6FED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 6,
  },
  studentStats: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  studentStatText: {
    fontSize: 12,
    color: '#6A707C',
  },
  trendIcon: {
    fontSize: 20,
  },
  activityCard: {
    backgroundColor: '#F7F8F9',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#6A707C',
  },
});

export default StudentAnalyticsScreen;
