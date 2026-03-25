import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions, Animated, Platform, StatusBar, BackHandler } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'More Customers in One Place',
    description: 'List your business once and get discovered by customers all around you.',
    image: require('../../assets/onboarding/onboarding1.png'),
  },
  {
    id: '2',
    title: 'Set Up Your Business Profile',
    description: 'Add your services and availability in minutes to start attracting customers right away.',
    image: require('../../assets/onboarding/onboarding2.png'),
  },
  {
    id: '3',
    title: 'Grow Your Network',
    description: 'Build connections, let nearby customers find you easily, and take your business to the next level.',
    image: require('../../assets/onboarding/onboarding3.png'),
  },
];

const OnboardingScreen = ({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) => {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    // Auto-slide functionality (4 seconds)
    const slideInterval = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= SLIDES.length) {
        nextIndex = 0; // Loop back to start
      }

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [activeIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
      },
    }
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F7FF" />
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.logoRow}>
          <Image source={require('../../assets/beaver_logo.png')} style={styles.logoIcon} />
          <Text style={styles.logoText}>Beaver{"\n"}HealthAI</Text>
        </View>
      </View>

      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  { width: dotWidth, opacity, backgroundColor: '#007AFF' }
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity style={styles.button} onPress={onFinish} activeOpacity={0.8}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Get Started</Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7FF',
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F7FF',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
  },
  logoIcon: {
    width: 42,
    height: 42,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1C1E',
    lineHeight: 22,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: 'center',
    width: '100%',
    padding: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 0.3,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1C1E',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: '#6C727A',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  footer: {
    padding: 24,
    paddingBottom: 50,
  },
  pagination: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
