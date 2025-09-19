import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header'; // Import your reusable Header

const ViewNormalMarketScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Reusable Header */}
      <Header title="Marketplace" showSearch={false} />

      <ScrollView>
        {/* Artwork Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/pic1.jpg')}
            style={styles.artworkImage}
          />
        </View>

        {/* Title and Author */}
        <View style={styles.titleContainer}>
          <Text style={styles.artworkTitle}>"Normal" by Dhalia Ford</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>📝 Description:</Text>
          <Text style={styles.descriptionText}>
            "Normal" is an evocative artwork featuring textured brushwork and a thoughtful play of light and shadow. The piece captures a serene yet dynamic moment that reflects the artist’s unique perspective on everyday beauty and emotional depth.
          </Text>
        </View>

        {/* Details */}
        <View style={styles.detailsBox}>
          <Text style={styles.detailsTitle}>📋 Details:</Text>
          <Text style={styles.detailsText}>🎨 Medium: Oil on Canvas</Text>
          <Text style={styles.detailsText}>📐 Size: 20 x 24 inches (Unframed)</Text>
          <Text style={styles.detailsText}>📜 Status: Available for original purchase | Prints limited edition available</Text>
        </View>

        {/* Price and Buy Button */}
        <View style={styles.purchaseSection}>
          <View style={styles.priceWrapper}>
            <Text style={styles.priceText}>M2000</Text>
          </View>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F8FA' },
  imageContainer: { marginTop: 10, marginHorizontal: 15, borderRadius: 10, overflow: 'hidden' },
  artworkImage: { width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10 },
  titleContainer: { marginTop: 10, marginHorizontal: 15, paddingVertical: 10, backgroundColor: 'white', borderRadius: 10 },
  artworkTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  descriptionBox: { backgroundColor: 'white', marginHorizontal: 15, marginTop: 15, borderRadius: 10, padding: 15 },
  descriptionTitle: { fontWeight: 'bold', marginBottom: 8, fontSize: 16 },
  descriptionText: { fontSize: 14, color: '#555', lineHeight: 20 },
  detailsBox: { backgroundColor: 'white', marginHorizontal: 15, marginTop: 15, borderRadius: 10, padding: 15 },
  detailsTitle: { fontWeight: 'bold', marginBottom: 8, fontSize: 16 },
  detailsText: { fontSize: 14, color: '#555', marginBottom: 4 },
  purchaseSection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginHorizontal: 15, marginTop: 20, marginBottom: 30 },
  priceWrapper: { marginRight: 8 },
  priceText: { fontSize: 18, fontWeight: 'bold', color: 'red' },
  buyButton: { backgroundColor: '#333', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8 },
  buyButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default ViewNormalMarketScreen;
