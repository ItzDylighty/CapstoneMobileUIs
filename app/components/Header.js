// app/components/Header.js
import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

const Header = ({ title, showSearch }) => {
  const navigation = useNavigation();
  const router = useRouter();
  const [notifVisible, setNotifVisible] = useState(false); // notification dropdown visibility

  return (
    <View style={styles.wrapper}>
      {/* Top header row */}
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/messages")}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          </TouchableOpacity>

          {/* Notification Icon */}
          <View style={{ position: "relative" }}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => setNotifVisible(!notifVisible)}
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>

            {/* Notification dropdown */}
            {notifVisible && (
              <View style={styles.notifDropdown}>
                <ScrollView>
                  <Text style={styles.notifItem}>
                    <Text style={styles.bold}>Transaction Alert</Text>{"\n"}
                    Your payment of M1000 for “The Mountains” was successful on 02/14/24.
                  </Text>
                  <Text style={styles.notifItem}>
                    <Text style={styles.bold}>Auction Reminder</Text>{"\n"}
                    14:24 PM - Place your bid for “Golden Silence” closing in 04:50:23.
                  </Text>
                  <Text style={styles.notifItem}>
                    <Text style={styles.bold}>Event Reminder</Text>{"\n"}
                    16:36 PM - Don’t miss “Art Celebration” on 04/08/24 at Lucena, City.
                  </Text>
                </ScrollView>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.profileButton} onPress={() => router.push("/profile")}>
            <Image
              source={require('../../assets/RonProfile.jpeg')}
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider line */}
      <View style={styles.divider} />

      {/* Search bar */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="gray" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { backgroundColor: "#fff" },
  header: {
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftHeader: { flexDirection: "row", alignItems: "center" },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 15 },
  iconContainer: { flexDirection: "row", alignItems: "center" },
  iconButton: { marginLeft: 15 },
  profileButton: { marginLeft: 15 },
  profilePic: { width: 30, height: 30, borderRadius: 15 },
  divider: { height: 1, backgroundColor: "#e0e0e0" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 15,
    marginVertical: 8,
  },
  searchInput: { flex: 1, height: 35 },
  notifDropdown: {
    position: "absolute",
    top: 35,
    right: 0,
    width: 250,
    maxHeight: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  notifItem: {
    marginBottom: 10,
    fontSize: 14,
    color: "#333",
  },
  bold: { fontWeight: "bold" },
});

export default Header;
