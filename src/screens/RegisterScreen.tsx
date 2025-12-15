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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type RegisterNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

interface Props {
  navigation: RegisterNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    navigation.navigate('RegisterDetails', {email});
  };

  const handleLoginNow = () => {
    navigation.navigate('Login');
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
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Continue With Email 📧</Text>
          <Text style={styles.subtitle}>Please enter your email address</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#A0A0A0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {email.length > 0 && (
              <TouchableOpacity
                style={styles.clearIcon}
                onPress={() => setEmail('')}>
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or Register with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>🍎</Text>
              <Text style={styles.socialButtonLabel}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>G</Text>
              <Text style={styles.socialButtonLabel}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>f</Text>
              <Text style={styles.socialButtonLabel}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLoginNow}>
              <Text style={styles.loginLink}>Login Now</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
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
  clearIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  clearText: {
    fontSize: 16,
    color: '#6A707C',
  },
  continueButton: {
    backgroundColor: '#5B6FED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8ECF4',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#6A707C',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 18,
  },
  socialButtonLabel: {
    fontSize: 14,
    color: '#1E1E1E',
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  loginText: {
    color: '#6A707C',
    fontSize: 14,
  },
  loginLink: {
    color: '#5B6FED',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
