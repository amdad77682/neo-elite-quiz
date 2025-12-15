import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type ExploreNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Explore'
>;

interface Props {
  navigation: ExploreNavigationProp;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const ExploreScreen: React.FC<Props> = ({navigation}) => {
  const categories: Category[] = [
    {id: '1', name: 'Math', icon: '📐', color: '#93C5FD'},
    {id: '2', name: 'Science', icon: '🧪', color: '#FCD34D'},
    {id: '3', name: 'Maths', icon: '📊', color: '#60A5FA'},
    {id: '4', name: 'GK', icon: '💡', color: '#93C5FD'},
    {id: '5', name: 'Law', icon: '⚖️', color: '#93C5FD'},
    {id: '6', name: 'Arts And Culture', icon: '🎨', color: '#FCD34D'},
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
        <Text style={styles.headerTitle}>Explore</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Category Grid */}
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
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Explore</Text>
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
    fontSize: 20,
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
    paddingTop: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: (SCREEN_WIDTH - 56) / 2,
    backgroundColor: '#F7F8F9',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryEmoji: {
    fontSize: 40,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
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

export default ExploreScreen;
