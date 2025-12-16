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

type TeacherExamListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TeacherExamList'
>;

interface Props {
  navigation: TeacherExamListNavigationProp;
}

interface Exam {
  id: string;
  title: string;
  category: string;
  questions: number;
  duration: string;
  participants: number;
  avgScore: number;
  status: 'active' | 'completed' | 'scheduled';
  color: string;
}

const TeacherExamListScreen: React.FC<Props> = ({navigation}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'scheduled'>('all');

  const exams: Exam[] = [
    {
      id: '1',
      title: 'Mathematics Final Exam',
      category: 'Mathematics',
      questions: 50,
      duration: '90 min',
      participants: 125,
      avgScore: 78,
      status: 'active',
      color: '#93C5FD',
    },
    {
      id: '2',
      title: 'Science Quiz - Chemistry',
      category: 'Science',
      questions: 30,
      duration: '45 min',
      participants: 98,
      avgScore: 82,
      status: 'active',
      color: '#86EFAC',
    },
    {
      id: '3',
      title: 'History Mid-term',
      category: 'History',
      questions: 40,
      duration: '60 min',
      participants: 156,
      avgScore: 75,
      status: 'completed',
      color: '#FCD34D',
    },
    {
      id: '4',
      title: 'English Literature Quiz',
      category: 'English',
      questions: 25,
      duration: '30 min',
      participants: 0,
      avgScore: 0,
      status: 'scheduled',
      color: '#FCA5A5',
    },
  ];

  const filteredExams = filterStatus === 'all'
    ? exams
    : exams.filter(exam => exam.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'completed':
        return '#6B7280';
      case 'scheduled':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Exam List</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterStatus('all')}>
          <Text
            style={[
              styles.filterText,
              filterStatus === 'all' && styles.filterTextActive,
            ]}>
            All ({exams.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === 'active' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterStatus('active')}>
          <Text
            style={[
              styles.filterText,
              filterStatus === 'active' && styles.filterTextActive,
            ]}>
            Active ({exams.filter(e => e.status === 'active').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === 'completed' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterStatus('completed')}>
          <Text
            style={[
              styles.filterText,
              filterStatus === 'completed' && styles.filterTextActive,
            ]}>
            Completed ({exams.filter(e => e.status === 'completed').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus === 'scheduled' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterStatus('scheduled')}>
          <Text
            style={[
              styles.filterText,
              filterStatus === 'scheduled' && styles.filterTextActive,
            ]}>
            Scheduled ({exams.filter(e => e.status === 'scheduled').length})
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredExams.map(exam => (
          <View key={exam.id} style={styles.examCard}>
            <View style={[styles.examHeader, {backgroundColor: exam.color}]}>
              <View style={styles.examTitleContainer}>
                <Text style={styles.examTitle}>{exam.title}</Text>
                <Text style={styles.examCategory}>{exam.category}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {backgroundColor: getStatusColor(exam.status)},
                ]}>
                <Text style={styles.statusText}>{exam.status}</Text>
              </View>
            </View>
            <View style={styles.examBody}>
              <View style={styles.examInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>📝</Text>
                  <Text style={styles.infoText}>{exam.questions} Questions</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>⏱️</Text>
                  <Text style={styles.infoText}>{exam.duration}</Text>
                </View>
              </View>
              <View style={styles.examInfo}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoIcon}>👥</Text>
                  <Text style={styles.infoText}>
                    {exam.participants} Participants
                  </Text>
                </View>
                {exam.status !== 'scheduled' && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>📊</Text>
                    <Text style={styles.infoText}>Avg: {exam.avgScore}%</Text>
                  </View>
                )}
              </View>
              {exam.status !== 'scheduled' && (
                <TouchableOpacity
                  style={styles.viewResultsButton}
                  onPress={() =>
                    navigation.navigate('Leaderboard', {role: 'teacher'})
                  }>
                  <Text style={styles.viewResultsText}>
                    View Leaderboard 🏆
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
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
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxHeight: 60,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F7F8F9',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#5B6FED',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6A707C',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  examCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  examTitleContainer: {
    flex: 1,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  examCategory: {
    fontSize: 12,
    color: '#1E1E1E',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  examBody: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  examInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#6A707C',
  },
  viewResultsButton: {
    backgroundColor: '#5B6FED',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewResultsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default TeacherExamListScreen;
