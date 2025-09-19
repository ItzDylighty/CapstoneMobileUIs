// app/(drawer)/artists.js
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import Header from '../components/Header'; // Import the reusable Header

// Reusable component for each artist card
const ArtistCard = ({ name, imageSource }) => (
  <View style={styles.artistCard}>
    <Image source={imageSource} style={styles.artistImage} />
    <Text style={styles.artistName}>{name}</Text>
  </View>
);

const ArtistsScreen = () => {
  // Sample data for the artist list
  const artists = [
    { id: 1, name: 'James McGill', image: require('../../assets/nat.jpeg') },
    { id: 2, name: 'Mike Ehrmantraut', image: require('../../assets/nat.jpeg') },
    { id: 3, name: 'Gustavo Fring', image: require('../../assets/nat.jpeg') },
    { id: 4, name: 'Frank Stella', image: require('../../assets/nat.jpeg') },
    { id: 5, name: 'Erza Blake', image: require('../../assets/nat.jpeg') },
    { id: 6, name: 'Natsuki Deguchi', image: require('../../assets/nat.jpeg') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Reusable Header with search */}
      <Header title="Artist" showSearch={true} />

      {/* Artist Grid */}
      <ScrollView style={styles.artistGrid}>
        <View style={styles.row}>
          {artists.map(artist => (
            <ArtistCard key={artist.id} name={artist.name} imageSource={artist.image} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  artistGrid: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  artistCard: {
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
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  artistName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ArtistsScreen;
