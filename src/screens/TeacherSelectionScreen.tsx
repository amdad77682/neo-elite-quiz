import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import ApiService, {Teacher} from '../services/api';

type TeacherSelectionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TeacherSelection'
>;

type TeacherSelectionRouteProp = RouteProp<RootStackParamList, 'TeacherSelection'>;

interface Props {
  navigation: TeacherSelectionNavigationProp;
  route: TeacherSelectionRouteProp;
}

const TeacherSelectionScreen: React.FC<Props> = ({navigation, route}) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const teacherList = await ApiService.getTeachers();
      setTeachers(teacherList);
    } catch (error) {
      Alert.alert('Error', 'Failed to load teachers. Please try again.');
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!selectedTeacher) {
      Alert.alert('Required', 'Please select a teacher to continue');
      return;
    }

    navigation.navigate('ProfilePicture', {
      ...route.params,
      teacher_id: selectedTeacher,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Select Your Teacher</Text>
        <View style={styles.placeholder} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5B6FED" />
          <Text style={styles.loadingText}>Loading teachers...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>
            Choose the teacher who will monitor your progress
          </Text>

          {Array.isArray(teachers) && teachers.map(teacher => (
            <TouchableOpacity
              key={teacher.id}
              style={[
                styles.teacherCard,
                selectedTeacher === teacher.id && styles.teacherCardSelected,
              ]}
              onPress={() => setSelectedTeacher(teacher.id)}>
              <View style={styles.teacherAvatar}>
                <Text style={styles.teacherInitial}>
                  {teacher.first_name.charAt(0)}
                  {teacher.last_name.charAt(0)}
                </Text>
              </View>
              <View style={styles.teacherInfo}>
                <Text style={styles.teacherName}>
                  {teacher.first_name} {teacher.last_name}
                </Text>
                <Text style={styles.teacherEmail}>{teacher.email}</Text>
                {teacher.organization && (
                  <Text style={styles.teacherOrg}>📚 {teacher.organization}</Text>
                )}
              </View>
              <View
                style={[
                  styles.radioOuter,
                  selectedTeacher === teacher.id && styles.radioOuterActive,
                ]}>
                {selectedTeacher === teacher.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}

          {Array.isArray(teachers) && teachers.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>👨‍🏫</Text>
              <Text style={styles.emptyText}>No teachers available</Text>
              <Text style={styles.emptySubtext}>
                Please contact your administrator
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedTeacher && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedTeacher}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6A707C',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A707C',
    marginBottom: 24,
    textAlign: 'center',
  },
  teacherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E8ECF4',
  },
  teacherCardSelected: {
    backgroundColor: '#EEF1FF',
    borderColor: '#5B6FED',
  },
  teacherAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5B6FED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teacherInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  teacherEmail: {
    fontSize: 14,
    color: '#6A707C',
    marginBottom: 2,
  },
  teacherOrg: {
    fontSize: 12,
    color: '#6A707C',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8ECF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#5B6FED',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5B6FED',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
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
  continueButton: {
    backgroundColor: '#5B6FED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  continueButtonDisabled: {
    backgroundColor: '#E8ECF4',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TeacherSelectionScreen;
