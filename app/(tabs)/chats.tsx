import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, MessageCircle, Clock } from 'lucide-react-native';

const chatData = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    type: 'Owner',
    lastMessage: 'Yes, the room is still available. When would you like to visit?',
    timestamp: '2:30 PM',
    unreadCount: 2,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    propertyTitle: 'Spacious Single Room in a PG',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    type: 'Tenant',
    lastMessage: 'The WiFi speed is really good here, around 50 Mbps',
    timestamp: '1:15 PM',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    propertyTitle: 'Comfortable Shared Room - HSR Layout',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Amit Patel',
    type: 'Owner',
    lastMessage: 'Security deposit is ₹10,000 for single occupancy',
    timestamp: '11:45 AM',
    unreadCount: 1,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    propertyTitle: 'Modern Studio Near IT Park',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    type: 'Tenant',
    lastMessage: 'The landlord is very cooperative and the area is safe',
    timestamp: 'Yesterday',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    propertyTitle: 'Cozy Single Room with Balcony',
    isOnline: false,
  },
  {
    id: '5',
    name: 'Rajesh Singh',
    type: 'Owner',
    lastMessage: 'We provide 3 meals a day. Breakfast, lunch, and dinner',
    timestamp: 'Yesterday',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
    propertyTitle: 'Premium PG with All Amenities',
    isOnline: false,
  },
];

export default function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState(chatData);
  const router = useRouter();

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = (chat: any) => (
    <TouchableOpacity
      key={chat.id}
      style={styles.chatItem}
      onPress={() => router.push(`/chat/${chat.id}`)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: chat.avatar }} style={styles.avatar} />
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <View style={styles.nameContainer}>
            <Text style={styles.chatName}>{chat.name}</Text>
            <View style={[styles.typeBadge, 
              chat.type === 'Owner' ? styles.ownerBadge : styles.tenantBadge
            ]}>
              <Text style={[styles.typeText,
                chat.type === 'Owner' ? styles.ownerText : styles.tenantText
              ]}>
                {chat.type}
              </Text>
            </View>
          </View>
          <View style={styles.timestampContainer}>
            <Text style={styles.timestamp}>{chat.timestamp}</Text>
            {chat.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{chat.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
        
        <Text style={styles.propertyTitle}>{chat.propertyTitle}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color="#6C757D" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search chats..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6C757D"
          />
        </View>
      </View>

      {filteredChats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MessageCircle size={64} color="#DEE2E6" />
          <Text style={styles.emptyTitle}>No Conversations Yet</Text>
          <Text style={styles.emptySubtitle}>
            {searchQuery 
              ? 'No chats found matching your search'
              : 'Start browsing properties to connect with owners and tenants'
            }
          </Text>
          {!searchQuery && (
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.browseButtonText}>Browse Properties</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {filteredChats.map(renderChatItem)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#343A40',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#343A40',
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  browseButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  browseButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  chatItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    resizeMode: 'cover',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    backgroundColor: '#28A745',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginRight: 8,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ownerBadge: {
    backgroundColor: '#E8F4FD',
  },
  tenantBadge: {
    backgroundColor: '#E8F5E8',
  },
  typeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  ownerText: {
    color: '#007BFF',
  },
  tenantText: {
    color: '#28A745',
  },
  timestampContainer: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  propertyTitle: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#17A2B8',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
  },
});