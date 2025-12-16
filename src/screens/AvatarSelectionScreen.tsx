import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type AvatarSelectionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AvatarSelection'
>;

type AvatarSelectionRouteProp = RouteProp<RootStackParamList, 'AvatarSelection'>;

interface Props {
  navigation: AvatarSelectionNavigationProp;
  route: AvatarSelectionRouteProp;
}

const AvatarSelectionScreen: React.FC<Props> = ({navigation, route}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const avatars = [
    '👨', '🧔', '👨‍🦰', '👨‍🦱', '👩', '👩‍🦰', '👩‍🦱', '👩‍🦳',
    '👱‍♀️', '👱‍♂️', '🧑', '👴', '👵', '👨‍💼', '👩‍💼', '👨‍🎓',
    '👩‍🎓', '👨‍⚕️', '👩‍⚕️', '👨‍🍳', '👩‍🍳', '👨‍🔧', '👩‍🔧', '👨‍🏫',
    '👩‍🏫', '👨‍🎨', '👩‍🎨', '👨‍🚀', '👩‍🚀', '👨‍✈️', '👩‍✈️', '👨‍🚒',
    '👩‍🚒', '🕵️', '💂', '👷', '🤴', '👸', '👳', '🧕',
  ];

  const handleLetGo = () => {
    if (selectedAvatar) {
      navigation.navigate('Welcome', {role: route.params.role});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.title}>Avatar</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarGrid}>
          {avatars.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.avatarItem,
                selectedAvatar === avatar && styles.avatarItemSelected,
              ]}
              onPress={() => setSelectedAvatar(avatar)}>
              <View
                style={[
                  styles.avatarCircle,
                  selectedAvatar === avatar && styles.avatarCircleSelected,
                ]}>
                <Text style={styles.avatarEmoji}>{avatar}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.letGoButton,
            !selectedAvatar && styles.letGoButtonDisabled,
          ]}
          onPress={handleLetGo}
          disabled={!selectedAvatar}>
          <Text style={styles.letGoButtonText}>Let's Gooo!</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  placeholder: {
    width: 44,
  },
  scrollContent: {
    padding: 24,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
  },
  avatarItem: {
    width: (SCREEN_WIDTH - 48 - 48) / 4,
    marginBottom: 8,
  },
  avatarItemSelected: {
    transform: [{scale: 1.05}],
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
  avatarCircleSelected: {
    borderColor: '#5B6FED',
    borderWidth: 3,
    backgroundColor: '#E8ECFF',
  },
  avatarEmoji: {
    fontSize: 32,
  },
  letGoButton: {
    backgroundColor: '#5B6FED',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  letGoButtonDisabled: {
    backgroundColor: '#C7CEEA',
  },
  letGoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AvatarSelectionScreen;
