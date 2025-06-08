import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Heart, MapPin, Wifi, Bed, Users, Trash2 } from 'lucide-react-native';

const savedProperties = [
  {
    id: '2',
    title: 'Comfortable Shared Room',
    location: 'HSR Layout, Bangalore',
    rent: 6500,
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    verified: true,
    gender: 'Female',
    amenities: ['Shared', 'WiFi', 'Meals'],
    savedDate: '2024-01-15',
  },
  {
    id: '4',
    title: 'Cozy Single Room with Balcony',
    location: 'Marathahalli, Bangalore',
    rent: 9500,
    image: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg',
    verified: true,
    gender: 'Male',
    amenities: ['Single', 'WiFi', 'Balcony'],
    savedDate: '2024-01-12',
  },
  {
    id: '5',
    title: 'Modern Studio Near IT Park',
    location: 'Whitefield, Bangalore',
    rent: 14000,
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
    verified: false,
    gender: 'Any',
    amenities: ['Studio', 'WiFi', 'Gym'],
    savedDate: '2024-01-10',
  },
];

export default function SavedScreen() {
  const [properties, setProperties] = useState(savedProperties);
  const router = useRouter();

  const removeFromSaved = (id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
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
          style={styles.removeButton}
          onPress={() => removeFromSaved(property.id)}
        >
          <Trash2 size={16} color="#DC3545" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.propertyInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.rentPrice}>₹{property.rent.toLocaleString()} / month</Text>
          <Heart size={16} color="#DC3545" fill="#DC3545" />
        </View>
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
        
        <Text style={styles.savedDate}>
          Saved on {new Date(property.savedDate).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Properties</Text>
        <Text style={styles.subtitle}>{properties.length} properties saved</Text>
      </View>

      {properties.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heart size={64} color="#DEE2E6" />
          <Text style={styles.emptyTitle}>No Saved Properties</Text>
          <Text style={styles.emptySubtitle}>
            Properties you save will appear here for easy access
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.browseButtonText}>Browse Properties</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {properties.map(renderPropertyCard)}
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
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
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyInfo: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  rentPrice: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#343A40',
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
    marginBottom: 12,
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
  savedDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#17A2B8',
  },
});