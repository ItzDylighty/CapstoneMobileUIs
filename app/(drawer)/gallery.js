import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Header from '../components/Header'; // Reusable Header

const GalleryScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const renderCard = (item) => (
    <TouchableOpacity 
      style={styles.card} 
      key={item.id}
      onPress={() => {
        if (item.title === 'Blind') {
          router.push('/viewGallery'); // updated route
        } else {
          console.log(`Clicked on ${item.title}`);
        }
      }}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{`"${item.title}"`}</Text>
      <Text style={styles.cardAuthor}>{`by ${item.author}`}</Text>
    </TouchableOpacity>
  );

  const paintingData = [
    { id: 1, title: 'Blind', author: 'Kylan Gentry', image: require('../../assets/pic1.jpg') },
    { id: 2, title: 'Fire Flower', author: 'Aria Benett', image: require('../../assets/pic1.jpg') },
  ];

  const sculptureData = [
    { id: 1, title: 'Horse', author: 'Aria Benett', image: require('../../assets/pic1.jpg') },
    { id: 2, title: 'Buffalo', author: 'Rodriguze Post', image: require('../../assets/pic1.jpg') },
  ];
  
  const otherData = [
    { id: 1, title: 'Sample', author: 'Unknown', image: require('../../assets/pic1.jpg') },
    { id: 2, title: 'Sample', author: 'Unknown', image: require('../../assets/pic1.jpg') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Reusable Header */}
      <Header title="Gallery" showSearch={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section: Paintings */}
        <Text style={styles.sectionTitle}>Paintings</Text>
        <View style={styles.cardGrid}>
          {paintingData.map(renderCard)}
        </View>

        {/* Section: Sculptures */}
        <Text style={styles.sectionTitle}>Sculptures</Text>
        <View style={styles.cardGrid}>
          {sculptureData.map(renderCard)}
        </View>

        {/* Section: Others */}
        <Text style={styles.sectionTitle}>Others</Text>
        <View style={styles.cardGrid}>
          {otherData.map(renderCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardAuthor: {
    fontSize: 12,
    color: '#666',
  },
});

export default GalleryScreen;
