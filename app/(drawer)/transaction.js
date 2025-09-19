import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header'; // adjust the path if needed

const TransactionScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Reusable Header */}
      <Header title="Transaction" />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Current Mcoins Card */}
        <View style={styles.mcoinsCard}>
          <Text style={styles.mcoinsLabel}>Current Mcoins</Text>
          <Text style={styles.mcoinsValue}>M 1500</Text>
          <TouchableOpacity
            style={styles.topupButton}
            onPress={() => router.push("/topup")}
          >
            <Text style={styles.topupButtonText}>Top Up</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction Cards */}
        <TouchableOpacity 
          style={styles.transactionCard}
          onPress={() => router.push('/viewTransaction')} // updated route
        >
          <Image
            source={require('../../assets/mustry.png')}
            style={styles.transactionImage}
          />
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>The Mountain</Text>
            <Text style={styles.viewDetails}>View Details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.transactionCard}>
          <Image
            source={require('../../assets/pic1.jpg')}
            style={styles.transactionImage}
          />
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>The Mountain</Text>
            <Text style={styles.viewDetails}>View Details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.transactionCard}>
          <Image
            source={require('../../assets/pic1.jpg')}
            style={styles.transactionImage}
          />
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>The Mountain</Text>
            <Text style={styles.viewDetails}>View Details</Text>
          </View>
        </TouchableOpacity>

        {/* No More Transactions */}
        <Text style={styles.noMoreText}>No More Transaction</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  /* Mcoins Card */
  mcoinsCard: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  mcoinsLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#555",
    marginBottom: 5,
  },
  mcoinsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },

  /* Top Up Button */
  topupButton: {
    marginTop: 15,
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  topupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* Transaction Card */
  transactionCard: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  transactionImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  transactionInfo: {
    padding: 10,
    alignItems: "center",
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  viewDetails: {
    fontSize: 14,
    color: "gray",
  },

  /* No More Transactions */
  noMoreText: {
    textAlign: "center",
    marginTop: 15,
    color: "gray",
  },
});

export default TransactionScreen;
