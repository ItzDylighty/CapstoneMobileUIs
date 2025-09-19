import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Modal, TextInput, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';


const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');
  const [pickedImages, setPickedImages] = useState([]);

  const posts = [
    {
      id: 1,
      username: 'm/Night Raid/Kcivor',
      description: 'Vibrant painting of stylized figures in a colorful scene with fruits.',
      image: require('../../assets/pic1.jpg'),
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      likes: 334,
    },
    {
      id: 2,
      username: 'm/Night Raid/Rona',
      description: 'Traditional clothing are depicted working in a stylized field under a sunny sky.',
      image: require('../../assets/pic1.jpg'),
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      likes: 100,
    },
    {
      id: 3,
      username: 'm/Mahikana/Melon',
      description: 'Cubist painting of singing figures with a guitar.',
      image: require('../../assets/pic1.jpg'),
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      likes: 143,
    },
  ];

  // Pick images from library (multiple selection)
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setPickedImages((prev) => [...prev, ...uris]);
    }
  };

  // Remove an image
  const removeImage = (index) => {
    setPickedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="HOME" showSearch={true} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Post Input */}
        <TouchableOpacity style={styles.postOverlayBox} onPress={() => setModalVisible(true)}>
          <Ionicons name="create-outline" size={24} color="#555" style={{ marginRight: 8 }} />
          <Text style={{ color: '#555' }}>What's on your mind?</Text>
        </TouchableOpacity>

        {/* Feed */}
        {posts.map((post) => (
          <View key={post.id} style={styles.card}>
            <View style={styles.userInfo}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <Text style={styles.username}>{post.username}</Text>
            </View>

            <Text style={styles.description}>{post.description}</Text>

            <TouchableOpacity onPress={() => setSelectedImage(post.image)}>
              <Image source={post.image} style={styles.postImage} resizeMode="cover" />
            </TouchableOpacity>

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

      {/* New Post Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Outer background dismiss */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            {/* Inner card stops propagation */}
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Create Post</Text>
                <View style={styles.modalInputBox}>
                  <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/99.jpg' }}
                    style={styles.avatar}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="What's on your mind?"
                    placeholderTextColor="#555"
                    value={postText}
                    onChangeText={setPostText}
                    multiline
                  />
                </View>

                {/* Preview of picked images with FlatList */}
                <FlatList
                  horizontal
                  data={pickedImages}
                  keyExtractor={(_, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <View style={{ position: 'relative', marginRight: 10 }}>
                      <Image source={{ uri: item }} style={styles.previewImage} />
                      <TouchableOpacity
                        onPress={() => removeImage(index)}
                        style={styles.removeImageBtn}
                      >
                        <Ionicons name="close" size={18} color="black" />
                      </TouchableOpacity>
                    </View>
                  )}
                  ListFooterComponent={
                    <TouchableOpacity
                      onPress={pickImage}
                      style={styles.addMoreBtn}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="image-outline" size={40} color="black" />
                      <Text style={styles.addPhotoText}>Add Photo</Text>
                    </TouchableOpacity>
                  }
                  contentContainerStyle={{ paddingBottom: 10 }}
                />

                <TouchableOpacity
                  style={styles.postButton}
                  onPress={() => {
                    setModalVisible(false);
                    setPostText('');
                    setPickedImages([]);
                  }}
                >
                  <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  postOverlayBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalInputBox: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  modalInput: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    color: '#000',
  },
  previewImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  removeImageBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addMoreBtn: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  addPhotoText: {
    color: 'black',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  postButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
  },
  postButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    marginHorizontal: 10,
    shadowColor: 'black',
    shadowOpacity: 0.09,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  username: { fontWeight: 'bold' },
  description: { marginBottom: 8 },
  postImage: { width: '100%', height: 180, borderRadius: 8, marginBottom: 10 },
  actions: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  likeContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  likeText: { marginLeft: 4, color: 'red' },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: { width: '100%', height: '100%' },
});

export default HomeScreen;

