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

type SubCategoryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SubCategory'
>;

type SubCategoryRouteProp = RouteProp<RootStackParamList, 'SubCategory'>;

interface Props {
  navigation: SubCategoryNavigationProp;
  route: SubCategoryRouteProp;
}

interface SubCategoryItem {
  id: string;
  name: string;
  examCount: string;
  icon: string;
  color: string;
}

const SubCategoryScreen: React.FC<Props> = ({navigation, route}) => {
  const {categoryName} = route.params;

  const subCategories: SubCategoryItem[] = [
    {
      id: '1',
      name: 'Earth Science',
      examCount: '06 Exam',
      icon: '🌍',
      color: '#93C5FD',
    },
    {
      id: '2',
      name: 'Physics',
      examCount: '06 Exam',
      icon: '⚡',
      color: '#93C5FD',
    },
    {
      id: '3',
      name: 'Earth Science',
      examCount: '06 Exam',
      icon: '🌍',
      color: '#FCD34D',
    },
    {
      id: '4',
      name: 'Earth Science',
      examCount: '06 Exam',
      icon: '🧪',
      color: '#FCA5A5',
    },
    {
      id: '5',
      name: 'Physics',
      examCount: '06 Exam',
      icon: '⚡',
      color: '#93C5FD',
    },
    {
      id: '6',
      name: 'Earth Science',
      examCount: '06 Exam',
      icon: '🌍',
      color: '#FCD34D',
    },
  ];

  const handleSubCategoryPress = (subCategory: SubCategoryItem) => {
    navigation.navigate('ExamList', {
      categoryName,
      subCategoryName: subCategory.name,
      subCategoryIcon: subCategory.icon,
      subCategoryColor: subCategory.color,
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
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {subCategories.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.subCategoryCard}
            onPress={() => handleSubCategoryPress(item)}>
            <View style={[styles.iconContainer, {backgroundColor: item.color}]}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.subCategoryName}>{item.name}</Text>
              <Text style={styles.examCount}>{item.examCount}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

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
    paddingTop: 10,
  },
  subCategoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 28,
  },
  infoContainer: {
    flex: 1,
  },
  subCategoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  examCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  arrow: {
    fontSize: 24,
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
});

export default SubCategoryScreen;
