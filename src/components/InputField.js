import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme/colors';

/**
 * Reusable InputField Component
 * Membungkus Core Component TextInput dengan label terintegrasi dan pesan validasi error.
 * Referensi materi Session 3: Collecting Data (Text Input).
 */
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  errorMessage = '',
  autoCapitalize = 'none',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textMuted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[
          styles.input,
          errorMessage ? styles.inputError : null,
        ]}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 6,
  },
  label: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: 14,
    fontSize: SIZES.font,
    color: COLORS.textPrimary,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
  },
});

export default InputField;
