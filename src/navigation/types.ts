export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  RegisterDetails: {email: string};
  ProfilePicture: {
    email: string;
    firstName: string;
    lastName: string;
    age: string;
    organization: string;
    gender: 'male' | 'female' | '';
  };
  AvatarSelection: {
    email: string;
    firstName: string;
    lastName: string;
    age: string;
    organization: string;
    gender: 'male' | 'female' | '';
  };
  Welcome: undefined;
  ForgotPassword: undefined;
  OTPVerification: {email: string};
  ResetPassword: undefined;
  Home: undefined;
  Leaderboard: undefined;
  Explore: undefined;
  Profile: undefined;
  Points: undefined;
  CategoryList: undefined;
  CategoryDetail: {
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
    categoryColor: string;
  };
  SubCategory: {
    categoryName: string;
    categoryIcon: string;
    categoryColor: string;
  };
  ExamList: {
    categoryName: string;
    subCategoryName: string;
    subCategoryIcon: string;
    subCategoryColor: string;
  };
  ExamDetails: undefined;
  ExamQuestion: {
    examTitle: string;
    totalQuestions: number;
    currentQuestion: number;
  };
  ExamResult: {
    examTitle: string;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    points: number;
  };
  ExamSolution: undefined;
};
