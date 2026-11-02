import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../theme/colors';

/**
 * Reusable CustomButton Component
 * Digunakan secara modular di seluruh layar aplikasi (Auth, Detail, & Janji Temu).
 * Mendukung beberapa varian gaya (primary, secondary, danger, outline) serta status loading.
 */
const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  // Menentukan background sesuai varian
  const getBackgroundColor = () => {
    if (disabled) return COLORS.border;
    switch (variant) {
      case 'secondary':
        return COLORS.secondary;
      case 'danger':
        return COLORS.danger;
      case 'outline':
        return 'transparent';
      case 'primary':
      default:
        return COLORS.primary;
    }
  };

  // Menentukan warna teks
  const getTextColor = () => {
    if (disabled) return COLORS.textMuted;
    if (variant === 'outline') return COLORS.primary;
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.buttonBase,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.outlineBorder,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text style={[styles.buttonText, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    height: 48,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginVertical: 6,
  },
  outlineBorder: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: SIZES.font,
    fontWeight: '600',
  },
});

export default CustomButton;
