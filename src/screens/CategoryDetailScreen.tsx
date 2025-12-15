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

type CategoryDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CategoryDetail'
>;

type CategoryDetailRouteProp = RouteProp<RootStackParamList, 'CategoryDetail'>;

interface Props {
  navigation: CategoryDetailNavigationProp;
  route: CategoryDetailRouteProp;
}

const CategoryDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {categoryName, categoryIcon, categoryColor} = route.params;

  const examHistory = [
    {
      id: '1',
      date: '1 July 2024, 05:34 pm',
      title: 'Physics Every Saturday Night Quiz',
      points: '+10p',
      pointsColor: '#EF4444',
    },
    {
      id: '2',
      date: '1 July 2024, 05:34 pm',
      title: 'Physics Every Saturday Night Quiz',
      points: '+10p',
      pointsColor: '#EF4444',
    },
    {
      id: '3',
      date: '1 July 2024, 05:34 pm',
      title: 'Physics Every Saturday Night Quiz',
      points: '10p',
      pointsColor: '#6B7280',
    },
    {
      id: '4',
      date: '1 July 2024, 05:34 pm',
      title: 'Physics Every Saturday Night Quiz',
      points: '+10p',
      pointsColor: '#EF4444',
    },
  ];

  const handleQuizPractice = () => {
    // Navigate to quiz practice
  };

  const handleCustomExam = () => {
    // Navigate to custom exam
  };

  const handleExam = () => {
    navigation.navigate('SubCategory', {
      categoryName,
      categoryIcon,
      categoryColor,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: categoryColor || '#5B6FED'}]}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.headerIcon}>{categoryIcon}</Text>
          </View>
        </View>

        <View style={styles.pointsCard}>
          <View style={styles.pointsRow}>
            <Text style={styles.answeredLabel}>Answered</Text>
            <View style={styles.fireIcon}>
              <Text style={styles.fireEmoji}>🔥</Text>
            </View>
          </View>
          <Text style={styles.pointsNumber}>
            43<Text style={styles.pointsQ}>Q</Text>
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.actionCard} onPress={handleQuizPractice}>
          <View style={styles.actionIcon}>
            <Text style={styles.actionEmoji}>🧪</Text>
          </View>
          <Text style={styles.actionText}>Quiz Practice</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={handleCustomExam}>
          <View style={styles.actionIcon}>
            <Text style={styles.actionEmoji}>📝</Text>
          </View>
          <Text style={styles.actionText}>Custom Exam</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={handleExam}>
          <View style={styles.actionIcon}>
            <Text style={styles.actionEmoji}>📋</Text>
          </View>
          <Text style={styles.actionText}>Exam</Text>
        </TouchableOpacity>

        {/* Exam History */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Exam History</Text>

          <ScrollView
            style={styles.historyScroll}
            showsVerticalScrollIndicator={false}>
            {examHistory.map(item => (
              <View key={item.id} style={styles.historyItem}>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyDate}>{item.date}</Text>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                </View>
                <Text style={[styles.historyPoints, {color: item.pointsColor}]}>
                  {item.points}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

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
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  placeholder: {
    width: 44,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 40,
  },
  pointsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
  },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  answeredLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  fireIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireEmoji: {
    fontSize: 18,
  },
  pointsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  pointsQ: {
    fontSize: 24,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  historySection: {
    flex: 1,
    marginTop: 24,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  historyScroll: {
    flex: 1,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  historyPoints: {
    fontSize: 14,
    fontWeight: 'bold',
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

export default CategoryDetailScreen;
