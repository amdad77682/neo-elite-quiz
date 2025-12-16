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
import {RootStackParamList} from '../../navigation/types';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type TeacherDashboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TeacherDashboard'
>;

interface Props {
  navigation: TeacherDashboardNavigationProp;
}

interface AnalyticCard {
  id: string;
  title: string;
  value: string;
  icon: string;
  color: string;
}

const TeacherDashboardScreen: React.FC<Props> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('home');

  const analytics: AnalyticCard[] = [
    {
      id: '1',
      title: 'Total Students',
      value: '245',
      icon: '👥',
      color: '#93C5FD',
    },
    {
      id: '2',
      title: 'Active Exams',
      value: '12',
      icon: '📝',
      color: '#FCD34D',
    },
    {
      id: '3',
      title: 'Avg. Score',
      value: '78%',
      icon: '📊',
      color: '#86EFAC',
    },
    {
      id: '4',
      title: 'Total Points',
      value: '45.2K',
      icon: '⭐',
      color: '#FCA5A5',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome Teacher! 👋</Text>
            <Text style={styles.subtitle}>Dashboard Overview</Text>
          </View>
        </View>

        {/* Analytics Cards */}
        <View style={styles.analyticsContainer}>
          {analytics.map(card => (
            <View
              key={card.id}
              style={[styles.analyticsCard, {backgroundColor: card.color}]}>
              <Text style={styles.cardIcon}>{card.icon}</Text>
              <Text style={styles.cardValue}>{card.value}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('StudentAnalytics')}>
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>📈</Text>
            </View>
            <Text style={styles.actionTitle}>Student Analytics</Text>
            <Text style={styles.actionSubtitle}>View detailed analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('StudentList')}>
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>📋</Text>
            </View>
            <Text style={styles.actionTitle}>Student List</Text>
            <Text style={styles.actionSubtitle}>Manage students</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('TeacherExamList')}>
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>📝</Text>
            </View>
            <Text style={styles.actionTitle}>Exam List</Text>
            <Text style={styles.actionSubtitle}>View all exams</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Leaderboard', {role: 'teacher'})}>
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>🏆</Text>
            </View>
            <Text style={styles.actionTitle}>Leaderboard</Text>
            <Text style={styles.actionSubtitle}>Overall & exam-wise</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text
            style={[
              styles.navText,
              activeTab === 'home' && styles.navTextActive,
            ]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('TeacherProfile')}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6A707C',
  },
  analyticsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
  },
  analyticsCard: {
    width: (SCREEN_WIDTH - 48) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 12,
    color: '#1E1E1E',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginLeft: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
    paddingBottom: 100,
  },
  actionCard: {
    width: (SCREEN_WIDTH - 48) / 2,
    backgroundColor: '#F7F8F9',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6A707C',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8ECF4',
    paddingBottom: 20,
    paddingTop: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#6A707C',
  },
  navTextActive: {
    color: '#5B6FED',
    fontWeight: '600',
  },
});

export default TeacherDashboardScreen;
