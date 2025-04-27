import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Share,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const QuizResultScreen = ({ route, navigation }) => {
  const { score, total, answers, lessonTitle, questions, lessonId } =
    route.params;
  const [showAnswers, setShowAnswers] = useState(false);
  const percentage = Math.round((score / total) * 100);

  // คำนวณเวลาที่ใช้ในการทำแบบทดสอบ (จำลอง)
  const timeSpent = `${Math.floor((total * 2.5) / 60)}:${String(
    Math.round((total * 2.5) % 60)
  ).padStart(2, "0")}`;

  // ข้อความผลลัพธ์ตามคะแนน
  const getResultFeedback = () => {
    if (percentage >= 80) {
      return {
        title: "ยอดเยี่ยม!",
        message:
          "คุณเข้าใจเนื้อหาบทเรียนนี้อย่างดีเยี่ยม คุณพร้อมที่จะไปเรียนรู้เนื้อหาขั้นสูงต่อไปแล้ว",
        icon: require("../src/images/trophy.png"),
        color: "#FFD700",
      };
    } else if (percentage >= 60) {
      return {
        title: "ดีมาก!",
        message:
          "คุณเข้าใจเนื้อหาสNวนใหญ่ในบทเรียนนี้ แต่ยังมีบางส่วนที่ควรทบทวนเพิ่มเติม",
        icon: require("../src/images/medal.png"),
        color: "#4CAF50",
      };
    } else if (percentage >= 40) {
      return {
        title: "พอใช้",
        message:
          "คุณเข้าใจพื้นฐานบางส่วนของบทเรียน แต่ควรทบทวนเนื้อหาให้มากขึ้น และลองทำแบบทดสอบอีกครั้ง",
        icon: require("../src/images/good.png"),
        color: "#2196F3",
      };
    } else {
      return {
        title: "ต้องปรับปรุง",
        message:
          "คุณยังไม่เข้าใจเนื้อหาส่วนใหญ่ในบทเรียนนี้ แนะนำให้กลับไปศึกษาบทเรียนอีกครั้งก่อนทำแบบทดสอบใหม่",
        icon: require("../src/images/retry.png"),
        color: "#FF5722",
      };
    }
  };

  const feedback = getResultFeedback();

  // แชร์ผลลัพธ์
  const shareResult = async () => {
    try {
      await Share.share({
        message: `ฉันได้คะแนน ${score}/${total} (${percentage}%) ในแบบทดสอบ "${lessonTitle}" ในแอป "เรียนรู้"`,
        title: "ผลการทดสอบของฉัน",
      });
    } catch (error) {
      console.error("Error sharing result:", error);
    }
  };

  // กลับไปยังหน้ารายการบทเรียน
  const handleBackToLessons = () => {
    navigation.navigate("LessonList");
  };

  // ทำแบบทดสอบอีกครั้ง
  const handleRetryQuiz = () => {
    navigation.navigate("Quiz", { lessonId, lessonTitle });
  };

  // สลับการแสดงรายละเอียดคำตอบ
  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  // แสดงรายละเอียดข0อที่ตอบถูก/ผิด
  const renderAnswerDetails = () => {
    if (!showAnswers) return null;

    return (
      <View style={styles.answerDetails}>
        <Text style={styles.answerDetailsTitle}>รายละเอียดคำตอบ</Text>
        {(questions || []).map((item, index) => {
          const answerData = answers[index];
          const isCorrect = answerData?.correct || false;
          const isTimeout = answerData?.timeOut || false;
          const selectedOption = answerData?.selectedOption;

          return (
            <View style={styles.answerItem} key={index}>
              <View style={styles.answerItemHeader}>
                <Text style={styles.answerItemNumber}>ข้อ {index + 1}</Text>
                {isTimeout ? (
                  <View style={styles.timeoutBadge}>
                    <Text style={styles.timeoutText}>หมดเวลา</Text>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.resultBadge,
                      isCorrect ? styles.correctBadge : styles.incorrectBadge,
                    ]}
                  >
                    <Text style={styles.resultBadgeText}>
                      {isCorrect ? "ถูก" : "ผิด"}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.answerItemQuestion}>{item.question}</Text>

              <View style={styles.optionsList}>
                {item.options.map((option, optionIndex) => (
                  <View
                    key={optionIndex}
                    style={[
                      styles.optionItem,
                      item.correctAnswer === optionIndex &&
                        styles.correctOption,
                      !isTimeout &&
                        selectedOption === optionIndex &&
                        selectedOption !== item.correctAnswer &&
                        styles.incorrectOption,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item.correctAnswer === optionIndex &&
                          styles.correctOptionText,
                        !isTimeout &&
                          selectedOption === optionIndex &&
                          selectedOption !== item.correctAnswer &&
                          styles.incorrectOptionText,
                      ]}
                    >
                      {String.fromCharCode(65 + optionIndex)}. {option}
                    </Text>

                    {item.correctAnswer === optionIndex && (
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#4CAF50"
                      />
                    )}

                    {!isTimeout &&
                      selectedOption === optionIndex &&
                      selectedOption !== item.correctAnswer && (
                        <Ionicons
                          name="close-circle"
                          size={18}
                          color="#F44336"
                        />
                      )}
                  </View>
                ))}
              </View>

              {(isTimeout || !isCorrect) && (
                <View style={styles.explanationContainer}>
                  {/* <Text style={styles.explanationTitle}>คำอธิบาย:</Text> */}
                  <Text style={styles.explanationText}>{item.explanation}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* สNวนแสดงผลคะแนน */}
        <View style={[styles.resultCard, { borderColor: feedback.color }]}>
          <Image source={feedback.icon} style={styles.resultIcon} />
          <Text style={[styles.resultTitle, { color: feedback.color }]}>
            {feedback.title}
          </Text>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              คะแนนของคุณ:{" "}
              <Text style={styles.scoreValue}>
                {score}/{total}
              </Text>
            </Text>

            <View style={styles.percentageContainer}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${percentage}%`,
                      backgroundColor: feedback.color,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.percentageText, { color: feedback.color }]}>
                {percentage}%
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            {/* <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.statText}>เวลาที่ใช้: {timeSpent}</Text>
            </View> */}

            <View style={styles.statItem}>
              <Ionicons
                name={
                  percentage >= 60
                    ? "checkmark-circle-outline"
                    : "alert-circle-outline"
                }
                size={20}
                color={percentage >= 60 ? "#4CAF50" : "#FF5722"}
              />
              <Text style={styles.statText}>
                {percentage >= 60 ? "ผ่านเกณฑ์" : "ไม่ผ่านเกณฑ์"}
              </Text>
            </View>
          </View>

          <Text style={styles.feedbackText}>{feedback.message}</Text>
        </View>

        {/* ปุMมแสดงรายละเอียดคำตอบ */}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleShowAnswers}
        >
          <Text style={styles.toggleButtonText}>
            {showAnswers ? "ซ่อนรายละเอียดคำตอบ" : "แสดงรายละเอียดคำตอบ"}
          </Text>
          <Ionicons
            name={showAnswers ? "chevron-up" : "chevron-down"}
            size={20}
            color="#5e72e4"
          />
        </TouchableOpacity>

        {/* แสดงรายละเอียดคำตอบ */}
        {renderAnswerDetails()}

        {/* ปุMมดำเนินการ */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.retryButton]}
            onPress={handleRetryQuiz}
          >
            <Ionicons name="reload" size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>ทำแบบทดสอบอีกครั้ง</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.shareButton]}
            onPress={shareResult}
          >
            <Ionicons name="share-social" size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>แชร์ผลคะแนน</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.backButton]}
            onPress={handleBackToLessons}
          >
            <Ionicons name="list" size={20} color="#ffffff" />
            <Text style={styles.actionButtonText}>กลับสู่บทเรียน</Text>
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
  container: {
    height: "10px",
    padding: 16,
  },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  scoreContainer: {
    width: "100%",
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  scoreValue: {
    fontWeight: "bold",
    color: "#333",
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarBackground: {
    width: "80%",
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginRight: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 5,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statsContainer: {
    marginTop: 16,
    width: "100%",
    paddingHorizontal: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  feedbackText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 16,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#5e72e4",
    borderRadius: 8,
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#fff",
    marginRight: 8,
  },
  answerDetails: {
    marginTop: 16,
  },
  answerDetailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  answerItem: {
    marginBottom: 20,
  },
  answerItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  answerItemNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeoutBadge: {
    backgroundColor: "#FF5722",
    padding: 4,
    borderRadius: 4,
  },
  timeoutText: {
    color: "#ffffff",
    fontSize: 14,
  },
  resultBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  correctBadge: {
    backgroundColor: "#4CAF50",
  },
  incorrectBadge: {
    backgroundColor: "#F44336",
  },
  resultBadgeText: {
    color: "#ffffff",
    fontSize: 14,
  },
  answerItemQuestion: {
    fontSize: 16,
    color: "#333",
    marginVertical: 8,
  },
  optionsList: {
    marginLeft: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  correctOption: {
    backgroundColor: "#4CAF50",
  },
  incorrectOption: {
    backgroundColor: "#F44336",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  correctOptionText: {
    color: "#ffffff",
  },
  incorrectOptionText: {
    color: "#ffffff",
  },
  explanationContainer: {
    marginTop: 8,
  },
  explanationTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  explanationText: {
    fontSize: 14,
    color: "#666",
  },
  actionsContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: "80%",
  },
  retryButton: {
    backgroundColor: "#FF5722",
  },
  shareButton: {
    backgroundColor: "#4CAF50",
  },
  backButton: {
    backgroundColor: "#2196F3",
  },
  actionButtonText: {
    fontSize: 16,
    color: "#ffffff",
    marginLeft: 8,
  },
});

export default QuizResultScreen;
