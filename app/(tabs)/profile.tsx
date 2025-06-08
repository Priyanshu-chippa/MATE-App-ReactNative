import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  User, 
  Heart, 
  Home, 
  CreditCard, 
  Shield, 
  Settings, 
  LogOut,
  ChevronRight,
  Star,
  MapPin
} from 'lucide-react-native';

const menuItems = [
  {
    title: 'My Profile',
    subtitle: 'Edit your personal information',
    icon: User,
    route: '/profile/edit',
    color: '#007BFF',
  },
  {
    title: 'Saved Properties',
    subtitle: 'View your favorited properties',
    icon: Heart,
    route: '/(tabs)/saved',
    color: '#DC3545',
  },
  {
    title: 'My Listings',
    subtitle: 'Manage your property listings',
    icon: Home,
    route: '/profile/listings',
    color: '#28A745',
  },
  {
    title: 'Subscriptions',
    subtitle: 'Manage your premium features',
    icon: CreditCard,
    route: '/profile/subscriptions',
    color: '#17A2B8',
  },
  {
    title: 'Become a Verifier',
    subtitle: 'Join our gig-economy program',
    icon: Shield,
    route: '/profile/verifier',
    color: '#FFC107',
  },
  {
    title: 'Settings',
    subtitle: 'Notifications, privacy & more',
    icon: Settings,
    route: '/profile/settings',
    color: '#6C757D',
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/auth');
  };

  const renderMenuItem = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      onPress={() => router.push(item.route)}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
        <item.icon size={24} color={item.color} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <ChevronRight size={20} color="#6C757D" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg' }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>John Smith</Text>
              <Text style={styles.email}>john.smith@email.com</Text>
              <View style={styles.locationContainer}>
                <MapPin size={14} color="#6C757D" />
                <Text style={styles.location}>Bangalore, India</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Visited</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFC107" fill="#FFC107" />
                <Text style={styles.statNumber}>4.8</Text>
              </View>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.logoutIconContainer}>
            <LogOut size={24} color="#DC3545" />
          </View>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.appVersion}>MATE v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ for students</Text>
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
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#343A40',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6C757D',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#343A40',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#DEE2E6',
    marginHorizontal: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#343A40',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#DC3545',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6C757D',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6C757D',
  },
});