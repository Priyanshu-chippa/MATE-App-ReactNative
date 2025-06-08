import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Wifi, 
  Car, 
  Thermometer, 
  Droplets,
  Shield,
  MessageCircle,
  Calendar,
  Eye
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const propertyData = {
  id: '1',
  title: 'Spacious Single Room in a PG',
  location: 'Koramangala 5th Block, Bangalore',
  rent: 8500,
  deposit: 17000,
  images: [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg',
  ],
  verified: true,
  has360Tour: true,
  amenities: [
    { name: 'High-Speed WiFi', icon: Wifi },
    { name: 'Parking', icon: Car },
    { name: 'AC', icon: Thermometer },
    { name: 'Water Heater', icon: Droplets },
  ],
  description: 'This spacious single room is perfect for working professionals and students. Located in the heart of Koramangala, it offers easy access to tech parks, restaurants, and public transport. The room comes fully furnished with a comfortable bed, study table, and ample storage space.',
  rules: [
    'No smoking inside the premises',
    'Gate closing time: 11:00 PM',
    'Visitors allowed till 9:00 PM',
    'Monthly rent due by 5th of every month',
  ],
  owner: {
    name: 'Ramesh Kumar',
    verified: true,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 4.8,
    properties: 12,
  },
  isFavorited: false,
};

export default function PropertyDetailsScreen() {
  const [activeTab, setActiveTab] = useState('details');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(propertyData.isFavorited);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);

  const onImageScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentImageIndex(index);
  };

  const renderAmenity = (amenity: any, index: number) => (
    <View key={index} style={styles.amenityItem}>
      <View style={styles.amenityIcon}>
        <amenity.icon size={20} color="#007BFF" />
      </View>
      <Text style={styles.amenityText}>{amenity.name}</Text>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.amenitiesGrid}>
                {propertyData.amenities.map(renderAmenity)}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{propertyData.description}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rules & Regulations</Text>
              {propertyData.rules.map((rule, index) => (
                <View key={index} style={styles.ruleItem}>
                  <Text style={styles.ruleBullet}>•</Text>
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      
      case 'owner':
        return (
          <View style={styles.tabContent}>
            <View style={styles.ownerCard}>
              <Image source={{ uri: propertyData.owner.avatar }} style={styles.ownerAvatar} />
              <View style={styles.ownerInfo}>
                <View style={styles.ownerHeader}>
                  <Text style={styles.ownerName}>{propertyData.owner.name}</Text>
                  {propertyData.owner.verified && (
                    <View style={styles.verifiedOwnerBadge}>
                      <Shield size={14} color="#28A745" />
                      <Text style={styles.verifiedOwnerText}>Verified Owner</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.ownerStats}>
                  ⭐ {propertyData.owner.rating} • {propertyData.owner.properties} properties
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.chatOwnerButton}>
              <MessageCircle size={20} color="#FFFFFF" />
              <Text style={styles.chatOwnerText}>Chat with Owner</Text>
            </TouchableOpacity>
          </View>
        );
      
      case 'community':
        return (
          <View style={styles.tabContent}>
            <View style={styles.premiumOverlay}>
              <Text style={styles.premiumTitle}>Unlock Community Chat</Text>
              <Text style={styles.premiumSubtitle}>
                See who lives here and get the real scoop from current tenants
              </Text>
              <TouchableOpacity style={styles.subscribeButton}>
                <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onImageScroll}
            scrollEventThrottle={16}
          >
            {propertyData.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.propertyImage} />
            ))}
          </ScrollView>
          
          <View style={styles.imageOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setIsFavorited(!isFavorited)}
              >
                <Heart
                  size={20}
                  color={isFavorited ? '#DC3545' : '#FFFFFF'}
                  fill={isFavorited ? '#DC3545' : 'transparent'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.imageIndicators}>
            {propertyData.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator
                ]}
              />
            ))}
          </View>
          
          {propertyData.has360Tour && (
            <TouchableOpacity style={styles.tourButton}>
              <Eye size={16} color="#FFFFFF" />
              <Text style={styles.tourButtonText}>View 360° Tour</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.propertyHeader}>
            <View style={styles.priceContainer}>
              <Text style={styles.rentPrice}>₹{propertyData.rent.toLocaleString()}</Text>
              <Text style={styles.priceLabel}>/ month</Text>
            </View>
            <Text style={styles.depositText}>Deposit: ₹{propertyData.deposit.toLocaleString()}</Text>
            
            <Text style={styles.propertyTitle}>{propertyData.title}</Text>
            
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#6C757D" />
              <Text style={styles.locationText}>{propertyData.location}</Text>
            </View>
            
            {propertyData.verified && (
              <View style={styles.verifiedBadge}>
                <Shield size={16} color="#28A745" />
                <Text style={styles.verifiedText}>Verified by MATE</Text>
              </View>
            )}
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'details' && styles.activeTab]}
              onPress={() => setActiveTab('details')}
            >
              <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
                Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'owner' && styles.activeTab]}
              onPress={() => setActiveTab('owner')}
            >
              <Text style={[styles.tabText, activeTab === 'owner' && styles.activeTabText]}>
                Owner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'community' && styles.activeTab]}
              onPress={() => setActiveTab('community')}
            >
              <Text style={[styles.tabText, activeTab === 'community' && styles.activeTabText]}>
                Community
              </Text>
            </TouchableOpacity>
          </View>

          {renderTabContent()}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.saveButton}>
          <Heart
            size={20}
            color={isFavorited ? '#DC3545' : '#6C757D'}
            fill={isFavorited ? '#DC3545' : 'transparent'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton}>
          <Calendar size={20} color="#FFFFFF" />
          <Text style={styles.bookButtonText}>Book a Visit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  propertyImage: {
    width,
    height: 300,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  tourButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tourButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  contentContainer: {
    padding: 20,
  },
  propertyHeader: {
    marginBottom: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  rentPrice: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#343A40',
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    marginLeft: 4,
  },
  depositText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    marginBottom: 12,
  },
  propertyTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    marginLeft: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#28A745',
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6C757D',
  },
  activeTabText: {
    color: '#007BFF',
  },
  tabContent: {
    minHeight: 200,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginBottom: 12,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 8,
    minWidth: '45%',
  },
  amenityIcon: {
    marginRight: 8,
  },
  amenityText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#343A40',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#343A40',
    lineHeight: 24,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ruleBullet: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#007BFF',
    marginRight: 8,
    marginTop: 2,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#343A40',
    lineHeight: 20,
  },
  ownerCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  ownerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ownerName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginRight: 8,
  },
  verifiedOwnerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  verifiedOwnerText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#28A745',
    marginLeft: 2,
  },
  ownerStats: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
  },
  chatOwnerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 12,
  },
  chatOwnerText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  premiumOverlay: {
    backgroundColor: '#F8F9FA',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#17A2B8',
    borderStyle: 'dashed',
  },
  premiumTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginBottom: 8,
  },
  premiumSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  subscribeButton: {
    backgroundColor: '#17A2B8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  subscribeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F4',
    gap: 12,
  },
  saveButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});