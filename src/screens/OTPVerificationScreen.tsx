import React, {useState, useRef, useEffect} from 'react';
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
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

type OTPVerificationNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OTPVerification'
>;

type OTPVerificationRouteProp = RouteProp<RootStackParamList, 'OTPVerification'>;

interface Props {
  navigation: OTPVerificationNavigationProp;
  route: OTPVerificationRouteProp;
}

const OTPVerificationScreen: React.FC<Props> = ({navigation, route}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    navigation.navigate('ResetPassword');
  };

  const handleResend = () => {
    console.log('Resend OTP');
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

          <Text style={styles.title}>OTP Verification 🔒</Text>
          <Text style={styles.subtitle}>
            Enter the verification code we just sent on your{'\n'}email address.
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't received code? </Text>
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend</Text>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#6A707C',
    lineHeight: 22,
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: 70,
    height: 60,
    backgroundColor: '#F7F8F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8ECF4',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  verifyButton: {
    backgroundColor: '#5B6FED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: '#6A707C',
    fontSize: 14,
  },
  resendLink: {
    color: '#5B6FED',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OTPVerificationScreen;
