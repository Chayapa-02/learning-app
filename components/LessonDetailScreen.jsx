import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const LessonDetailScreen = ({ route, navigation }) => {
  const { lesson } = route.params;

  // เนื้อหาบทเรียนจำลอง
  const lessonContent = {
    1: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + Verb 1 (เติม s/es ถ้า He/She/It)\n• ปฏิเสธ: Subject + do/does not + Verb 1\n• คำถาม: Do/Does + Subject + Verb 1?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I eat breakfast every morning.\n  (ฉันกินอาหารเช้าทุกเช้า)\n• She works at a bank.\n  (เธอทำงานที่ธนาคาร)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• always, every day, never, usually, sometimes',
        },
      ],
    },
    2: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + am/is/are + V-ing\n• ปฏิเสธ: Subject + am/is/are + not + V-ing\n• คำถาม: Am/Is/Are + Subject + V-ing?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I am studying English right now.\n  (ฉันกำลังเรียนภาษาอังกฤษตอนนี้)\n• Simon is arriving here at 7.30 tomorrow.\n  (ไซมอนจะมาถึงที่นี่7.30 พรุ่งนี้)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• now, at the moment, currently, right now',
        },
      ],
    },
    3: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + has/have + V3\n• ปฏิเสธ: Subject + has/have not + V3\n• คำถาม: Has/Have + Subject + V3?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I have finished my homework.\n  (ฉันทำการบ้านเสร็จแล้ว)\n• She has visited Japan twice.\n  (เธอเคยไปญี่ปุ่นสองครั้งแล้ว)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• already, yet, ever, never, just, recently, since, for, so far',
        },
      ],
    },
    4: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + has/have been + V-ing\n• ปฏิเสธ: Subject + has/have not been + V-ing\n• คำถาม: Has/Have + Subject + been + V-ing?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I have been studying for three hours.\n  (ฉันเรียนมาเป็นเวลา 3 ชั่วโมงแล้ว)\n• They have been waiting for the bus since 8 a.m.\n  (พวกเขารอรถเมล์ตั้งแต่แปดโมงเช้า)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• since, for, all day, recently',
        },
      ],
    },
    5: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + Verb 2\n• ปฏิเสธ: Subject + did not + Verb 1\n• คำถาม: Did + Subject + Verb 1?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I saw a movie last night.\n  (ฉันดูหนังเมื่อคืนนี้)\n• He visited his grandma yesterday.\n  (เขาไปเยี่ยมคุณยายเมื่อวานนี้)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• yesterday, last night, in 2020, ago',
        },
      ],
    },
    6: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + was/were + V-ing\n• ปฏิเสธ: Subject + was/were not + V-ing\n• คำถาม: Was/Were + Subject + V-ing?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I was reading when you called.\n  (ฉันกำลังอ่านหนังสือตอนที่คุณโทรมา)\n• They were playing football at 5 p.m.\n  (พวกเขากำลังเล่นฟุตบอลตอนห้าโมงเย็น)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• while, when, as, at that moment (มีอีกเหตุการณ์แทรก)',
        },
      ],
    },
    7: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + had + V3\n• ปฏิเสธ: Subject + had not + V3\n• คำถาม: Had + Subject + V3?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I had finished dinner before they arrived.\n  (ฉันทานอาหารเย็นเสร็จก่อนที่พวกเขาจะมาถึง)\n• She had left when I got there.\n  (เธอไปแล้วตอนที่ฉันไปถึง)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• before, after, by the time, when',
        },
      ],
    },
    8: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + had been + V-ing\n• ปฏิเสธ: Subject + had not been + V-ing\n• คำถาม: Had + Subject + been + V-ing?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I had been working all day before I took a break.\n  (ฉันทำงานทั้งวันก่อนที่จะพัก)\n• They had been traveling for hours when the car broke down.\n  (พวกเขาเดินทางมาหลายชั่วโมงตอนที่รถเสีย)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• for, since, before, by the time, until then',
        },
      ],
    },
    9: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + will + Verb 1\n• ปฏิเสธ: Subject + will not (won't) + Verb 1\n• คำถาม: Will + Subject + Verb 1?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I will call you tomorrow.\n  (ฉันจะโทรหาคุณพรุ่งนี้)\n• She will visit us next week.\n  (เธอจะมาเยี่ยมเราสัปดาห์หน้า)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• tomorrow, next week, soon, later',
        },
      ],
    },
    10: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + will be + V-ing\n• ปฏิเสธ: Subject + will not be + V-ing\n• คำถาม: Will + Subject + be + V-ing?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I will be working at 10 a.m. tomorrow.\n  (ฉันจะกำลังทำงานตอนสิบโมงเช้าพรุ่งนี้)\n• They will be flying to Paris next month.\n  (พวกเขาจะกำลังบินไปปารีสเดือนหน้า)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• at this time tomorrow, next week',
        },
      ],
    },
    11: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + will have + V3\n• ปฏิเสธ: Subject + will not have + V3\n• คำถาม: Will + Subject + have + V3?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I will have finished the project by Friday.\n  (ฉันจะทำโปรเจกต์เสร็จภายในวันศุกร์นี้)\n• She will have left by the time you arrive.\n  (เธอจะออกไปแล้วตอนที่คุณมาถึง)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• by then, before, by the time',
        },
      ],
    },
    12: {
      sections: [
        {
          title: "🌸 โครงสร้าง",
          content:
            "• บอกเล่า: Subject + will have been + V-ing\n• ปฏิเสธ: Subject + will not have been + V-ing\n• คำถาม: Will + Subject + have been + V-ing?",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I will have been working here for 5 years next month.\n  (ฉันจะทำงานที่นี่ครบ 5 ปีในเดือนหน้า)\n• They will have been studying English for 2 years by December.\n  (พวกเขาจะเรียนภาษาอังกฤษมาเป็นเวลา 2 ปีภายในเดือนธันวาคม)",
        },
        {
          title: "💡 คำบ่งบอกเวลา",
          content:
            '• for, since, by the time, by then',
        },
      ],
    },
  };

  const currentContent = lessonContent[lesson.id] || {
    sections: [
      { title: 'ไม่พบเนื้อหา', content: 'ไม่พบเนื้อหาสำหรับบทเรียนนี้' },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Image source={lesson.image} style={styles.lessonImage} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{lesson.title}</Text>

          {/* <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>ระยะเวลา:</Text>
              <Text style={styles.metaValue}>{lesson.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>ระดับ:</Text>
              <Text
                style={[
                  styles.metaValue,
                  lesson.level === "เริ่มต้น"
                    ? styles.beginnerLevel
                    : lesson.level === "ปานกลาง"
                    ? styles.intermediateLevel
                    : styles.advancedLevel,
                ]}
              >
                {lesson.level}
              </Text>
            </View>
          </View> */}

          <Text style={styles.description}>{lesson.description}</Text>

          <View style={styles.divider} />

          {/* เนื้อหาบทเรียน */}
          {currentContent.sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          {/* ปุ่มทำแบบทดสอบ */}
          <TouchableOpacity
            style={styles.testButton}
            onPress={() =>
              navigation.navigate("Quiz", {
                lessonId: lesson.id,
                lessonTitle: lesson.title,
              })
            }
          >
            <Text style={styles.testButtonText}>ทำแบบทดสอบ</Text>
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
    height:'1px'
  },
  lessonImage: {
    width: "100%",
    height: 130,
    resizeMode: "center",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    marginRight: 20,
  },
  metaLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  beginnerLevel: {
    color: "#28a745",
  },
  intermediateLevel: {
    color: "#fd7e14",
  },
  advancedLevel: {
    color: "#dc3545",
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#e1e1e1",
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  testButton: {
    backgroundColor: "#5e72e4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  testButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LessonDetailScreen;
