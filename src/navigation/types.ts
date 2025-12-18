export type UserRole = 'student' | 'teacher';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  RegisterDetails: {email: string};
  TeacherSelection: {
    email: string;
    firstName: string;
    lastName: string;
    age: string;
    organization: string;
    gender: 'male' | 'female' | '';
    role: UserRole;
    password: string;
  };
  ProfilePicture: {
    email: string;
    firstName: string;
    lastName: string;
    age: string;
    organization: string;
    gender: 'male' | 'female' | '';
    role: UserRole;
    password: string;
    teacher_id?: string;
  };
  AvatarSelection: {
    email: string;
    firstName: string;
    lastName: string;
    age: string;
    organization: string;
    gender: 'male' | 'female' | '';
    role: UserRole;
  };
  Welcome: {role: UserRole};
  ForgotPassword: undefined;
  OTPVerification: {email: string};
  ResetPassword: undefined;
  Home: {role: UserRole};
  Leaderboard: {role: UserRole};
  Explore: undefined;
  Profile: {role: UserRole};
  StudentProfile: undefined;
  TeacherProfile: undefined;
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
  TeacherDashboard: undefined;
  StudentAnalytics: undefined;
  StudentList: undefined;
  TeacherExamList: undefined;
};
