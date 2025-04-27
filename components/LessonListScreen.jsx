import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

const LessonListScreen = ({ navigation }) => {
  // ข้อมูลบทเรียนจำลอง
  const lessons = [
    {
      id: "1",
      title: "🕰️ 1. Present Simple Tense",
      description:
        "• ใช้พูดถึงสิ่งที่เกิดขึ้นเป็นประจำ, ข้อเท็จจริงทั่วไป, หรือนิสัยส่วนตัว",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson1.png"),
    },
    {
      id: "2",
      title: "🕰️ 2. Present Continuous Tense",
      description:
        "• ใช้กับสิ่งที่กำลังเกิดขึ้นตอนนี้ ขณะพูดหรือช่วงเวลานี้\n• ใช้กับแผนในอนาคตอันใกล้ (แน่นอนแล้ว)",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson2.png"),
    },
    {
      id: "3",
      title: "🕰️ 3. Present Perfect Tense",
      description:
        "• ใช้พูดถึงการกระทำที่เกิดขึ้นในอดีต แต่มีผลถึงปัจจุบัน\n• ใช้พูดถึงประสบการณ์ในชีวิต (ไม่ได้ระบุเวลาแน่นอน)",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson3.png"),
    },
    {
      id: "4",
      title: "🕰️ 4. Present Perfect Continuous Tense",
      description:
        "• ใช้เมื่อเน้น “ระยะเวลา” ของสิ่งที่เริ่มในอดีต และยังต่อเนื่องถึงปัจจุบัน",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson4.png"),
    },
    {
      id: "5",
      title: "🕰️ 5. Past Simple Tense",
      description: "• ใช้พูดถึงเหตุการณ์ที่เกิดขึ้นและจบลงแล้วในอดีต",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson5.png"),
    },
    {
      id: "6",
      title: "🕰️ 6. Past Continuous Tense",
      description:
        "• ใช้กับเหตุการณ์ที่กำลังดำเนินอยู่ในช่วงเวลาหนึ่งในอดีต\n• ใช้ร่วมกับ Past Simple (ขัดจังหวะ)",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson6.png"),
    },
    {
      id: "7",
      title: "🕰️ 7. Past Perfect Tense",
      description:
        "• ใช้เมื่อมี 2 เหตุการณ์ในอดีต และต้องการบอกว่าอันไหนเกิดก่อน",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson7.png"),
    },
    {
      id: "8",
      title: "🕰️ 8. Past Perfect Continuous Tense",
      description:
        "• ใช้เมื่อเน้นระยะเวลาของสิ่งที่เกิดขึ้นก่อนอีกเหตุการณ์ในอดีต",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson8.png"),
    },
    {
      id: "9",
      title: "🕰️ 9. Future Simple Tense",
      description: "• ใช้พูดถึงสิ่งที่ “จะ” เกิดขึ้นในอนาคต",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson9.png"),
    },
    {
      id: "10",
      title: "🕰️ 10. Future Continuous Tense",
      description: "• ใช้กับเหตุการณ์ที่กำลังจะเกิดขึ้นในช่วงเวลาหนึ่งของอนาคต",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson10.png"),
    },
    {
      id: "11",
      title: "🕰️ 11. Future Perfect Tense",
      description: "• ใช้เมื่อเหตุการณ์หนึ่งจะเสร็จสิ้นก่อนอีกเหตุการณ์ในอนาคต",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson11.png"),
    },
    {
      id: "12",
      title: "🕰️ 12. Future Perfect Continuous Tense",
      description:
        "• ใช้เมื่อเน้นระยะเวลาของสิ่งที่ดำเนินมาต่อเนื่องจนถึงจุดหนึ่งในอนาคต",
      // duration: 'ระยะเวลา 30',
      // level: 'เริ่มต้น',
      image: require("../src/images/lesson12.png"),
    },
  ];

  const renderLessonItem = ({ item }) => (
    <TouchableOpacity
      style={styles.lessonCard}
      onPress={() =>
        navigation.navigate("LessonDetail", {
          id: item.id,
          title: item.title,
          lesson: item,
        })
      }
    >
      <Image source={item.image} style={styles.lessonImage} />
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonDescription}>{item.description}</Text>
        <View style={styles.lessonMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          {/* <View style={styles.metaItem}>
            <Text style={[
              styles.metaText,
              styles.levelText,
              item.level === 'เริ่มต้น' ? styles.beginnerLevel :
              item.level === 'ปานกลาง' ? styles.intermediateLevel :
              styles.advancedLevel
            ]}>
              {item.level}
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>บทเรียนทั้งหมด</Text>
      <Text style={styles.subheaderText}>
        เลือกบทเรียนที่คุณต้องการเรียนรู้
      </Text>

      <FlatList
        data={lessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    paddingHorizontal: 16,
  },
  subheaderText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  listContainer: {
    height: "1px",
    paddingBottom: 16,
  },
  lessonCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonImage: {
    width: "100%",
    height: 130,
    resizeMode: "center",
  },
  lessonContent: {
    padding: 16,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  lessonMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "#777",
  },
  levelText: {
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  beginnerLevel: {
    color: "#28a745",
    backgroundColor: "#e6f7ed",
  },
  intermediateLevel: {
    color: "#fd7e14",
    backgroundColor: "#fff3e6",
  },
  advancedLevel: {
    color: "#dc3545",
    backgroundColor: "#f8e6e8",
  },
});

export default LessonListScreen;
