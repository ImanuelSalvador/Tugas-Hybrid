import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

/**
 * Reusable StatusBadge Component
 * Memberikan visual indikator status pada data transaksi/janji temu.
 */
const StatusBadge = ({ status }) => {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Terkonfirmasi':
        return {
          bg: COLORS.successLight,
          text: COLORS.success,
        };
      case 'Selesai':
        return {
          bg: COLORS.primaryLight,
          text: COLORS.primary,
        };
      case 'Dibatalkan':
        return {
          bg: COLORS.dangerLight,
          text: COLORS.danger,
        };
      case 'Menunggu':
      default:
        return {
          bg: COLORS.warningLight,
          text: COLORS.warning,
        };
    }
  };

  const styleConfig = getBadgeStyle();

  return (
    <View style={[styles.badge, { backgroundColor: styleConfig.bg }]}>
      <Text style={[styles.text, { color: styleConfig.text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default StatusBadge;
