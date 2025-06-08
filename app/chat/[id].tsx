import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react-native';

const mockMessages = [
  {
    id: '1',
    text: 'Hi! I saw your listing for the single room in Koramangala. Is it still available?',
    sender: 'user',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: 'Hello! Yes, the room is still available. When would you like to visit?',
    sender: 'other',
    timestamp: '10:45 AM',
  },
  {
    id: '3',
    text: 'Great! I can visit this weekend. What are the visiting hours?',
    sender: 'user',
    timestamp: '10:47 AM',
  },
  {
    id: '4',
    text: 'You can visit anytime between 10 AM to 7 PM on weekends. Would Saturday work for you?',
    sender: 'other',
    timestamp: '10:50 AM',
  },
  {
    id: '5',
    text: 'Saturday afternoon around 2 PM sounds perfect. Also, could you tell me about the WiFi speed and meal arrangements?',
    sender: 'user',
    timestamp: '10:52 AM',
  },
  {
    id: '6',
    text: 'We have high-speed WiFi (50+ Mbps) and provide 3 meals a day. The food is home-style and hygienic. See you on Saturday!',
    sender: 'other',
    timestamp: '11:00 AM',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const renderMessage = (message: any) => (
    <View key={message.id} style={[
      styles.messageContainer,
      message.sender === 'user' ? styles.userMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble,
        message.sender === 'user' ? styles.userBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.sender === 'user' ? styles.userText : styles.otherText
        ]}>
          {message.text}
        </Text>
      </View>
      <Text style={[
        styles.timestamp,
        message.sender === 'user' ? styles.userTimestamp : styles.otherTimestamp
      ]}>
        {message.timestamp}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#343A40" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>Ramesh Kumar</Text>
            <Text style={styles.headerStatus}>Owner • Online</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionButton}>
            <Phone size={20} color="#007BFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionButton}>
            <Video size={20} color="#007BFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionButton}>
            <MoreVertical size={20} color="#343A40" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            placeholderTextColor="#6C757D"
          />
          <TouchableOpacity 
            style={[styles.sendButton, newMessage.trim() && styles.sendButtonActive]}
            onPress={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={20} color={newMessage.trim() ? '#FFFFFF' : '#6C757D'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
  },
  headerStatus: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#28A745',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerActionButton: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: '#007BFF',
    borderBottomRightRadius: 6,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  otherText: {
    color: '#343A40',
  },
  timestamp: {
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    paddingHorizontal: 4,
  },
  userTimestamp: {
    textAlign: 'right',
  },
  otherTimestamp: {
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F4',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#343A40',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#007BFF',
  },
});