// app/(drawer)/events.js
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header'; // Reusable Header

// Reusable component for each event card
const EventCard = ({ title, imageSource, onPress }) => (
  <TouchableOpacity style={styles.eventCard} onPress={onPress}>
    <Image source={imageSource} style={styles.eventImage} />
    <Text style={styles.eventTitle}>{title}</Text>
  </TouchableOpacity>
);

const EventsScreen = () => {
  const router = useRouter();

  const events = [
    { id: 1, title: 'Art Celebration', image: require('../../assets/pic1.jpg') },
    { id: 2, title: 'Crafted Emotion', image: require('../../assets/nat.jpeg') },
    { id: 3, title: 'Timeless Creation', image: require('../../assets/nat.jpeg') },
    { id: 4, title: 'Itik', image: require('../../assets/nat.jpeg') },
  ];

  const handlePressEvent = (eventId) => {
    // Navigate to the detailed view screen for each event
    // For now, only Art Celebration navigates to viewEvents
    if (eventId === 1) {
      router.push('viewEvents'); // Updated navigation path
    }
    // Add more routes for other events if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Events" showSearch={true} />

      <ScrollView style={styles.eventGrid}>
        <View style={styles.row}>
          {events.map(event => (
            <EventCard 
              key={event.id} 
              title={event.title} 
              imageSource={event.image} 
              onPress={() => handlePressEvent(event.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  eventGrid: { padding: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  eventCard: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  eventImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  eventTitle: { fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
});

export default EventsScreen;
