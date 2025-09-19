import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';

// Dummy messages
const messagesData = [
  { id: '1', text: 'Hello tol', sender: 'other', avatar: require('../../assets/nat.jpeg') },
  { id: '2', text: 'Pwede patulong?', sender: 'other', avatar: require('../../assets/nat.jpeg') },
  { id: '3', text: 'Sige ba', sender: 'me' },
  { id: '4', text: 'Papinta po', sender: 'other', avatar: require('../../assets/nat.jpeg') },
  { id: '5', text: 'Ano gusto mo?', sender: 'me' },
  { id: '6', text: 'Garfield po', sender: 'other', avatar: require('../../assets/nat.jpeg') },
  { id: '7', text: 'Sige pre', sender: 'me' },
];

const ViewMessageScreen = () => {
  const { name } = useLocalSearchParams();
  const flatListRef = useRef(null);
  const [messages, setMessages] = useState(messagesData);
  const [inputText, setInputText] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const insets = useSafeAreaInsets();

  const keyboardHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === 'me' ? styles.rightAlign : styles.leftAlign,
      ]}
    >
      {item.sender === 'other' && <Image source={item.avatar} style={styles.avatar} />}
      <View
        style={[
          styles.bubble,
          item.sender === 'me' ? styles.myBubble : styles.otherBubble,
        ]}
      >
        <Text style={item.sender === 'me' ? styles.myMessageText : styles.messageText}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  const handleSend = () => {
    if (inputText.trim() === '') return;
    const newMessage = { id: Date.now().toString(), text: inputText, sender: 'me' };
    setMessages([...messages, newMessage]);
    setInputText('');
    setInputHeight(40);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Message" showSearch={false} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.chatContainer}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            style={{ flex: 1 }}
          />

          <Animated.View
            style={[
              styles.inputContainerWrapper,
              { paddingBottom: insets.bottom + 8, bottom: keyboardHeight },
            ]}
          >
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.mediaButton}>
                <Ionicons name="images-outline" size={20} color="#888" />
              </TouchableOpacity>

              <TextInput
                style={[styles.input, { height: Math.max(40, inputHeight) }]}
                placeholder="Write a message..."
                placeholderTextColor="#888"
                value={inputText}
                onChangeText={setInputText}
                multiline={true}
                onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
              />

              <TouchableOpacity onPress={handleSend}>
                <Ionicons name="send" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  chatContainer: { padding: 10 },
  messageRow: { flexDirection: 'row', marginBottom: 8, alignItems: 'flex-end' },
  leftAlign: { justifyContent: 'flex-start' },
  rightAlign: { justifyContent: 'flex-end' },
  avatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 8 },
  bubble: {
    maxWidth: '75%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  otherBubble: { backgroundColor: '#fff' },
  myBubble: { backgroundColor: '#6200EE' },
  messageText: { fontSize: 15, color: '#000' },
  myMessageText: { color: '#fff' },
  inputContainerWrapper: { position: 'absolute', left: 0, right: 0 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 8,
    maxHeight: 120,
  },
  mediaButton: { padding: 5 },
});

export default ViewMessageScreen;
