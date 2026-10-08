import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from './Icon';

export default function InputField({ label, val, onChangeText, placeholder, secureTextEntry = false, iconName, err, rightBtn }) {
  const [fokus, setFokus] = useState(false);

  return (
    <View style={s.wrap}>
      {label ? <Text style={s.lbl}>{label}</Text> : null}
      <View style={[s.box, fokus && s.boxFokus, err && s.boxErr]}>
        {iconName ? (
          <View style={s.icWrap}>
            <Icon name={iconName} size={18} color={fokus ? "#1f654d" : "#78716c"} />
          </View>
        ) : null}
        <TextInput
          value={val}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#a8a29e"
          secureTextEntry={secureTextEntry}
          onFocus={() => setFokus(true)}
          onBlur={() => setFokus(false)}
          style={s.inp}
        />
        {rightBtn ? rightBtn : null}
      </View>
      {err ? <Text style={s.errTxt}>{err}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  lbl: {
    fontSize: 12,
    fontWeight: '700',
    color: '#292524',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  boxFokus: {
    borderColor: '#1f654d',
    backgroundColor: '#ffffff',
    shadowColor: '#1f654d',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  boxErr: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  icWrap: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inp: {
    flex: 1,
    height: '100%',
    fontSize: 13,
    color: '#1c1917',
    fontWeight: '500',
    outlineStyle: 'none',
  },
  errTxt: {
    fontSize: 11,
    color: '#ef4444',
    marginTop: 4,
    fontWeight: '600',
  },
});
