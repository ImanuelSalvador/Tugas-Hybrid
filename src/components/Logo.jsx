import { View, Text, StyleSheet } from 'react-native';
import Icon from './Icon';

export default function Logo({ size = "md" }) {
  const isSm = size === "sm";
  return (
    <View style={s.row}>
      <View style={[s.iconBox, isSm && s.iconBoxSm]}>
        <Icon name="cap" size={isSm ? 16 : 22} color="#ffffff" />
      </View>
      <View>
        <View style={s.titleRow}>
          <Text style={[s.judul, isSm && s.judulSm]}>happy</Text>
          <Text style={[s.judulBold, isSm && s.judulSm]}>learn</Text>
          <View style={s.badgePro}>
            <Text style={s.badgeProTxt}>UTS</Text>
          </View>
        </View>
        <Text style={s.sub}>binus university semarang</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#1f654d',
    borderBottomWidth: 3,
    borderBottomColor: '#164e3b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1f654d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBoxSm: {
    width: 30,
    height: 30,
    borderRadius: 9,
    borderBottomWidth: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  judul: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1c1917',
    letterSpacing: -0.5,
  },
  judulBold: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1f654d',
    letterSpacing: -0.5,
  },
  judulSm: {
    fontSize: 15,
  },
  badgePro: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  badgeProTxt: {
    fontSize: 9,
    fontWeight: '800',
    color: '#d97706',
    letterSpacing: 0.5,
  },
  sub: {
    fontSize: 11,
    color: '#78716c',
    marginTop: -2,
    fontWeight: '500',
  },
});
