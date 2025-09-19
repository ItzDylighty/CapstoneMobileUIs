import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import Header from '../components/Header'; // Reusable Header

const HomeScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null); // state for full-screen image

  const posts = [
    {
      id: 1,
      username: 'm/Night Raid/Kcivor',
      description: 'Vibrant painting of stylized figures in a colorful scene with fruits.',
      image: require('../../assets/pic1.jpg'),
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      likes: 334
    },
    {
      id: 2,
      username: 'm/Night Raid/Rona',
      description: 'Traditional clothing are depicted working in a stylized field under a sunny sky.',
      image: require('../../assets/pic1.jpg'),
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      likes: 100
    },
    {
      id: 3,
      username: 'm/Mahikana/Melon',
      description: 'Cubist painting of singing figures with a guitar.',
      image: require('../../assets/pic1.jpg'),
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      likes: 143
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="HOME" showSearch={true} />

      {/* Post Input (What's on your mind) */}
      <View style={styles.postBox}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/99.jpg' }} // placeholder avatar
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.inputButton}>
          <Text style={styles.inputText}>What's on your mind?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="image-outline" size={24} color="#4caf50" />
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <ScrollView style={styles.feed}>
        {posts.map(post => (
          <View key={post.id} style={styles.card}>
            {/* User info */}
            <View style={styles.userInfo}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <Text style={styles.username}>{post.username}</Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>{post.description}</Text>

            {/* Post image */}
            <TouchableOpacity onPress={() => setSelectedImage(post.image)}>
              <Image source={post.image} style={styles.postImage} resizeMode="cover" />
            </TouchableOpacity>

            {/* Actions */}
            <View style={styles.actions}>
              <View style={styles.likeContainer}>
                <Ionicons name="heart-outline" size={20} color="red" />
                <Text style={styles.likeText}>{post.likes}</Text>
              </View>
              <Feather name="message-circle" size={20} color="#555" />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Full-screen image modal */}
      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableOpacity style={styles.fullScreenContainer} onPress={() => setSelectedImage(null)}>
          <Image source={selectedImage} style={styles.fullScreenImage} resizeMode="contain" />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  postBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff'
  },
  avatar: { width: 33, height: 33, borderRadius: 15, marginRight: 8 },
  inputButton: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10
  },
  inputText: { color: '#555' },
  feed: { paddingHorizontal: 10 },
  card: { 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 10, 
    marginBottom: 12, 
    shadowColor: 'black', 
    shadowOpacity: 0.09, 
    shadowRadius: 4, 
    elevation: 2 
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  username: { fontWeight: 'bold' },
  description: { marginBottom: 8 },
  postImage: { width: '100%', height: 180, borderRadius: 8 },
  actions: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  likeContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  likeText: { marginLeft: 4, color: 'red' },
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

export default HomeScreen;
