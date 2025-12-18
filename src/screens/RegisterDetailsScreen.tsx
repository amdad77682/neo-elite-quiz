import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

type RegisterDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RegisterDetails'
>;

type RegisterDetailsRouteProp = RouteProp<RootStackParamList, 'RegisterDetails'>;

interface Props {
  navigation: RegisterDetailsNavigationProp;
  route: RegisterDetailsRouteProp;
}

const RegisterDetailsScreen: React.FC<Props> = ({navigation, route}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [organization, setOrganization] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinue = () => {
    const registrationData = {
      email: route.params.email,
      firstName,
      lastName,
      age,
      organization,
      gender,
      role,
      password,
    };

    if (role === 'student') {
      // Students need to select a teacher
      navigation.navigate('TeacherSelection', registrationData);
    } else {
      // Teachers can proceed directly to profile picture
      navigation.navigate('ProfilePicture', {...registrationData});
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#1E1E1E" />
          </TouchableOpacity>

          <Text style={styles.title}>Let's Get Started 🤝</Text>
          <Text style={styles.subtitle}>Please enter your information here</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#A0A0A0"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#A0A0A0"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Age"
              placeholderTextColor="#A0A0A0"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Organization"
              placeholderTextColor="#A0A0A0"
              value={organization}
              onChangeText={setOrganization}
            />
          </View>

          <Text style={styles.label}>Choose your Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'male' && styles.genderButtonActive,
              ]}
              onPress={() => setGender('male')}>
              <View
                style={[
                  styles.radioOuter,
                  gender === 'male' && styles.radioOuterActive,
                ]}>
                {gender === 'male' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderIcon}>👨</Text>
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'female' && styles.genderButtonActive,
              ]}
              onPress={() => setGender('female')}>
              <View
                style={[
                  styles.radioOuter,
                  gender === 'female' && styles.radioOuterActive,
                ]}>
                {gender === 'female' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderIcon}>👩</Text>
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Choose your Role</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                role === 'student' && styles.genderButtonActive,
              ]}
              onPress={() => setRole('student')}>
              <View
                style={[
                  styles.radioOuter,
                  role === 'student' && styles.radioOuterActive,
                ]}>
                {role === 'student' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderIcon}>🎓</Text>
              <Text style={styles.genderText}>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                role === 'teacher' && styles.genderButtonActive,
              ]}
              onPress={() => setRole('teacher')}>
              <View
                style={[
                  styles.radioOuter,
                  role === 'teacher' && styles.radioOuterActive,
                ]}>
                {role === 'teacher' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.genderIcon}>👨‍🏫</Text>
              <Text style={styles.genderText}>Teacher</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeText}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#A0A0A0"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Text style={styles.eyeText}>
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </Text>
            </TouchableOpacity>
          </View>

          {password !== confirmPassword && confirmPassword.length > 0 && (
            <Text style={styles.errorText}>
              ⚠️ Password didn't match! Please check and try again.
            </Text>
          )}

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
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
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 24,
    color: '#1E1E1E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6A707C',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  input: {
    backgroundColor: '#F7F8F9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#E8ECF4',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  eyeText: {
    fontSize: 20,
  },
  label: {
    fontSize: 15,
    color: '#1E1E1E',
    marginBottom: 12,
    fontWeight: '500',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F8F9',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  genderButtonActive: {
    backgroundColor: '#E8ECFF',
    borderColor: '#5B6FED',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#5B6FED',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5B6FED',
  },
  genderIcon: {
    fontSize: 20,
  },
  genderText: {
    fontSize: 14,
    color: '#1E1E1E',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#5B6FED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RegisterDetailsScreen;
