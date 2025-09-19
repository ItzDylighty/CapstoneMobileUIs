import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';

// Chat item component
const ChatItem = ({ name, lastMessage, imageSource, onPress }) => (
  <TouchableOpacity style={styles.chatItem} onPress={onPress}>
    <Image source={imageSource} style={styles.chatImage} />
    <View style={styles.chatTextContainer}>
      <Text style={styles.chatName}>{name}</Text>
      <Text style={styles.chatLastMessage}>{lastMessage}</Text>
    </View>
  </TouchableOpacity>
);

const MessagesScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Messages" showSearch={true} />

      <ScrollView style={styles.chatList}>
        <ChatItem
          name="James Morgan Mcgill"
          lastMessage="Sige pre"
          imageSource={require('../../assets/adaptive-icon.png')}
          onPress={() => router.push({ pathname: '/viewMessage', params: { name: 'James Morgan Mcgill' } })}
        />
        <ChatItem
          name="Natsuki Deguchi"
          lastMessage="Musta u tutuy?"
          imageSource={require('../../assets/favicon.png')}
          onPress={() => router.push({ pathname: '/viewMessage', params: { name: 'Natsuki Deguchi' } })}
        />
        <ChatItem
          name="Park Shin Hye"
          lastMessage="Lab u"
          imageSource={require('../../assets/splash-icon.png')}
          onPress={() => router.push({ pathname: '/viewMessage', params: { name: 'Park Shin Hye' } })}
        />
        <ChatItem
          name="Gintoki Sakata"
          lastMessage="Pa commission po pls"
          imageSource={require('../../assets/mustry.png')}
          onPress={() => router.push({ pathname: '/viewMessage', params: { name: 'Gintoki Sakata' } })}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chatList: { flex: 1, paddingHorizontal: 15 },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chatImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  chatTextContainer: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: 'bold' },
  chatLastMessage: { fontSize: 14, color: '#888' },
});

export default MessagesScreen;
