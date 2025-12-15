import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

type ProfilePictureNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfilePicture'
>;

type ProfilePictureRouteProp = RouteProp<RootStackParamList, 'ProfilePicture'>;

interface Props {
  navigation: ProfilePictureNavigationProp;
  route: ProfilePictureRouteProp;
}

const ProfilePictureScreen: React.FC<Props> = ({navigation, route}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {firstName = 'Mohammad Arafat'} = route.params || {};

  const handleChooseAvatar = () => {
    navigation.navigate('AvatarSelection', route.params);
  };

  const handleUploadPhoto = () => {
    Alert.alert('Upload Photo', 'Photo upload functionality coming soon!');
  };

  const handleContinue = () => {
    navigation.navigate('Welcome');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Profile Picture 📸</Text>
        <Text style={styles.subtitle}>
          Set your profile picture for helping your friends{'\n'}recognise you.
        </Text>

        <View style={styles.profileContainer}>
          <View style={styles.profileCircle}>
            {selectedImage ? (
              <Image source={{uri: selectedImage}} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>+</Text>
              </View>
            )}
          </View>
          <Text style={styles.profileName}>{firstName}</Text>
        </View>

        <View style={styles.avatarGrid}>
          {generateAvatars().map((avatar, index) => (
            <TouchableOpacity
              key={index}
              style={styles.avatarItem}
              onPress={() => setSelectedImage(avatar)}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarEmoji}>{avatar}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.chooseButton}
          onPress={handleChooseAvatar}>
          <Text style={styles.chooseButtonText}>Choose from Avatar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUploadPhoto}>
          <Text style={styles.uploadButtonText}>📷 Upload a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const generateAvatars = () => {
  return ['👨', '🧔', '👨‍🦰', '👨‍🦱', '👩', '👩‍🦰', '👩‍🦱', '👩‍🦳', '👱‍♀️', '👱‍♂️', '🧑', '👴'];
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
    lineHeight: 22,
    marginBottom: 32,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F7F8F9',
    borderWidth: 3,
    borderColor: '#E8ECF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    color: '#A0A0A0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  avatarItem: {
    width: '22%',
  },
  avatarCircle: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#F7F8F9',
    borderWidth: 2,
    borderColor: '#E8ECF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 32,
  },
  chooseButton: {
    backgroundColor: '#E8ECFF',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  chooseButtonText: {
    color: '#5B6FED',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#F7F8F9',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadButtonText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: '600',
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
});

export default ProfilePictureScreen;
