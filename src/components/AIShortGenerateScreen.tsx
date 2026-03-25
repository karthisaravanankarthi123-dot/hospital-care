import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ShortsGenerateScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  


  const [script, setScript] = useState('Introducing our new analytics dashboard built for speed, designed for clarity. Real-time insights, zero setup needed.');
  const [selectedStyle, setSelectedStyle] = useState('Professional');
  const [selectedDuration, setSelectedDuration] = useState('30');

  const stylesList = ['Professional', 'Casual', 'Energetic', 'Calm', 'Educational'];
  const durations = [
    { val: '15', label: 'SECONDS' },
    { val: '30', label: 'SECONDS' },
    { val: '60', label: 'SECONDS' }
  ];

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
           <Icon name="arrow-back" size={20} color="#334155" />
        </TouchableOpacity>
        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle}>AI Generate</Text>
          <Text style={styles.headerSubtitle}>Write a script - we'll build the Short</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Your Script Section */}
        <Text style={styles.sectionLabel}>Your Script</Text>
        <View style={styles.scriptContainer}>
          <TextInput
            style={styles.scriptInput}
            multiline
            value={script}
            onChangeText={setScript}
            placeholder="Write your script here..."
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>20 / 200 words</Text>
        </View>

        {/* Video Style Section */}
        <Text style={styles.sectionLabel}>Video Style</Text>
        <View style={styles.chipsRow}>
          {stylesList.map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[
                styles.chip, 
                selectedStyle === item && styles.chipSelected
              ]}
              onPress={() => setSelectedStyle(item)}
            >
              <Text style={[
                styles.chipText, 
                selectedStyle === item && styles.chipTextSelected
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Duration Section */}
        <Text style={styles.sectionLabel}>Duration</Text>
        <View style={styles.durationRow}>
          {durations.map((item) => (
            <TouchableOpacity 
              key={item.val} 
              style={[
                styles.durationBox, 
                selectedDuration === item.val && styles.durationBoxSelected
              ]}
              onPress={() => setSelectedDuration(item.val)}
            >
              <Text style={[
                styles.durationVal,
                selectedDuration === item.val && styles.durationTextSelected
              ]}>
                {item.val}
              </Text>
              <Text style={[
                styles.durationLabel,
                selectedDuration === item.val && styles.durationTextSelected
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Voice Section */}
        <Text style={styles.sectionLabel}>Voice</Text>
        <View style={styles.voiceContainer}>
           <Text style={styles.voiceTitle}>Upload or Select AI Voice</Text>
           <Text style={styles.voiceSubtitle}>Upload a sample - MP3 / WAV / M4A</Text>
           
           <View style={styles.voiceButtonsRow}>
              <TouchableOpacity style={styles.voiceSubBtn}>
                 <Text style={styles.voiceSubBtnText}>Upload Voice</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>OR</Text>
              <TouchableOpacity style={styles.voiceStyleBtn}>
                 <Text style={styles.voiceStyleBtnText}>Choose an AI voice</Text>
              </TouchableOpacity>
           </View>

           <View style={styles.securityRow}>
              <Text style={styles.lockIcon}>🔒</Text>
              <Text style={styles.securityText}>Voice sample deleted after 24h. Never stored or shared.</Text>
           </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Generate Button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
         <TouchableOpacity style={styles.generateBtn} onPress={() => navigation.navigate('AIPreviewScreen')}>
            <Text style={styles.generateBtnText}>Generate</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ebf2ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  backArrow: {
    display: 'none',
  },
  headerTitleCol: {
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0a1931',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#8e99af',
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a1931',
    marginTop: 20,
    marginBottom: 15,
  },
  scriptContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    height: 140,
    borderWidth: 1,
    borderColor: '#dceaff',
  },
  scriptInput: {
    flex: 1,
    fontSize: 14,
    color: '#0a1931',
    lineHeight: 20,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 11,
    color: '#adb5bd',
    marginTop: 5,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f1f4f8',
  },
  chipSelected: {
    borderColor: '#007aff',
    backgroundColor: '#ebf4ff',
  },
  chipText: {
    fontSize: 12,
    color: '#8e99af',
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#007aff',
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationBox: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  durationBoxSelected: {
    borderColor: '#007aff',
  },
  durationVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a1931',
  },
  durationLabel: {
    fontSize: 8,
    color: '#8e99af',
    marginTop: 2,
    fontWeight: 'bold',
  },
  durationTextSelected: {
    color: '#007aff',
  },
  voiceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dceaff',
  },
  voiceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a1931',
  },
  voiceSubtitle: {
    fontSize: 11,
    color: '#8e99af',
    marginTop: 4,
    marginBottom: 20,
  },
  voiceButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voiceSubBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceSubBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0a1931',
  },
  orText: {
    paddingHorizontal: 10,
    fontSize: 10,
    color: '#adb5bd',
    fontWeight: 'bold',
  },
  voiceStyleBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#ebf4ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007aff',
  },
  voiceStyleBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007aff',
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  lockIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  securityText: {
    fontSize: 10,
    color: '#adb5bd',
  },
  footer: {
    padding: 20,
  },
  generateBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#007aff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007aff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  generateBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShortsGenerateScreen;
