import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, IndianRupee, Home, Users } from 'lucide-react-native';

const popularLocations = [
  'Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 'Electronic City',
  'Marathahalli', 'BTM Layout', 'Jayanagar', 'Rajajinagar', 'Yelahanka'
];

const priceRanges = [
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹15,000', min: 10000, max: 15000 },
  { label: '₹15,000 - ₹20,000', min: 15000, max: 20000 },
  { label: 'Above ₹20,000', min: 20000, max: 100000 },
];

const roomTypes = ['Single Room', 'Shared Room', 'Studio', 'Apartment'];
const genderPreferences = ['Male', 'Female', 'Any'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Properties</Text>
        
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
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color="#007BFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {showFilters && (
          <View style={styles.filtersContainer}>
            <Text style={styles.sectionTitle}>Filters</Text>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Price Range</Text>
              <View style={styles.filterOptions}>
                {priceRanges.map((range, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      selectedPriceRange === range.label && styles.selectedFilter
                    ]}
                    onPress={() => setSelectedPriceRange(
                      selectedPriceRange === range.label ? '' : range.label
                    )}
                  >
                    <IndianRupee size={16} color={
                      selectedPriceRange === range.label ? '#FFFFFF' : '#6C757D'
                    } />
                    <Text style={[
                      styles.filterOptionText,
                      selectedPriceRange === range.label && styles.selectedFilterText
                    ]}>
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Room Type</Text>
              <View style={styles.filterOptions}>
                {roomTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      selectedRoomType === type && styles.selectedFilter
                    ]}
                    onPress={() => setSelectedRoomType(
                      selectedRoomType === type ? '' : type
                    )}
                  >
                    <Home size={16} color={
                      selectedRoomType === type ? '#FFFFFF' : '#6C757D'
                    } />
                    <Text style={[
                      styles.filterOptionText,
                      selectedRoomType === type && styles.selectedFilterText
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Gender Preference</Text>
              <View style={styles.filterOptions}>
                {genderPreferences.map((gender, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterOption,
                      selectedGender === gender && styles.selectedFilter
                    ]}
                    onPress={() => setSelectedGender(
                      selectedGender === gender ? '' : gender
                    )}
                  >
                    <Users size={16} color={
                      selectedGender === gender ? '#FFFFFF' : '#6C757D'
                    } />
                    <Text style={[
                      styles.filterOptionText,
                      selectedGender === gender && styles.selectedFilterText
                    ]}>
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Locations</Text>
          <View style={styles.locationsGrid}>
            {popularLocations.map((location, index) => (
              <TouchableOpacity key={index} style={styles.locationCard}>
                <MapPin size={20} color="#007BFF" />
                <Text style={styles.locationText}>{location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.recentSearches}>
            <TouchableOpacity style={styles.recentSearchItem}>
              <Search size={16} color="#6C757D" />
              <Text style={styles.recentSearchText}>Koramangala PG for boys</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentSearchItem}>
              <Search size={16} color="#6C757D" />
              <Text style={styles.recentSearchText}>HSR Layout under 8000</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentSearchItem}>
              <Search size={16} color="#6C757D" />
              <Text style={styles.recentSearchText}>Indiranagar studio apartment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedFilter: {
    backgroundColor: '#007BFF',
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6C757D',
    marginLeft: 6,
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginBottom: 16,
  },
  locationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#343A40',
    marginLeft: 8,
  },
  recentSearches: {
    gap: 12,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recentSearchText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#343A40',
    marginLeft: 12,
  },
});