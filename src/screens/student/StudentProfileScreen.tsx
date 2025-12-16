import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/types';

type ProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StudentProfile'
>;

interface Props {
  navigation: ProfileNavigationProp;
}

const StudentProfileScreen: React.FC<Props> = ({navigation}) => {
  const streakDays = [
    {day: 'S', active: false},
    {day: 'M', active: false},
    {day: 'T', active: false},
    {day: 'W', active: true},
    {day: 'T', active: true},
    {day: 'F', active: true},
    {day: 'S', active: true},
  ];

  const performanceData = [
    {category: 'Math', percentage: 65, color: '#FECACA'},
    {category: 'English', percentage: 90, color: '#93C5FD'},
    {category: 'Bangla', percentage: 75, color: '#93C5FD'},
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image
            source={{uri: 'https://via.placeholder.com/80'}}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Mohammad Arafat</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🔥</Text>
              </View>
              <Text style={styles.statValue}>570</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>🏆</Text>
              </View>
              <Text style={styles.statValue}>10 Min</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Text style={styles.statEmoji}>⚡</Text>
              </View>
              <Text style={styles.statValue}>#1,438</Text>
            </View>
          </View>
        </View>

        {/* Learning Streak */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Streak</Text>
          <View style={styles.streakCard}>
            <View style={styles.streakIcon}>
              <Text style={styles.streakEmoji}>🔥</Text>
            </View>
            <View style={styles.streakInfo}>
              <Text style={styles.streakTitle}>1-week streak</Text>
              <Text style={styles.streakSubtitle}>
                Keep the quiz streak alive! Good for you
              </Text>
              <View style={styles.streakDays}>
                {streakDays.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.streakDay,
                      item.active && styles.streakDayActive,
                    ]}>
                    <Text
                      style={[
                        styles.streakDayText,
                        item.active && styles.streakDayTextActive,
                      ]}>
                      {item.day}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stats</Text>
          <View style={styles.statsCard}>
            <Text style={styles.statsCardTitle}>
              Played a total <Text style={styles.statsHighlight}>24 quizzes</Text>{' '}
              this Week!
            </Text>
            <View style={styles.circularProgress}>
              <Text style={styles.progressNumber}>37</Text>
              <Text style={styles.progressLabel}>Quiz</Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statsItem}>
                <Text style={styles.statsItemIcon}>✅</Text>
                <Text style={styles.statsItemValue}>23</Text>
                <Text style={styles.statsItemLabel}>Passed</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsItemIcon}>⏱️</Text>
                <Text style={styles.statsItemValue}>7th</Text>
                <Text style={styles.statsItemLabel}>Top Score</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Top Performance by Category */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top performance by category</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Weekly →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.performanceSection}>
            <View style={styles.categoryLabels}>
              {performanceData.map((item, index) => (
                <Text key={index} style={styles.categoryLabel}>
                  {item.category}
                </Text>
              ))}
            </View>

            <View style={styles.chartContainer}>
              {performanceData.map((item, index) => (
                <View key={index} style={styles.barContainer}>
                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: `${item.percentage}%`,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel}>{item.percentage}%</Text>
                </View>
              ))}
            </View>

            <View style={styles.chartAxis}>
              <Text style={styles.axisLabel}>0%</Text>
              <Text style={styles.axisLabel}>25%</Text>
              <Text style={styles.axisLabel}>50%</Text>
              <Text style={styles.axisLabel}>75%</Text>
              <Text style={styles.axisLabel}>100%</Text>
            </View>
          </View>
        </View>

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
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B6FED',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statEmoji: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5B6FED',
  },
  streakCard: {
    backgroundColor: '#F7F8F9',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  streakEmoji: {
    fontSize: 32,
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  streakSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  streakDays: {
    flexDirection: 'row',
    gap: 6,
  },
  streakDay: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E8ECF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakDayActive: {
    backgroundColor: '#FF6B35',
  },
  streakDayText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },
  streakDayTextActive: {
    color: '#FFFFFF',
  },
  statsCard: {
    backgroundColor: '#F7F8F9',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  statsCardTitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsHighlight: {
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  circularProgress: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#5B6FED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 48,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsItemIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statsItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  statsItemLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  performanceSection: {
    flexDirection: 'row',
    gap: 16,
  },
  categoryLabels: {
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 24,
  },
  chartContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 200,
    paddingVertical: 8,
  },
  barContainer: {
    alignItems: 'center',
    width: 60,
  },
  barBackground: {
    width: 40,
    height: 180,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 8,
  },
  chartAxis: {
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  axisLabel: {
    fontSize: 10,
    color: '#9CA3AF',
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
  navLabelActive: {
    color: '#5B6FED',
    fontWeight: '600',
  },
});

export default StudentProfileScreen;
