import { View, Text, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={s.box}>
      <Text style={s.judul}>HappyLearn Mobile - Inisialisasi Proyek</Text>
      <Text style={s.sub}>NIM: 2802458592 - Kelas LA95</Text>
    </View>
  );
}

const s = StyleSheet.create({
  box: {
    flex: 1,
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  judul: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3525cd',
  },
  sub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
});

export default App;
