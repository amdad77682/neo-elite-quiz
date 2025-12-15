import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type LeaderboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Leaderboard'
>;

interface Props {
  navigation: LeaderboardNavigationProp;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  points: string;
  avatar: string;
  medal?: string;
}

const LeaderboardScreen: React.FC<Props> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>(
    'weekly',
  );

  const leaderboardData: LeaderboardUser[] = [
    {rank: 1, name: 'Jennings Stender', points: '890 Points', avatar: '👨', medal: '🥇'},
    {rank: 2, name: 'Anniela Aguilar', points: '670 Points', avatar: '👩', medal: '🥈'},
    {rank: 3, name: 'Jennings Stender', points: '580 Points', avatar: '👨', medal: '🥉'},
    {rank: 4, name: 'Jennings Stender', points: '478 Points', avatar: '👨'},
    {rank: 5, name: 'Jennings Stender', points: '358 Points', avatar: '👨'},
    {rank: 6, name: 'Jennings Stender', points: '192 Points', avatar: '👨'},
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'daily' && styles.tabActive]}
          onPress={() => setActiveTab('daily')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'daily' && styles.tabTextActive,
            ]}>
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'weekly' && styles.tabActive]}
          onPress={() => setActiveTab('weekly')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'weekly' && styles.tabTextActive,
            ]}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'monthly' && styles.tabActive]}
          onPress={() => setActiveTab('monthly')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'monthly' && styles.tabTextActive,
            ]}>
            Monthly
          </Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {leaderboardData.map((user, index) => (
          <View key={index} style={styles.leaderboardItem}>
            <Text style={styles.rank}>{user.rank}</Text>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{user.avatar}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userPoints}>{user.points}</Text>
            </View>
            {user.medal && (
              <View style={styles.medalContainer}>
                <Text style={styles.medal}>{user.medal}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.currentUserCard}>
          <View style={styles.currentUserBadge}>
            <Text style={styles.currentUserBadgeText}>YOU</Text>
          </View>
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>192</Text>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>👨</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Jennings Stender (You)</Text>
              <Text style={styles.userPoints}>192 Points</Text>
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
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏆</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>
            Leaderboard
          </Text>
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
    fontSize: 20,
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
    paddingHorizontal: 20,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    width: 30,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  avatar: {
    fontSize: 28,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  userPoints: {
    fontSize: 12,
    color: '#6B7280',
  },
  medalContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medal: {
    fontSize: 20,
  },
  currentUserCard: {
    marginTop: 20,
    backgroundColor: '#E8ECFF',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  currentUserBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#5B6FED',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentUserBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
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

export default LeaderboardScreen;
