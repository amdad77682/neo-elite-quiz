import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Exam {
  id: string;
  title: string;
  category: string;
  questions: number;
  duration: string;
  participants: string;
  color: string;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const categories: Category[] = [
    {id: '1', name: 'Math', icon: '📐', color: '#93C5FD'},
    {id: '2', name: 'Science', icon: '🧪', color: '#FCD34D'},
    {id: '3', name: 'Maths', icon: '📊', color: '#60A5FA'},
    {id: '4', name: 'GK', icon: '💡', color: '#93C5FD'},
    {id: '5', name: 'Law', icon: '⚖️', color: '#93C5FD'},
    {id: '6', name: 'Arts And Culture', icon: '🎨', color: '#FCD34D'},
  ];

  const exams: Exam[] = [
    {
      id: '1',
      title: 'Saturday Night Quiz...',
      category: 'General Knowledge',
      questions: 20,
      duration: '30 min',
      participants: '2k',
      color: '#FECACA',
    },
    {
      id: '2',
      title: 'Saturday Night Quiz...',
      category: 'Science',
      questions: 20,
      duration: '30 min',
      participants: '2k',
      color: '#BBF7D0',
    },
  ];

  const streakDays = [
    {day: 'M', active: false},
    {day: 'T', active: false},
    {day: 'W', active: true},
    {day: 'T', active: true},
    {day: 'F', active: true},
    {day: 'S', active: true},
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={{uri: 'https://via.placeholder.com/50'}}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Mohammad Arafat</Text>
              <TouchableOpacity 
                style={styles.streakBadge}
                onPress={() => navigation.navigate('Points')}>
                <Text style={styles.streakText}>🔥 192 Points</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => setShowStreakModal(true)}>
            <Text style={styles.notificationIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Card */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>General Knowledge</Text>
            </View>
            <Text style={styles.featuredTitle}>Saturday night Quiz</Text>
            <Text style={styles.featuredSubtitle}>20 Question • 30 min • 2k</Text>
          </View>
          <View style={styles.featuredIcon}>
            <Text style={styles.featuredEmoji}>📋</Text>
          </View>
        </View>

        {/* Ongoing Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ongoing</Text>
          </View>
          <View style={styles.ongoingCard}>
            <View style={styles.ongoingInfo}>
              <Text style={styles.ongoingLabel}>EXAM</Text>
              <Text style={styles.ongoingTitle}>
                Physics Every Saturday Night Quiz
              </Text>
              <View style={styles.ongoingMeta}>
                <Text style={styles.ongoingMetaText}>⏱️ 1h 45</Text>
              </View>
            </View>
          </View>
          <View style={styles.ongoingCard}>
            <View style={styles.ongoingInfo}>
              <Text style={styles.ongoingLabel}>EXAM</Text>
              <Text style={styles.ongoingTitle}>
                Physics Every Saturday Night Quiz
              </Text>
            </View>
          </View>
        </View>

        {/* Learning Streak */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Learning Streak</Text>
          </View>
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

        {/* Custom Exam Button */}
        <TouchableOpacity style={styles.customExamButton}>
          <Text style={styles.customExamText}>✨ Custom Exam</Text>
        </TouchableOpacity>

        {/* Last Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Last Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityEmoji}>📚</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>General Knowledge</Text>
              <Text style={styles.activitySubtitle}>25 Question • 1 hr</Text>
            </View>
            <TouchableOpacity style={styles.restartButton}>
              <Text style={styles.restartText}>🔄 Restart</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Browse by Category */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Browse by Category</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryList')}>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryGrid}>
            {categories.map(category => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View
                  style={[
                    styles.categoryIcon,
                    {backgroundColor: category.color},
                  ]}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Exam */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Exam</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {exams.map(exam => (
              <View
                key={exam.id}
                style={[styles.examCard, {backgroundColor: exam.color}]}>
                <Text style={styles.examCategory}>{exam.category}</Text>
                <Text style={styles.examTitle}>{exam.title}</Text>
                <View style={styles.examMeta}>
                  <Text style={styles.examMetaText}>
                    📝 {exam.questions} Q • ⏱️ {exam.duration} • 👥 {exam.participants}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'home' && styles.navLabelActive,
            ]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab('explore');
            navigation.navigate('Explore');
          }}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'explore' && styles.navLabelActive,
            ]}>
            Explore
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab('leaderboard');
            navigation.navigate('Leaderboard');
          }}>
          <Text style={styles.navIcon}>🏆</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'leaderboard' && styles.navLabelActive,
            ]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('quiz')}>
          <Text style={styles.navIcon}>❓</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'quiz' && styles.navLabelActive,
            ]}>
            My Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab('profile');
            navigation.navigate('Profile');
          }}>
          <Text style={styles.navIcon}>👤</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === 'profile' && styles.navLabelActive,
            ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Streak Share Modal */}
      <Modal
        visible={showStreakModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStreakModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.streakModalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowStreakModal(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <View style={styles.streakDisplay}>
              <View style={styles.streakCircle}>
                <Text style={styles.streakNumber}>4</Text>
                <Image
                  source={{uri: 'https://via.placeholder.com/40'}}
                  style={styles.streakAvatar}
                />
              </View>
              <Text style={styles.streakDisplayTitle}>4 day streak</Text>
              <Text style={styles.streakDisplaySubtitle}>
                You're on a great track! Mohammad Arafat, keep going!
              </Text>

              <View style={styles.weekDays}>
                {['M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <View key={index} style={styles.weekDayContainer}>
                    <Text style={styles.weekDayLabel}>{day}</Text>
                    <View
                      style={[
                        styles.weekDayCircle,
                        index >= 2 && styles.weekDayCircleActive,
                      ]}>
                      {index >= 2 && <Text style={styles.weekDayCheck}>🔥</Text>}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>SHARE 📤</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => setShowStreakModal(false)}>
              <Text style={styles.continueButtonText}>CONTINUE ›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8ECF4',
  },
  profileInfo: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  streakBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '600',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationIcon: {
    fontSize: 24,
  },
  featuredCard: {
    marginHorizontal: 20,
    backgroundColor: '#5B6FED',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  featuredContent: {
    flex: 1,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  featuredIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredEmoji: {
    fontSize: 32,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
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
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5B6FED',
  },
  ongoingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  ongoingInfo: {
    flex: 1,
  },
  ongoingLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  ongoingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  ongoingMeta: {
    flexDirection: 'row',
  },
  ongoingMetaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  streakCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
    gap: 8,
  },
  streakDay: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakDayActive: {
    backgroundColor: '#FF6B35',
  },
  streakDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  streakDayTextActive: {
    color: '#FFFFFF',
  },
  customExamButton: {
    marginHorizontal: 20,
    backgroundColor: '#5B6FED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  customExamText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 24,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  restartButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#E8ECFF',
  },
  restartText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5B6FED',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (SCREEN_WIDTH - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
  },
  examCard: {
    width: 200,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  examCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  examTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  examMeta: {
    flexDirection: 'row',
  },
  examMetaText: {
    fontSize: 11,
    color: '#6B7280',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  streakModalContent: {
    backgroundColor: '#5B6FED',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  streakDisplay: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  streakCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  streakAvatar: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#5B6FED',
  },
  streakDisplayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  streakDisplaySubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
  },
  weekDays: {
    flexDirection: 'row',
    gap: 16,
  },
  weekDayContainer: {
    alignItems: 'center',
  },
  weekDayLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  weekDayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekDayCircleActive: {
    backgroundColor: '#FF6B35',
  },
  weekDayCheck: {
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5B6FED',
  },
});

export default HomeScreen;
