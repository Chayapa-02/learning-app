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
        },{
          title: "หลักการเติม s, es",
          content:
            "กริยาปกติ เติม s เช่น walk → walks\nกริยาลงท้าย ch, sh, ss, x, o เติม es เช่น go → goes / watch → watches\nกริยาลงท้าย y (หลังพยัญชนะ) เปลี่ยน y → i + es เช่น study → studies\nกริยาลงท้าย y (หลังสระ) เติม s ได้เลย เช่น play → plays",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I eat breakfast every morning.\n  (ฉันกินอาหารเช้าทุกเช้า)\n• She works at a bank.\n  (เธอทำงานที่ธนาคาร)\n• She doesn't work at a bank.\n  (เธอไม่ได้ทำงานที่ธนาคาร)\n• Does she work at the bank?\n  (เธอทำงานที่ธนาคารใช่ไหม)",
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
        },{
          title: "หลักการเติม ing",
          content:
            "กริยาปกติ เติม ing เช่น read → reading\nกริยาลงท้ายด้วย e ตัด e แล้วเติม ing เช่น write → writing\nกริยาพยางค์เดียว ลงท้ายด้วย สระ+พยัญชนะ เติมพยัญชนะซ้ำ+ing เช่น run → running\nกริยาลงท้าย ie เปลี่ยน ie→y+ing เช่น die → dying",
        },
        {
          title: "📝 ตัวอย่าง",
          content:
            "• I am studying English right now.\n  (ฉันกำลังเรียนภาษาอังกฤษตอนนี้)\n• Simon is arriving here at 7.30 tomorrow.\n  (ไซมอนจะมาถึงที่นี่7.30 พรุ่งนี้)\n• Students aren't playing games on their phones.\n  (นักเรียนไม่ได้กำลังเล่นเกมบนมือถือ)\n• Are they playing games?\n  (พวกเขากำลังเล่นเกมใช่ไหม)",
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
            "• I have finished my homework.\n  (ฉันทำการบ้านเสร็จแล้ว)\n• She has visited Japan twice.\n  (เธอเคยไปญี่ปุ่นสองครั้งแล้ว)\n• Jan hasn't eaten lunch yet.\n  (แจนยังไม่ได้ทานอาหารกลางวัน)\n• Has Jan eaten lunch yet?\n  (แจนทานอาหารกลางวันหรือยัง)",
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
            "• I have been studying for three hours.\n  (ฉันเรียนมาเป็นเวลา 3 ชั่วโมงแล้ว)\n• They have been waiting for the bus since 8 a.m.\n  (พวกเขารอรถเมล์ตั้งแต่แปดโมงเช้า)\n• Lilly hasn't been watching TV recently.\n (ลิลลี่ไม่ได้ดูทีวีช่วงนี้)\n• Has she been working out every morning?\n (เธอได้ออกกำลังกายทุกเช้าใช่ไหม?)",
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
            "• I saw a movie last night.\n  (ฉันดูหนังเมื่อคืนนี้)\n• He visited his grandma yesterday.\n  (เขาไปเยี่ยมคุณยายเมื่อวานนี้)\n• He didn't watch a movie last night.\n  (เขาไม่ได้ดูหนังเมื่อคืนนี้)\n• Did you go to the beach last weekend?\n  (คุณไปชายทะเลสุดสัปดาห์ที่แล้วใช่ไหม?)",
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
            "• I was reading when you called.\n  (ฉันกำลังอ่านหนังสือตอนที่คุณโทรมา)\n• They were playing football at 5 p.m.\n  (พวกเขากำลังเล่นฟุตบอลตอนห้าโมงเย็น)\n• He wasn't sleeping when you came.\n  (เขาไม่ได้กำลังนอนหลับตอนที่คุณมา)\n• Were you cooking while I was calling you?\n  (คุณกำลังทำอาหารอยู่ตอนที่ฉันกำลังโทรหาคุณใช่ไหม?)",
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
            "• I had finished dinner before they arrived.\n  (ฉันทานอาหารเย็นเสร็จก่อนที่พวกเขาจะมาถึง)\n• She had left when I got there.\n  (เธอไปแล้วตอนที่ฉันไปถึง)\n• She hadn't seen that before.\n  (เธอไม่เคยเห็นสิ่งนั้นมาก่อน)\n• Had they left when you arrived?\n  (พวกเขาออกไปแล้วตอนที่คุณไปถึงใช่ไหม?)",
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
            "• I had been working all day before I took a break.\n  (ฉันทำงานทั้งวันก่อนที่จะพัก)\n• They had been traveling for hours when the car broke down.\n  (พวกเขาเดินทางมาหลายชั่วโมงตอนที่รถเสีย)\n• He hadn't been feeling well.\n  (เขาไม่ค่อยสบาย)\n• Had you been studying before the test?\n  (คุณได้อ่านหนังสือก่อนสอบหรือเปล่า?)",
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
            "• I will call you tomorrow.\n  (ฉันจะโทรหาคุณพรุ่งนี้)\n• She will visit us next week.\n  (เธอจะมาเยี่ยมเราสัปดาห์หน้า)\n• I won't be late.\n  (ฉันจะไม่สาย)\n• Will they join us tomorrow?\n  (คุณจะมาร่วมกับพวกเราพรุ่งนี้ไหม?)",
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
            "• I will be working at 10 a.m. tomorrow.\n  (ฉันจะกำลังทำงานตอนสิบโมงเช้าพรุ่งนี้)\n• They will be flying to Paris next month.\n  (พวกเขาจะกำลังบินไปปารีสเดือนหน้า)\n• We won't be working this weekend.\n  (พวกเราจะไม่ทำงานในสุดสัปดาห์นี้)\n• Will you be using the car tonight?\n  (คุณจะใช้รถคืนนี้ไหม?)",
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
            "• I will have finished the project by Friday.\n  (ฉันจะทำโปรเจกต์เสร็จภายในวันศุกร์นี้)\n• She will have left by the time you arrive.\n  (เธอจะออกไปแล้วตอนที่คุณมาถึง)\n• I won't have completed the report by Friday.\n  (ฉันจะยังทำรายงานไม่เสร็จภายในวันศุกร์)\n• Will she have finished the project by then?\n  (ตอนนั้นเธอจะทำโครงการเสร็จแล้วหรือยัง?)",
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
            "• I will have been working here for 5 years next month.\n  (ฉันจะทำงานที่นี่ครบ 5 ปีในเดือนหน้า)\n• They will have been studying English for 2 years by December.\n  (พวกเขาจะเรียนภาษาอังกฤษมาเป็นเวลา 2 ปีภายในเดือนธันวาคม)\n• They won't have been living there for long.\n  (พวกเขาจะยังไม่ได้อาศัยอยู่ที่นั่นนานนัก)\n• Will you have been working here for 10 years next month?\n  (เดือนหน้าคุณจะทำงานที่นี่ครบ 10 ปีแล้วหรือยัง?)",
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
