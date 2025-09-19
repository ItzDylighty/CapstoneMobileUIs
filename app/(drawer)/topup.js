import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/Header'; // Adjust the path if needed

const TopupScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Reusable Header */}
      <Header title="Top Up" />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
        {/* Total Amount To Pay */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Total Amount To Pay</Text>
          <View style={styles.amountRow}>
            <Text style={styles.currency}>M</Text>
            <Text style={styles.amount}>899.00</Text>
            <Feather name="edit-3" size={20} color="gray" style={{ marginLeft: 5 }} />
          </View>

          {/* AutoPay */}
          <View style={styles.autoPayRow}>
            <View style={styles.autoPayLeft}>
              <View style={styles.redDot} />
              <Text style={styles.autoPayText}>AutoPay is OFF!</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.setupText}>Set Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.dueText}>
            Please pay Transaction will end in <Text style={styles.bold}>00:00:00</Text>
          </Text>
        </View>

        {/* Cashback Promo */}
        <View style={styles.promoCard}>
          <Text style={styles.promoText}>
            TOP UP AND GET POINTS{"\n"}
            <Text style={styles.promoHighlight}>Cashback in MPoints!</Text>
          </Text>
          <View style={styles.gigaRow}>
            <Text style={styles.gigaSmall}>50 MPoints = 5 PESO</Text>
            <View style={styles.giftBox}>
              <Feather name="gift" size={24} color="white" />
              <Text style={styles.cashback}>+5%</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Top Up</Text>
          <TouchableOpacity style={styles.paymentBox}>
            <Text style={styles.paymentText}>Select Payment Method</Text>
            <Text style={styles.setupText}>Set Up</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.payButton} disabled>
          <Text style={styles.payButtonText}>Top Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/transaction')}>
          <Text style={styles.cancelText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  /* Transaction Body Styles */
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 15,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  currency: {
    fontSize: 20,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 5,
    
  },
  autoPayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  autoPayLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    marginRight: 6,
  },
  autoPayText: {
    fontSize: 14,
  },
  setupText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  dueText: {
    fontSize: 13,
    color: "gray",
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },

  /* Promo Card */
  promoCard: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  promoText: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
    color: "black",
  },
  promoHighlight: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  gigaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gigaSmall: {
    fontSize: 12,
    color: "gray",
  },
  giftBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  cashback: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },

  /* Payment */
  paymentBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    padding: 12,
    borderRadius: 8,
  },
  paymentText: {
    fontSize: 14,
    color: "black",
  },

  /* Bottom Section */
  bottomSection: {
    position: "absolute",
    bottom: 75, // moved up from 20 to 40
    left: 0,
    right: 0,
  },
  payButton: {
    backgroundColor: "gray",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 15,
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  cancelText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TopupScreen;
