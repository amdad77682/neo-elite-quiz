import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterDetailsScreen from '../screens/RegisterDetailsScreen';
import ProfilePictureScreen from '../screens/ProfilePictureScreen';
import AvatarSelectionScreen from '../screens/AvatarSelectionScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PointsScreen from '../screens/PointsScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import SubCategoryScreen from '../screens/SubCategoryScreen';
import ExamListScreen from '../screens/ExamListScreen';
import ExamDetailsScreen from '../screens/ExamDetailsScreen';
import ExamQuestionScreen from '../screens/ExamQuestionScreen';
import ExamResultScreen from '../screens/ExamResultScreen';
import ExamSolutionScreen from '../screens/ExamSolutionScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RegisterDetails" component={RegisterDetailsScreen} />
        <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
        <Stack.Screen name="AvatarSelection" component={AvatarSelectionScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Points" component={PointsScreen} />
        <Stack.Screen name="CategoryList" component={CategoryListScreen} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
        <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
        <Stack.Screen name="ExamList" component={ExamListScreen} />
        <Stack.Screen name="ExamDetails" component={ExamDetailsScreen} />
        <Stack.Screen name="ExamQuestion" component={ExamQuestionScreen} />
        <Stack.Screen name="ExamResult" component={ExamResultScreen} />
        <Stack.Screen name="ExamSolution" component={ExamSolutionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
