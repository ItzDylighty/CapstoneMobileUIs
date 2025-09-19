import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import Header from '../components/Header'; // Reusable Header

const ViewGalleryScreen = () => {
  const [comment, setComment] = useState('');
  const [zoomImage, setZoomImage] = useState(null); // new state for full-screen image

  const commentsData = [
    { id: 1, name: 'Travis Langdon', date: '2025-05-14 09:12 AM', text: 'This painting gives me chills. The way their faces are veiled yet they\'re so close—it speaks volumes about emotional distance in relationships. Hauntingly beautiful.' },
    { id: 2, name: 'Eric Langford', date: '2025-05-13 08:47 AM', text: 'The contrast between the warm embrace and the faceless connection hits hard. Beautifully unsettling.' },
    { id: 3, name: 'Dylan Hawthorne', date: '2025-05-13 01:37 AM', text: 'I can\'t stop staring at this. It\'s like love in the modern world—present, close, but somehow always slightly hidden.' },
    { id: 4, name: 'Jared Ellison', date: '2025-05-11 02:15 PM', text: 'This piece really stopped me in my tracks. The symbolism is powerful and the execution is flawless. Honestly thinking...' },
  ];

  const renderComment = (item) => (
    <View style={styles.commentContainer} key={item.id}>
      <Image
        source={require('../../assets/RonProfile.jpeg')}
        style={styles.commentAvatar}
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentName}>{item.name}</Text>
          <Text style={styles.commentDate}>{item.date}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Gallery" showSearch={false} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Artwork Image */}
        <TouchableOpacity style={styles.card} onPress={() => setZoomImage(require('../../assets/pic1.jpg'))}>
          <Image
            source={require('../../assets/pic1.jpg')}
            style={styles.artworkImage}
          />
        </TouchableOpacity>

        {/* Artwork Title */}
        <View style={styles.card}>
          <Text style={styles.artworkTitle}>"Blind" by Kylan Gentry</Text>
        </View>

        {/* Details Section */}
        <View style={styles.card}>
          <Text style={styles.descriptionText}>
            A portrayal of emotional distance in intimacy, where veiled faces represent barriers to true connection and hidden isolation.
          </Text>
          <Text style={styles.detailsHeader}>Details:</Text>
          <View style={styles.detailsList}>
            <Text style={styles.detailItem}><Text style={styles.bold}>Title:</Text> Blind</Text>
            <Text style={styles.detailItem}><Text style={styles.bold}>Artist:</Text> Kylan Gentry</Text>
            <Text style={styles.detailItem}><Text style={styles.bold}>Medium:</Text></Text>
            <Text style={styles.detailSubItem}>- Oil paint</Text>
            <Text style={styles.detailSubItem}>- Canvas</Text>
            <Text style={styles.detailItem}><Text style={styles.bold}>Year:</Text> 1928 (original inspiration)</Text>
          </View>
        </View>

        {/* Comment Input */}
        <View style={styles.commentInputCard}>
          <TextInput
            style={styles.commentTextInput}
            placeholder="Add comment...."
            multiline
            value={comment}
            onChangeText={setComment}
          />
          <View style={styles.commentToolbar}>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments Section */}
        <View style={styles.commentSection}>
          <Text style={styles.commentsTitle}>Comments</Text>
          {commentsData.map(renderComment)}
        </View>
      </ScrollView>

      {/* Full-screen image modal */}
      <Modal
        visible={zoomImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setZoomImage(null)}
      >
        <TouchableOpacity style={styles.fullScreenContainer} onPress={() => setZoomImage(null)}>
          <Image source={zoomImage} style={styles.fullScreenImage} resizeMode="contain" />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F8FA' },
  content: { paddingTop: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  artworkImage: { width: '100%', height: 200, resizeMode: 'cover', borderRadius: 10 },
  artworkTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  descriptionText: { fontSize: 14, color: '#555', marginBottom: 10 },
  detailsHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  detailsList: { marginLeft: 10 },
  detailItem: { fontSize: 14, color: '#555', marginBottom: 3 },
  detailSubItem: { fontSize: 14, color: '#555', marginLeft: 10, marginBottom: 3 },
  bold: { fontWeight: 'bold' },
  commentInputCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  commentTextInput: { minHeight: 60, fontSize: 16, color: '#333', marginBottom: 10 },
  commentToolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  submitButton: { backgroundColor: '#e0e0e0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  submitButtonText: { color: '#000', fontWeight: 'bold' },
  commentSection: { marginHorizontal: 15 },
  commentsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  commentContainer: { flexDirection: 'row', marginBottom: 15, alignItems: 'flex-start' },
  commentAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  commentContent: { flex: 1, backgroundColor: '#fff', padding: 10, borderRadius: 10 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  commentName: { fontWeight: 'bold' },
  commentDate: { fontSize: 12, color: 'gray' },
  commentText: { fontSize: 14, color: '#333' },

  // Full-screen image modal
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

export default ViewGalleryScreen;
