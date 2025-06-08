import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Filter, MapPin, Wifi, Bed, Users, Heart, Plus, Map } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const mockProperties = [
  {
    id: '1',
    title: 'Spacious Single Room in a PG',
    location: 'Koramangala, Bangalore',
    rent: 8500,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    verified: true,
    gender: 'Male',
    amenities: ['Single', 'WiFi', 'AC'],
    isFavorited: false,
  },
  {
    id: '2',
    title: 'Comfortable Shared Room',
    location: 'HSR Layout, Bangalore',
    rent: 6500,
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    verified: true,
    gender: 'Female',
    amenities: ['Shared', 'WiFi', 'Meals'],
    isFavorited: true,
  },
  {
    id: '3',
    title: 'Premium Studio Apartment',
    location: 'Indiranagar, Bangalore',
    rent: 12000,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
    verified: false,
    gender: 'Any',
    amenities: ['Studio', 'WiFi', 'Kitchen'],
    isFavorited: false,
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('listings');
  const [properties, setProperties] = useState(mockProperties);
  const router = useRouter();

  const toggleFavorite = (id: string) => {
    setProperties(prev => prev.map(property => 
      property.id === id 
        ? { ...property, isFavorited: !property.isFavorited }
        : property
    ));
  };

  const renderPropertyCard = (property: any) => (
    <TouchableOpacity
      key={property.id}
      style={styles.propertyCard}
      onPress={() => router.push(`/property/${property.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.image }} style={styles.propertyImage} />
        {property.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(property.id)}
        >
          <Heart
            size={20}
            color={property.isFavorited ? '#DC3545' : '#FFFFFF'}
            fill={property.isFavorited ? '#DC3545' : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.propertyInfo}>
        <Text style={styles.rentPrice}>₹{property.rent.toLocaleString()} / month</Text>
        <Text style={styles.propertyTitle}>{property.title}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#6C757D" />
          <Text style={styles.locationText}>{property.location}</Text>
        </View>
        
        <View style={styles.amenitiesContainer}>
          <View style={styles.amenityItem}>
            <Bed size={14} color="#6C757D" />
            <Text style={styles.amenityText}>{property.amenities[0]}</Text>
          </View>
          <View style={styles.amenityItem}>
            <Users size={14} color="#6C757D" />
            <Text style={styles.amenityText}>{property.gender}</Text>
          </View>
          <View style={styles.amenityItem}>
            <Wifi size={14} color="#6C757D" />
            <Text style={styles.amenityText}>WiFi</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, User!</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6C757D" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by locality, city, or landmark..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#6C757D"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'foryou' && styles.activeTab]}
            onPress={() => setActiveTab('foryou')}
          >
            <Text style={[styles.tabText, activeTab === 'foryou' && styles.activeTabText]}>
              For You
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'listings' && styles.activeTab]}
            onPress={() => setActiveTab('listings')}
          >
            <Text style={[styles.tabText, activeTab === 'listings' && styles.activeTabText]}>
              Listings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'map' && styles.activeTab]}
            onPress={() => setActiveTab('map')}
          >
            <Text style={[styles.tabText, activeTab === 'map' && styles.activeTabText]}>
              Map View
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'map' ? (
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Map size={48} color="#6C757D" />
            <Text style={styles.mapPlaceholderText}>Interactive Map View</Text>
            <Text style={styles.mapSubtext}>Properties will be shown as price pins</Text>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {properties.map(renderPropertyCard)}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#343A40',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginRight: 12,
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
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  propertyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#28A745',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  propertyInfo: {
    padding: 16,
  },
  rentPrice: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#343A40',
    marginBottom: 4,
  },
  propertyTitle: {
    fontSize: 16,
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
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    marginLeft: 4,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  amenityText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    marginLeft: 4,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginTop: 16,
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#17A2B8',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
});