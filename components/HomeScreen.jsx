import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // ซ่อน Splash Screen เมื่อหน้า Home โหลดเสร็จ
  useEffect(() => {
    async function hideSplash() {
      // หากมีการโหลดข้อมูลเพิ่มเติม ทำที่นี่
      await SplashScreen.hideAsync();
    }
    hideSplash();
  }, []);

  const handleLessonPress = () => {
    navigation.navigate('LessonList');
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* ส่วนหัว */}
        <View style={styles.header}>
          <Image
            source={require('../src/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>12 Tenses Easy!</Text>
          <Text style={styles.subtitle}>เรียนรู้ได้ทุกที่ทุกเวลา</Text>
          <Text style={styles.subtitle}>by Kru Chayapa Witchawanitchanun</Text>
        </View>

        {/* ส่วนเนื้อหา */}
        <View style={styles.contentContainer}>
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.welcomeText}>
              This application makes understanding all 12 tenses easy - just choose the lesson that suit you best.
            </Text>

            <TouchableOpacity
              style={styles.lessonButton}
              onPress={handleLessonPress}
            >
              <Text style={styles.lessonButtonText}>เข้าสู่บทเรียน</Text>
            </TouchableOpacity>
          </View>

          {/* ส่วนแสดงฟีเจอร์ */}
          {/* <Text style={styles.sectionTitle}>ฟีเจอร์เด่น</Text> */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              {/* <Image
                source={require('../src/images/feature1.png')}
                style={styles.featureIcon}
              /> */}
              <Text style={styles.featureTitle}>Let's have fun with</Text>
              <Text style={styles.subFeatureTitle}>English</Text>
              {/* <Text style={styles.featureText}>
                ออกแบบมาให้เข้าใจง่ายสำหรับผู้เรียนทุกระดับ
              </Text> */}
            </View>

            {/* <View style={styles.featureCard}>
              <Image
                source={require('../src/images/feature2.png')}
                style={styles.featureIcon}
              />
              <Text style={styles.featureTitle}>แบบทดสอบโต้ตอบ</Text>
              <Text style={styles.featureText}>
                ทดสอบความเข้าใจด้วยแบบทดสอบแบบโต้ตอบ
              </Text>
            </View> */}

            {/* <View style={styles.featureCard}>
              <Image
                source={require('../src/images/feature3.png')}
                style={styles.featureIcon}
              />
              <Text style={styles.featureTitle}>ติดตามความก้าวหน้า</Text>
              <Text style={styles.featureText}>
                ดูความก้าวหน้าและผลการเรียนของคุณได้ตลอดเวลา
              </Text>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    height: '1px',
    backgroundColor:'#FFE4E1'
  },
  header: {
    backgroundColor: '#5e72e4',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e6e9fc',
  },
  contentContainer: {
    padding: 16,
  },
  welcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  lessonButton: {
    backgroundColor: '#5e72e4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  lessonButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    // marginVertical: 16,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 5,
    textAlign: 'center',
  },
  subFeatureTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default HomeScreen;
