import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const QuizScreen = ({ route, navigation }) => {
  const { lessonId, lessonTitle } = route.params;
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // เวลาในการทำข้อสอบแต่ละข้อ (วินาที)
  const [quizQuestions, setQuizQuestions] = useState([]);

  // จำลองข้อมูลคำถามตามบทเรียน
  const mockQuizData = {
    1: [
      {
        question: "She ___ coffee every morning.",
        options: ["drink", "drinks", "drank", "drinking"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "We ___ to school by bus.",
        options: ["goes", "going", "go", "went"],
        correctAnswer: 2,
        // explanation: "",
      },
      {
        question: "He ___ not like pizza.",
        options: ["do", "does", "do not", "does not"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "___ you play the guitar?",
        options: ["Do", "Does", "Did", "Are"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "The sun ___ in the east.",
        options: ["rise", "rises", "rising", "rose"],
        correctAnswer: 1,
        // explanation: "",
      },
    ],
    2: [
      {
        question: "She ___ a letter now.",
        options: ["writes", "writing", "is writing", "write"],
        correctAnswer: 2,
        // explanation: "",
      },
      {
        question: "I ___ to music at the moment.",
        options: ["listen", "am listening", "listens", "listening"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "They ___ to Bangkok next week.",
        options: ["go", "are going", "goes", "going"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "___ he watching TV?",
        options: ["Do", "Does", "Is", "Are"],
        correctAnswer: 2,
        // explanation: "",
      },
      {
        question: "We ___ dinner right now.",
        options: ["are having", "have", "having", "has"],
        correctAnswer: 0,
        // explanation: "",
      },
    ],
    3: [
      {
        question: "She ___ already finished her homework.",
        options: ["has", "have", "had", "is"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "I ___ seen that movie before.",
        options: ["has", "have", "had", "am"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "They ___ visited London twice.",
        options: ["has", "have", "had", "are"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "___ you ever eaten sushi?",
        options: ["Have", "Has", "Did", "Do"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "He ___ not done his work yet.",
        options: ["has", "have", "has not", "have not"],
        correctAnswer: 0,
        // explanation: "",
      },
    ],
    4: [
      {
        question: "She ___ studying for 3 hours.",
        options: ["has been", "have been", "is", "was"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "They ___ working all day.",
        options: ["have", "have been", "has been", "are"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "I ___ waiting for you since 8 AM.",
        options: ["am", "was", "have been", "had been"],
        correctAnswer: 2,
        // explanation: "",
      },
      {
        question: "How long ___ he been sleeping?",
        options: ["does", "has", "is", "have"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "We ___ learning English for years.",
        options: ["have been", "has been", "had been", "are"],
        correctAnswer: 0,
        // explanation: "",
      },
    ],
    5: [
      {
        question: "She ___ to the store yesterday.",
        options: ["go", "went", "goes", "gone"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "They ___ a new car last month.",
        options: ["buy", "buys", "bought", "buying"],
        correctAnswer: 2,
        // explanation: "",
      },
      {
        question: "I ___ home late last night.",
        options: ["come", "came", "comes", "coming"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "___ you see that movie?",
        options: ["Do", "Did", "Have", "Had"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "We ___ lunch at 1 PM.",
        options: ["have", "has", "had", "having"],
        correctAnswer: 2,
        // explanation: "",
      },
    ],
    6: [
      {
        question: "I ___ TV when he arrived.",
        options: ["watch", "watched", "was watching", "watching"],
        correctAnswer: 2,
        // explanation: "",
      },
      {
        question: "They ___ dinner at 8 PM.",
        options: ["was having", "were having", "are having", "have"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "What ___ you doing at 9 last night?",
        options: ["was", "were", "did", "do"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "He ___ not listening to the teacher.",
        options: ["were", "was", "is", "be"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "While she ___, it started to rain.",
        options: ["walk", "walked", "was walking", "walks"],
        correctAnswer: 2,
        // explanation: "",
      },
    ],
    7: [
      {
        question: "I ___ finished the work before he came.",
        options: ["have", "had", "was", "did"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "She ___ already gone when we arrived.",
        options: ["had", "have", "has", "did"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "They ___ dinner before 7.",
        options: ["had had", "have", "has had", "was having"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "___ you ever been to Paris before 2020?",
        options: ["Did", "Had", "Have", "Was"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "We ___ not met him before.",
        options: ["have", "had", "did", "were"],
        correctAnswer: 1,
        // explanation: "",
      },
    ],
    8: [
      {
        question: "I ___ studying for 2 hours before he came.",
        options: ["had been", "have been", "was", "am"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "They ___ working hard all week.",
        options: ["had been", "were", "has been", "have been"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "She ___ crying for a long time.",
        options: ["has been", "was", "had been", "had"],
        correctAnswer: 2,
        // explanation: "",
      },
      {
        question: "How long ___ he been waiting?",
        options: ["had", "has", "did", "was"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "We ___ driving since 6 a.m.",
        options: ["had been", "were", "have been", "are"],
        correctAnswer: 0,
        // explanation: "",
      },
    ],
    9: [
      {
        question: "She ___ travel to Japan next year.",
        options: ["will", "would", "is", "does"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "I ___ help you with your homework.",
        options: ["will", "do", "have", "am"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "They ___ come to the party tonight.",
        options: ["will", "shall", "might", "have"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "___ you call me later?",
        options: ["Do", "Will", "Are", "Did"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "We ___ not go to school tomorrow.",
        options: ["will", "shall", "will not", "are"],
        correctAnswer: 0,
        // explanation: "",
      },
    ],
    10: [
      {
        question: "I ___ working at 9 AM tomorrow.",
        options: ["will be", "am", "will", "am going to"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "She ___ studying when you arrive.",
        options: ["is", "will be", "was", "has been"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "They ___ sleeping at that time.",
        options: ["will", "will not", "will be not", "will not be"],
        correctAnswer: 3,
        // explanation: "",
      },
      {
        question: "___ he be joining us for dinner?",
        options: ["Does", "Will", "Is", "Shall"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "We ___ flying to Paris at this time next week.",
        options: ["will", "are", "will be", "shall"],
        correctAnswer: 2,
        // explanation: "",
      },
    ],
    11: [
      {
        question: "She ___ finished the report by Monday.",
        options: ["will", "will have", "has", "had"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "I ___ completed the task before 5 PM.",
        options: ["have", "will have", "will be", "had"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "They ___ sleeping at that time.",
        options: ["will", "will have", "are", "have"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "___ you have eaten before 8?",
        options: ["Do", "Will", "Will have", "Have"],
        correctAnswer: 1,
        // explanation: "",
      },
      {
        question: "We ___ done it by next Friday.",
        options: ["will", "will not", "will not have", "are not"],
        correctAnswer: 2,
        // explanation: "",
      },
    ],
    12: [
      {
        question: "I ___ working here for 5 years by 2026.",
        options: ["will", "will be", "will have", "will have been"],
        correctAnswer: 3,
        // explanation: "",
      },
      {
        question: "She ___ studying English since she was 5.",
        options: ["will have been", "has been", "will be", "is"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "They ___ living in that house for a decade.",
        options: ["will be", "have been", "will have been", "are"],
        correctAnswer: 2,
        // explanation: "",
      },
      {
        question: "___ you have been waiting long by then?",
        options: ["Will", "Will have", "Will have been", "Have"],
        correctAnswer: 0,
        // explanation: "",
      },
      {
        question: "We ___ traveling for 8 hours by midnight.",
        options: ["will", "will be", "will have been", "will have"],
        correctAnswer: 2,
        // explanation: "",
      },
    ],
  };
  // จำลองการโหลดข้อมูล
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        // ในโปรเจคจริงอาจดึงข้อมูลจาก API หรือฐานข้อมูล
        // จำลองการรอโหลดข้อมูล
        await new Promise((resolve) => setTimeout(resolve, 500));

        const questions = mockQuizData[lessonId] || [];
        if (questions.length === 0) {
          Alert.alert(
            "ไม่พบแบบทดสอบ",
            "ขออภัย ยังไม่มีแบบทดสอบสำหรับบทเรียนนี้",
            [{ text: "กลับไปหน้าบทเรียน", onPress: () => navigation.goBack() }]
          );
          return;
        }

        setQuizQuestions(questions);
        setLoading(false);
      } catch (error) {
        console.error("Error loading quiz:", error);
        Alert.alert(
          "เกิดข้อผิดพลาด",
          "ไม่สามารถโหลดแบบทดสอบได้ กรุณาลองใหม่อีกครั้ง",
          [{ text: "กลับ", onPress: () => navigation.goBack() }]
        );
      }
    };

    loadQuizData();
  }, [lessonId]);

  // ตั้งเวลานับถอยหลัง
  useEffect(() => {
    if (loading) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, loading]);

  // จัดการเมื่อหมดเวลา
  const handleTimeout = () => {
    const newAnswers = [
      ...answers,
      {
        questionIndex: currentQuestionIndex,
        selectedOption: null,
        correct: false,
        timeOut: true,
      },
    ];

    setAnswers(newAnswers);

    // ถ้าเป็นคำถามสุดท้าย ไปยังหน้าผลลัพธ์
    if (currentQuestionIndex >= quizQuestions.length - 1) {
      navigation.navigate("QuizResult", {
        score,
        total: quizQuestions.length,
        answers: newAnswers,
        lessonTitle,
        questions: quizQuestions,
        lessonId,
      });
    } else {
      // ไปยังคำถามถัดไป
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(120);
    }
  };

  // จัดการเมื่อเลือกคำตอบ
  const handleSelectOption = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  // ส่งคำตอบและไปคำถามถัดไป
  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      Alert.alert("กรุณาเลือกคำตอบ", "คุณต้องเลือกคำตอบก่อนส่งคำตอบ");
      return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    // เพิ่มคะแนนถ้าตอบถูก
    if (isCorrect) {
      setScore(score + 1);
    }

    // บันทึกคำตอบ
    const newAnswers = [
      ...answers,
      {
        questionIndex: currentQuestionIndex,
        selectedOption,
        correct: isCorrect,
        timeOut: false,
      },
    ];

    setAnswers(newAnswers);

    // ถ้าเป็นคำถามสุดท้าย ไปยังหน้าผลลัพธ์
    if (currentQuestionIndex >= quizQuestions.length - 1) {
      navigation.navigate("QuizResult", {
        score: isCorrect ? score + 1 : score,
        total: quizQuestions.length,
        answers: newAnswers,
        lessonTitle,
        questions: quizQuestions,
        lessonId,
      });
    } else {
      // ไปยังคำถามถัดไป
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(120);
    }
  };

  // กลับไปหน้าบทเรียน
  const handleBackPress = () => {
    Alert.alert(
      "ยืนยันการออก",
      "คุณแน่ใจหรือไม่ว่าต้องการออกจากแบบทดสอบ? ความคืบหน้าทั้งหมดจะหายไป",
      [
        { text: "ไม่", style: "cancel" },
        { text: "ใช่", onPress: () => navigation.goBack() },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5e72e4" />
        <Text style={styles.loadingText}>กำลังโหลดแบบทดสอบ...</Text>
      </View>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* ส่วนบน: แถบความคืบหน้าและเวลา */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons
                onPress={handleBackPress}
                name="arrow-back"
                size={24}
                color="#5e72e4"
              />
            </TouchableOpacity>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        ((currentQuestionIndex + 1) / quizQuestions.length) *
                        100
                      }%`,
                      backgroundColor: timeLeft < 10 ? "#ff4d4d" : "#5e72e4",
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {currentQuestionIndex + 1}/{quizQuestions.length}
              </Text>
            </View>

            <View style={styles.timerContainer}>
              <Ionicons
                name="time-outline"
                size={20}
                color={timeLeft < 10 ? "#ff4d4d" : "#666"}
              />
              <Text
                style={[
                  styles.timerText,
                  timeLeft < 10 && { color: "#ff4d4d", fontWeight: "bold" },
                ]}
              >
                {timeLeft}
              </Text>
            </View>
          </View>

          {/* คำถาม */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionNumber}>
              คำถามที่ {currentQuestionIndex + 1}
            </Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>

          {/* ตัวเลือกคำตอบ */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === index && styles.selectedOption,
                ]}
                onPress={() => handleSelectOption(index)}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionBullet}>
                    <Text style={styles.optionBulletText}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                </View>

                {selectedOption === index && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="#5e72e4"
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* ปุ่มส่งคำตอบ */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              selectedOption === null && styles.disabledButton,
            ]}
            onPress={handleSubmitAnswer}
            disabled={selectedOption === null}
          >
            <Text style={styles.submitButtonText}>ส่งคำตอบ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    height: "10px",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#5e72e4",
  },
  progressText: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
    minWidth: 25,
  },
  questionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  questionNumber: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedOption: {
    borderColor: "#5e72e4",
    backgroundColor: "#f0f3ff",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionBulletText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  checkIcon: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#5e72e4",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: "auto",
  },
  disabledButton: {
    backgroundColor: "#a0a9e8",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuizScreen;
