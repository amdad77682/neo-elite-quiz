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
import {RootStackParamList} from '../navigation/types';

type PointsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Points'
>;

interface Props {
  navigation: PointsNavigationProp;
}

interface PointHistory {
  id: string;
  date: string;
  time: string;
  exam: string;
  points: number;
  type: 'gain' | 'loss';
}

const PointsScreen: React.FC<Props> = ({navigation}) => {
  const pointsHistory: PointHistory[] = [
    {
      id: '1',
      date: '1 Jan 2024',
      time: '09:30 pm',
      exam: 'Physics Every Monday Night Quiz',
      points: 100,
      type: 'gain',
    },
    {
      id: '2',
      date: '2 Jan 2024',
      time: '09:30 pm',
      exam: 'Physics Every Tuesday Night Quiz',
      points: 100,
      type: 'gain',
    },
    {
      id: '3',
      date: '3 Jan 2024',
      time: '09:30 pm',
      exam: 'Physics Every Wednesday Night Quiz',
      points: 70,
      type: 'gain',
    },
    {
      id: '4',
      date: '4 Jan 2024',
      time: '09:30 pm',
      exam: 'Physics Every Thursday Night Quiz',
      points: 100,
      type: 'gain',
    },
    {
      id: '5',
      date: '5 Jan 2024',
      time: '09:30 pm',
      exam: 'Physics Every Friday Night Quiz',
      points: 100,
      type: 'gain',
    },
    {
      id: '6',
      date: '6 Jan 2024',
      time: '09:30 pm',
      exam: 'Physics Every Saturday Night Quiz',
      points: 100,
      type: 'gain',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#1E1E1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Points</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.headerContent}>
          <Image
            source={{uri: 'https://via.placeholder.com/60'}}
            style={styles.headerImage}
          />
          <View style={styles.pointsDisplay}>
            <Text style={styles.pointsNumber}>13</Text>
            <Text style={styles.pointsLabel}>Points</Text>
          </View>
          <TouchableOpacity style={styles.streakButton}>
            <Text style={styles.streakButtonText}>See Streak</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.streakInfo}>
          <View style={styles.streakItem}>
            <Text style={styles.streakIcon}>⏱️</Text>
            <Text style={styles.streakValue}>2 days</Text>
          </View>
          <View style={styles.streakItem}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakValue}>14</Text>
          </View>
        </View>
      </View>

      {/* Point History */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Point History</Text>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {pointsHistory.map(item => (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyInfo}>
                <Text style={styles.historyDate}>
                  {item.date}, {item.time}
                </Text>
                <Text style={styles.historyExam}>{item.exam}</Text>
              </View>
              <View style={styles.pointsChange}>
                <Text
                  style={[
                    styles.pointsValue,
                    item.type === 'gain' && styles.pointsGain,
                    item.type === 'loss' && styles.pointsLoss,
                  ]}>
                  {item.type === 'gain' ? '+' : '-'}
                  {item.points}
                </Text>
              </View>
            </View>
          ))}

          <View style={{height: 100}} />
        </ScrollView>
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
    backgroundColor: '#5B6FED',
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
  headerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  pointsDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pointsLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  streakButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  streakButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  streakInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
  },
  streakItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakIcon: {
    fontSize: 20,
  },
  streakValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  historyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
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
  historyExam: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  pointsChange: {
    marginLeft: 12,
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsGain: {
    color: '#10B981',
  },
  pointsLoss: {
    color: '#EF4444',
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

export default PointsScreen;
