import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type ExamDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExamDetails'
>;

interface Props {
  navigation: ExamDetailsNavigationProp;
}

const ExamDetailsScreen: React.FC<Props> = ({navigation}) => {
  const handleStartExam = () => {
    navigation.navigate('ExamQuestion', {
      examTitle: 'Physics Every Saturday Night Quiz',
      totalQuestions: 20,
      currentQuestion: 1,
    });
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
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Exam Card */}
        <View style={styles.examCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.examLabel}>EXAM</Text>
          </View>

          <View style={styles.examIcon}>
            <Text style={styles.examIconText}>📚</Text>
          </View>

          <Text style={styles.examTitle}>
            Physics Every Saturday Night Quiz
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📝</Text>
              <Text style={styles.statText}>20</Text>
              <Text style={styles.statLabel}>Question</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⏱️</Text>
              <Text style={styles.statText}>30min</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statText}>2.1k</Text>
            </View>
          </View>
        </View>

        {/* Instructions Section */}
        <View style={styles.instructionsSection}>
          <Text style={styles.sectionTitle}>Instruction</Text>

          <View style={styles.instructionItem}>
            <View style={styles.radioButton} />
            <Text style={styles.instructionText}>
              Lorem ipsum dolor sit amet consectetur. Elit molestie imperdiet
              aliquam scelerisque morbi sed ut.
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.radioButton} />
            <Text style={styles.instructionText}>
              Elit molestie imperdiet aliquam scelerisque morbi sed ut vel
              tortor felis lorem.
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.radioButton} />
            <Text style={styles.instructionText}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <View style={styles.radioButton} />
            <Text style={styles.instructionText}>
              Lorem ipsum dolor sit amet consectetur. Elit
            </Text>
          </View>
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      {/* Start Exam Button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartExam}>
          <Text style={styles.startButtonText}>Start Exam →</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  examCard: {
    backgroundColor: '#FECACA',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  cardHeader: {
    marginBottom: 16,
  },
  examLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 1,
  },
  examIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  examIconText: {
    fontSize: 28,
  },
  examTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  instructionsSection: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    marginTop: 2,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  bottomButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8ECF4',
  },
  startButton: {
    backgroundColor: '#5B6FED',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ExamDetailsScreen;
