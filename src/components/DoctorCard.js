import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme/colors';

/**
 * Reusable DoctorCard Component
 * Menampilkan ringkasan informasi dokter dalam daftar (HomeScreen).
 * Dilengkapi callback onPress untuk memicu navigasi ke DetailScreen (LO 2).
 */
const DoctorCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.avatar}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.doctorName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
        <Text style={styles.hospital} numberOfLines={1}>
          {item.hospital}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.ratingBox}>
            <Text style={styles.ratingText}>★ {item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews})</Text>
          </View>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius - 2,
    backgroundColor: COLORS.primaryLight,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: SIZES.font + 1,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  specialty: {
    fontSize: SIZES.small,
    color: COLORS.primaryDark,
    fontWeight: '500',
    marginTop: 2,
  },
  hospital: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.warning,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  priceText: {
    fontSize: SIZES.small + 1,
    fontWeight: '700',
    color: COLORS.secondary,
  },
});

export default DoctorCard;
