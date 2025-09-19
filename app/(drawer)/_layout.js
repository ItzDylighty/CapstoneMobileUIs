import { Drawer } from 'expo-router/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Custom drawer content
const CustomDrawerContent = () => {
  const router = useRouter();

  const menuItems = [
    { label: "Home", icon: <MaterialCommunityIcons name="view-grid-outline" size={30} color="#000" />, route: '/home' },
    { label: "Artists", icon: <MaterialCommunityIcons name="palette-outline" size={30} color="#000" />, route: '/artists' },
    { label: "Gallery", icon: <Ionicons name="image-outline" size={30} color="#000" />, route: '/gallery' },
    { label: "Marketplace", icon: <Ionicons name="cart-outline" size={30} color="#000" />, route: '/marketplace' },
    { label: "Transaction", icon: <MaterialCommunityIcons name="file-document-outline" size={30} color="#000" />, route: '/transaction' },
    { label: "Events", icon: <Ionicons name="calendar-outline" size={30} color="#000" />, route: '/events' },
  ];

  return (
    <SafeAreaView style={styles.drawerContainer}>
      {/* Header */}
      <View style={styles.drawerHeader}>
        <Image source={require('../../assets/RonProfile.jpeg')} style={styles.profilePic} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Ron Iverson Roguel</Text>
          <Text style={styles.profileEmail}>roniversonroguel@gmail.com</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItemsContainer}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} icon={item.icon} label={item.label} onPress={() => router.push(item.route)} />
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/')}>
        <Ionicons name="log-out-outline" size={30} color="#000" />
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Menu item component
const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    {icon}
    <Text style={styles.menuItemText}>{label}</Text>
  </TouchableOpacity>
);

// Drawer layout
export default function Layout() {
  return (
    <Drawer
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="home" options={{ drawerLabel: "Home", title: "Home" }} />
      <Drawer.Screen name="artists" options={{ drawerLabel: "Artists", title: "Artists" }} />
      <Drawer.Screen name="events" options={{ drawerLabel: "Events", title: "Events" }} />

      {/* Hidden screen for viewMessage navigation */}
      <Drawer.Screen
        name="viewMessage"
        options={{ drawerLabel: () => null, title: "View Message", swipeEnabled: false }}
      />
    </Drawer>
  );
}

// Styles
const styles = StyleSheet.create({
  drawerContainer: { flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' },
  drawerHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#E6E6E6' },
  profilePic: { width: 80, height: 80, borderRadius: 40 },
  profileInfo: { marginLeft: 15 },
  profileName: { fontSize: 16, fontWeight: '500', color: '#000' },
  profileEmail: { fontSize: 13, color: '#555', marginTop: 4 },
  menuItemsContainer: { flex: 1, marginTop: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20 },
  menuItemText: { marginLeft: 15, fontSize: 20, color: '#000' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 20, marginBottom: 80 },
  logoutButtonText: { marginLeft: 15, fontSize: 20, color: '#000' },
});
