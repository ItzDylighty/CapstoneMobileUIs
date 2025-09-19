import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import Header from "../components/Header";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Reusable Header */}
      <Header title="Profile" showSearch={false} />

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/RonProfile.jpeg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Ron Iverson</Text>
        <Text style={styles.detail}>Gender: Male</Text>
        <Text style={styles.detail}>
          Address: Brgy. Bagong Bayan Rizaliana Mauban Quezon
        </Text>
        <Text style={styles.detail}>
          Bio: "Love never fails." - 1 Corinthians 13:8
        </Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutBox}>
        <Text style={styles.aboutText}>
          This sculptor creates thought-provoking works that explore the complex
          relationship between humanity and technology. Their pieces often
          incorporate industrial materials and organic forms.
        </Text>
      </View>

      {/* Artworks Galleries */}
      <Text style={styles.sectionTitle}>Artwork Galleries</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryRow}>
        <Image source={require('../../assets/pic1.jpg')} style={styles.galleryItem} />
        <Image source={require('../../assets/pic1.jpg')} style={styles.galleryItem} />
        <Image source={require('../../assets/pic1.jpg')} style={styles.galleryItem} />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 10,
    padding: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginVertical: 2,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  aboutBox: {
    backgroundColor: "#f2f2f2",
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  aboutText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 10,
  },
  galleryRow: {
    flexDirection: "row",
    margin: 10,
  },
  galleryItem: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
});
