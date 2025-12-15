import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type ExamSolutionNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ExamSolution'
>;

interface Props {
  navigation: ExamSolutionNavigationProp;
}

interface Solution {
  id: number;
  question: string;
  image?: string;
  answers: {
    id: string;
    text?: string;
    image?: string;
    isCorrect: boolean;
    isUserAnswer: boolean;
  }[];
  explanation?: string;
}

const ExamSolutionScreen: React.FC<Props> = ({navigation}) => {
  const solutions: Solution[] = [
    {
      id: 1,
      question: 'What is the name of the toy cowboy in Toy Story?',
      answers: [
        {id: 'a', text: 'Answer 1', isCorrect: true, isUserAnswer: true},
        {id: 'b', text: 'Answer 2', isCorrect: false, isUserAnswer: false},
        {id: 'c', text: 'Answer 3', isCorrect: false, isUserAnswer: false},
        {id: 'd', text: 'Answer 4', isCorrect: false, isUserAnswer: false},
      ],
      explanation:
        'Lorem ipsum dolor sit amet consectetur. Elit molestie imperdiet aliquam scelerisque morbi sed ut vel tortor felis lorem.',
    },
    {
      id: 2,
      question: 'What is the name of the toy cowboy in Toy Story?',
      image: 'https://via.placeholder.com/350x200',
      answers: [
        {id: 'a', text: 'Answer 1', isCorrect: true, isUserAnswer: false},
        {id: 'b', text: 'Answer 2', isCorrect: false, isUserAnswer: true},
        {id: 'c', text: 'Answer 3', isCorrect: false, isUserAnswer: false},
        {id: 'd', text: 'Answer 4', isCorrect: false, isUserAnswer: false},
      ],
    },
    {
      id: 3,
      question: 'What is the name of the toy cowboy in Toy Story?',
      answers: [
        {
          id: 'a',
          image: 'https://via.placeholder.com/150',
          isCorrect: true,
          isUserAnswer: false,
        },
        {
          id: 'b',
          image: 'https://via.placeholder.com/150',
          isCorrect: false,
          isUserAnswer: false,
        },
        {
          id: 'c',
          image: 'https://via.placeholder.com/150',
          isCorrect: false,
          isUserAnswer: true,
        },
        {
          id: 'd',
          image: 'https://via.placeholder.com/150',
          isCorrect: false,
          isUserAnswer: false,
        },
      ],
      explanation:
        'Lorem ipsum dolor sit amet consectetur. Elit molestie imperdiet aliquam scelerisque morbi sed ut vel tortor felis lorem.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solution</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {solutions.map((solution, index) => (
          <View key={solution.id} style={styles.solutionCard}>
            <Text style={styles.questionNumber}>Question {index + 1}</Text>
            <Text style={styles.questionText}>{solution.question}</Text>

            {solution.image && (
              <Image
                source={{uri: solution.image}}
                style={styles.questionImage}
                resizeMode="cover"
              />
            )}

            {/* Answers */}
            <View style={styles.answersContainer}>
              {solution.answers[0].image ? (
                // Image answers
                <View style={styles.imageAnswersGrid}>
                  {solution.answers.map(answer => (
                    <View
                      key={answer.id}
                      style={[
                        styles.imageAnswerCard,
                        answer.isCorrect && styles.imageAnswerCardCorrect,
                        answer.isUserAnswer &&
                          !answer.isCorrect &&
                          styles.imageAnswerCardWrong,
                      ]}>
                      <Image
                        source={{uri: answer.image}}
                        style={styles.answerImage}
                        resizeMode="cover"
                      />
                      <View style={styles.answerLabelContainer}>
                        <Text style={styles.answerLabel}>
                          Answer {answer.id.toUpperCase()}
                        </Text>
                        {answer.isCorrect && (
                          <View style={styles.checkmarkCorrect}>
                            <Text style={styles.checkmarkText}>✓</Text>
                          </View>
                        )}
                        {answer.isUserAnswer && !answer.isCorrect && (
                          <View style={styles.checkmarkWrong}>
                            <Text style={styles.checkmarkText}>✗</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                // Text answers
                solution.answers.map(answer => (
                  <View
                    key={answer.id}
                    style={[
                      styles.answerOption,
                      answer.isCorrect && styles.answerOptionCorrect,
                      answer.isUserAnswer &&
                        !answer.isCorrect &&
                        styles.answerOptionWrong,
                    ]}>
                    <View
                      style={[
                        styles.radioButton,
                        answer.isCorrect && styles.radioButtonCorrect,
                        answer.isUserAnswer &&
                          !answer.isCorrect &&
                          styles.radioButtonWrong,
                      ]}>
                      {(answer.isCorrect || answer.isUserAnswer) && (
                        <View
                          style={[
                            styles.radioButtonInner,
                            answer.isCorrect && styles.radioButtonInnerCorrect,
                            answer.isUserAnswer &&
                              !answer.isCorrect &&
                              styles.radioButtonInnerWrong,
                          ]}
                        />
                      )}
                    </View>
                    <Text style={styles.answerText}>{answer.text}</Text>
                  </View>
                ))
              )}
            </View>

            {/* Explanation */}
            {solution.explanation && (
              <View style={styles.explanationCard}>
                <Text style={styles.explanationTitle}>📖 Explanation</Text>
                <Text style={styles.explanationText}>
                  {solution.explanation}
                </Text>
              </View>
            )}
          </View>
        ))}

        <View style={{height: 100}} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Explore')}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Leaderboard')}>
          <Text style={styles.navIcon}>🏆</Text>
          <Text style={styles.navLabel}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>❓</Text>
          <Text style={styles.navLabel}>My Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  solutionCard: {
    backgroundColor: '#F7F8F9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 16,
    lineHeight: 24,
  },
  questionImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  answersContainer: {
    marginBottom: 16,
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E8ECF4',
  },
  answerOptionCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  answerOptionWrong: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonCorrect: {
    borderColor: '#10B981',
  },
  radioButtonWrong: {
    borderColor: '#EF4444',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioButtonInnerCorrect: {
    backgroundColor: '#10B981',
  },
  radioButtonInnerWrong: {
    backgroundColor: '#EF4444',
  },
  answerText: {
    flex: 1,
    fontSize: 14,
    color: '#1E1E1E',
  },
  imageAnswersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageAnswerCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E8ECF4',
  },
  imageAnswerCardCorrect: {
    borderColor: '#10B981',
    borderWidth: 3,
  },
  imageAnswerCardWrong: {
    borderColor: '#EF4444',
    borderWidth: 3,
  },
  answerImage: {
    width: '100%',
    height: 100,
  },
  answerLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  answerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  checkmarkCorrect: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkWrong: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  explanationCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#E8ECF4',
    paddingBottom: 24,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
});

export default ExamSolutionScreen;
