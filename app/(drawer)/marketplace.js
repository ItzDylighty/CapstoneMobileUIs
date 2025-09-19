import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import Header from '../components/Header'; // Import reusable Header

const MarketplaceScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Reusable Header */}
      <Header title="Marketplace" showSearch={true} />

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section: Join Auctions */}
        <Text style={styles.sectionTitle}>Join Auctions</Text>
        <View style={styles.cardGrid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/auction')}
          >
            <Image source={require('../../assets/pic1.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>"Golden Silence"</Text>
            <Text style={styles.cardAuthor}>by Elara Mendez</Text>
            <Text style={styles.cardPrice}>M9000</Text>
          </TouchableOpacity>
          <View style={styles.card}>
            <Image source={require('../../assets/pic1.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>"Sakura Haze"</Text>
            <Text style={styles.cardAuthor}>by Owenn Bellamy</Text>
            <Text style={styles.cardPrice}>M1000</Text>
          </View>
          <View style={styles.card}>
            <Image source={require('../../assets/pic1.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>"The Ewam"</Text>
            <Text style={styles.cardAuthor}>by Wasap Nah</Text>
            <Text style={styles.cardPrice}>M23000</Text>
          </View>
        </View>

        {/* Section: Paintings */}
        <Text style={styles.sectionTitle}>Paintings</Text>
        <View style={styles.cardGrid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/viewNormalMarket')} // Updated route
          >
            <Image source={require('../../assets/pic1.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>"Normal"</Text>
            <Text style={styles.cardAuthor}>by Dhalia Ford</Text>
            <Text style={styles.cardPrice}>M2000</Text>
          </TouchableOpacity>
          <View style={styles.card}>
            <Image source={require('../../assets/pic1.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>"Rocky"</Text>
            <Text style={styles.cardAuthor}>by Callum Frost</Text>
            <Text style={styles.cardPrice}>M3000</Text>
          </View>
          <View style={styles.card}>
            <Image source={require('../../assets/pic1.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>"Bronze Form"</Text>
            <Text style={styles.cardAuthor}>by Unknown</Text>
            <Text style={styles.cardPrice}>M2500</Text>
          </View>
          <View style={styles.card}>
            <Image source={require('../../assets/pic1.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>"Stone Grace"</Text>
            <Text style={styles.cardAuthor}>by Unknown</Text>
            <Text style={styles.cardPrice}>M4000</Text>
          </View>
          <View style={styles.card}>
            <Image source={require('../../assets/pic1.jpg')} style={styles.cardImage} />
            <Text style={styles.cardTitle}>"El Unknown"</Text>
            <Text style={styles.cardAuthor}>by Unknown</Text>
            <Text style={styles.cardPrice}>M1000</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F8FA' },
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
  cardImage: { width: '100%', height: 100, borderRadius: 8, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: 'bold' },
  cardAuthor: { fontSize: 12, color: '#666' },
  cardPrice: { fontSize: 14, fontWeight: 'bold', color: 'red', marginTop: 4 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default MarketplaceScreen;
