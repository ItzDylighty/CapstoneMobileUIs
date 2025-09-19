import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Header from '../components/Header'; // Import the reusable Header

const ViewEventsScreen = () => {
  const [zoomImage, setZoomImage] = useState(null); // State for full-screen image

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Events" showSearch={false} />

      <ScrollView style={styles.scrollView}>
        {/* Event Banner */}
        <TouchableOpacity
          style={{ ...styles.bannerContainer, marginTop: 5 }}
          onPress={() => setZoomImage(require('../../assets/pic1.jpg'))}
        >
          <Image
            source={require('../../assets/pic1.jpg')} // Placeholder for the banner image
            style={styles.bannerImage}
          />
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Art Celebration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.secondaryButtonText}>Add to Calendar</Text>
          </TouchableOpacity>
        </View>

        {/* Description Section */}
        <View style={styles.textSection}>
          <Text style={styles.description}>
            Join us for a vibrant and inspiring Celebration of the Arts, a one-day event that brings together the best of visual arts, music, dance, theater, and creative expression under one roof. This colorful gathering will showcase local talent from Albuquerque and across New Mexico in a lively atmosphere filled with music, live performances, art exhibits, interactive workshops, and food vendors.
          </Text>
          <Text style={styles.description}>
            From painters and poets to jazz musicians and sculptors, the event aims to highlight the cultural richness and diversity of the arts community. Whether you're an artist, a fan of the arts, or simply looking for a creative weekend escape, this event has something for everyone.
          </Text>
        </View>

        {/* Activities Section */}
        <View style={styles.activitiesSection}>
          <Text style={styles.activitiesTitle}>
            <Text>🎨</Text> Activities Include:
          </Text>
          <Text style={styles.activityItem}>• Live art painting demos</Text>
          <Text style={styles.activityItem}>• Music and spoken word performances</Text>
          <Text style={styles.activityItem}>• Local artisan booths and exhibits</Text>
          <Text style={styles.activityItem}>• Hands-on art workshops for kids and adults</Text>
        </View>
      </ScrollView>

      {/* Full-screen image modal */}
      <Modal
        visible={zoomImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setZoomImage(null)}
      >
        <TouchableOpacity style={styles.fullScreenContainer} onPress={() => setZoomImage(null)}>
          <Image source={zoomImage} style={styles.fullScreenImage} resizeMode="contain" />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 15,
  },
  activitiesSection: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 50,
  },
  activitiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  // Full-screen image modal
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});

export default ViewEventsScreen;
