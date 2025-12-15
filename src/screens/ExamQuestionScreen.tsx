import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type ExamQuestionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExamQuestion'
>;

type ExamQuestionRouteProp = RouteProp<RootStackParamList, 'ExamQuestion'>;

interface Props {
  navigation: ExamQuestionNavigationProp;
  route: ExamQuestionRouteProp;
}

type QuestionType = 'text' | 'image' | 'multipleImages';

interface Answer {
  id: string;
  text?: string;
  image?: string;
}

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  image?: string;
  answers: Answer[];
  correctAnswer: string;
}

const ExamQuestionScreen: React.FC<Props> = ({navigation, route}) => {
  const {examTitle, totalQuestions} = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});

  // Mock questions data
  const questions: Question[] = [
    {
      id: 1,
      type: 'text',
      question: 'What is the name of the toy cowboy in Toy Story?',
      answers: [
        {id: 'a', text: 'Answer 1'},
        {id: 'b', text: 'Answer 2'},
        {id: 'c', text: 'Answer 3'},
        {id: 'd', text: 'Answer 4'},
      ],
      correctAnswer: 'a',
    },
    {
      id: 2,
      type: 'image',
      question: 'What is the name of the toy cowboy in Toy Story?',
      image: 'https://via.placeholder.com/350x200',
      answers: [
        {id: 'a', text: 'Answer 1'},
        {id: 'b', text: 'Answer 2'},
        {id: 'c', text: 'Answer 3'},
        {id: 'd', text: 'Answer 4'},
      ],
      correctAnswer: 'b',
    },
    {
      id: 3,
      type: 'multipleImages',
      question: 'What is the name of the toy cowboy in Toy Story?',
      answers: [
        {id: 'a', image: 'https://via.placeholder.com/150'},
        {id: 'b', image: 'https://via.placeholder.com/150'},
        {id: 'c', image: 'https://via.placeholder.com/150'},
        {id: 'd', image: 'https://via.placeholder.com/150'},
      ],
      correctAnswer: 'c',
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = {...answers, [currentQuestionIndex]: selectedAnswer};
      setAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        // Navigate to result screen
        navigation.navigate('ExamResult', {
          examTitle,
          totalQuestions,
          correctAnswers: 15,
          wrongAnswers: 5,
          points: 192,
        });
      }
    }
  };

  const handleSubmit = () => {
    // Submit exam and navigate to result
    navigation.navigate('ExamResult', {
      examTitle,
      totalQuestions,
      correctAnswers: 15,
      wrongAnswers: 5,
      points: 192,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.questionNumber}>
            {currentQuestionIndex + 1}/{totalQuestions}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {width: `${progress}%`}]} />
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          {currentQuestion.type === 'image' && currentQuestion.image && (
            <Image
              source={{uri: currentQuestion.image}}
              style={styles.questionImage}
              resizeMode="cover"
            />
          )}

          {/* Answers */}
          <View style={styles.answersContainer}>
            {currentQuestion.type === 'multipleImages' ? (
              <View style={styles.imageAnswersGrid}>
                {currentQuestion.answers.map(answer => (
                  <TouchableOpacity
                    key={answer.id}
                    style={[
                      styles.imageAnswerCard,
                      selectedAnswer === answer.id &&
                        styles.imageAnswerCardSelected,
                    ]}
                    onPress={() => handleAnswerSelect(answer.id)}>
                    <Image
                      source={{uri: answer.image}}
                      style={styles.answerImage}
                      resizeMode="cover"
                    />
                    <View style={styles.answerLabelContainer}>
                      <Text style={styles.answerLabel}>
                        Answer {answer.id.toUpperCase()}
                      </Text>
                      {selectedAnswer === answer.id && (
                        <View style={styles.checkmark}>
                          <Text style={styles.checkmarkText}>✓</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              currentQuestion.answers.map(answer => (
                <TouchableOpacity
                  key={answer.id}
                  style={[
                    styles.answerOption,
                    selectedAnswer === answer.id && styles.answerOptionSelected,
                  ]}
                  onPress={() => handleAnswerSelect(answer.id)}>
                  <View
                    style={[
                      styles.radioButton,
                      selectedAnswer === answer.id &&
                        styles.radioButtonSelected,
                    ]}>
                    {selectedAnswer === answer.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.answerText,
                      selectedAnswer === answer.id && styles.answerTextSelected,
                    ]}>
                    {answer.text}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      {/* Next Button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedAnswer && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!selectedAnswer}>
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF4',
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
  headerCenter: {
    flex: 1,
    marginHorizontal: 16,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E8ECF4',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5B6FED',
    borderRadius: 3,
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#5B6FED',
    borderRadius: 8,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  questionCard: {
    backgroundColor: '#F7F8F9',
    borderRadius: 16,
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 20,
    lineHeight: 26,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  answersContainer: {
    marginTop: 8,
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E8ECF4',
  },
  answerOptionSelected: {
    borderColor: '#5B6FED',
    backgroundColor: '#EEF0FF',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#5B6FED',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5B6FED',
  },
  answerText: {
    flex: 1,
    fontSize: 15,
    color: '#1E1E1E',
  },
  answerTextSelected: {
    fontWeight: '600',
    color: '#5B6FED',
  },
  imageAnswersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageAnswerCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E8ECF4',
  },
  imageAnswerCardSelected: {
    borderColor: '#10B981',
    borderWidth: 3,
  },
  answerImage: {
    width: '100%',
    height: 120,
  },
  answerLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  answerLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8ECF4',
  },
  nextButton: {
    backgroundColor: '#5B6FED',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ExamQuestionScreen;
