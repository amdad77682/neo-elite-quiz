import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChevronLeft} from 'lucide-react-native';
import {RootStackParamList} from '../../navigation/types';

type StudentListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StudentList'
>;

interface Props {
  navigation: StudentListNavigationProp;
}

interface Student {
  id: string;
  name: string;
  email: string;
  points: number;
  examsCompleted: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

const StudentListScreen: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const students: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      points: 2450,
      examsCompleted: 45,
      joinDate: 'Jan 2024',
      status: 'active',
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      points: 2200,
      examsCompleted: 42,
      joinDate: 'Feb 2024',
      status: 'active',
    },
    {
      id: '3',
      name: 'Carol White',
      email: 'carol@example.com',
      points: 2100,
      examsCompleted: 40,
      joinDate: 'Jan 2024',
      status: 'active',
    },
    {
      id: '4',
      name: 'David Brown',
      email: 'david@example.com',
      points: 1950,
      examsCompleted: 38,
      joinDate: 'Mar 2024',
      status: 'active',
    },
    {
      id: '5',
      name: 'Emma Davis',
      email: 'emma@example.com',
      points: 1850,
      examsCompleted: 35,
      joinDate: 'Feb 2024',
      status: 'inactive',
    },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Student List</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search students..."
          placeholderTextColor="#A0A0A0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{students.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {students.filter(s => s.status === 'active').length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {students.filter(s => s.status === 'inactive').length}
          </Text>
          <Text style={styles.statLabel}>Inactive</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredStudents.map(student => (
          <View key={student.id} style={styles.studentCard}>
            <View style={styles.studentAvatar}>
              <Text style={styles.studentInitial}>
                {student.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.studentInfo}>
              <View style={styles.studentHeader}>
                <Text style={styles.studentName}>{student.name}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    student.status === 'active'
                      ? styles.statusActive
                      : styles.statusInactive,
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      student.status === 'active'
                        ? styles.statusTextActive
                        : styles.statusTextInactive,
                    ]}>
                    {student.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.studentEmail}>{student.email}</Text>
              <View style={styles.studentStats}>
                <Text style={styles.statText}>⭐ {student.points} pts</Text>
                <Text style={styles.statText}>
                  📝 {student.examsCompleted} exams
                </Text>
                <Text style={styles.statText}>📅 {student.joinDate}</Text>
              </View>
            </View>
          </View>
        ))}

        {filteredStudents.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No students found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search query
            </Text>
          </View>
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    margin: 20,
    marginBottom: 0,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1E1E1E',
  },
  statsBar: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#F7F8F9',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6A707C',
  },
  scrollView: {
    flex: 1,
  },
  studentCard: {
    flexDirection: 'row',
    backgroundColor: '#F7F8F9',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5B6FED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  studentInfo: {
    flex: 1,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusActive: {
    backgroundColor: '#D1FAE5',
  },
  statusInactive: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusTextActive: {
    color: '#065F46',
  },
  statusTextInactive: {
    color: '#991B1B',
  },
  studentEmail: {
    fontSize: 12,
    color: '#6A707C',
    marginBottom: 8,
  },
  studentStats: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  statText: {
    fontSize: 12,
    color: '#6A707C',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6A707C',
  },
});

export default StudentListScreen;
