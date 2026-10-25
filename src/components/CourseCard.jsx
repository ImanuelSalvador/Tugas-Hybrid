import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from './Icon';

export default function CourseCard({ c, onPilih, onSimpan }) {
  const inisial = (c.dosen || "Dosen").split(" ").map(w => w[0]).slice(0, 2).join("");
  const sksLabel = typeof c.sks === 'number' ? `${c.sks} SKS` : c.sks;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => onPilih && onPilih(c)}
      style={s.card}
    >
      <View style={s.topRow}>
        <View style={s.badgeKat}>
          <Text style={s.badgeTxt}>{c.kategori || c.category || "Kuliah"}</Text>
        </View>
        <View style={s.badgeSks}>
          <Icon name="star" size={12} color="#f59e0b" />
          <Text style={s.sksTxt}>{sksLabel}</Text>
        </View>
      </View>

      <Text style={s.judul}>{c.judul || c.title}</Text>
      
      <View style={s.dosenRow}>
        <View style={s.dosenAvatar}>
          <Text style={s.dosenAvatarTxt}>{inisial}</Text>
        </View>
        <Text style={s.dosen}>{c.dosen}</Text>
      </View>

      <View style={s.progressSection}>
        <View style={s.progressRow}>
          <Text style={s.progressLbl}>Progres Perkuliahan</Text>
          <Text style={s.progressVal}>8/16 Pertemuan (50%)</Text>
        </View>
        <View style={s.progressBarTrack}>
          <View style={s.progressBarFill} />
        </View>
      </View>

      <View style={s.botRow}>
        <View style={s.kodeChip}>
          <Text style={s.kodeTxt}>{c.kode || c.code || "COMP6923051"}</Text>
        </View>

        <TouchableOpacity
          onPress={(e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            if (onSimpan) onSimpan(c.id);
          }}
          activeOpacity={0.8}
          style={[s.btnSimpan, c.tersimpan && s.btnSimpanAktif]}
        >
          <Icon
            name="bookmark"
            size={14}
            color={c.tersimpan ? "#ffffff" : "#78716c"}
          />
          <Text style={[s.btnSimpanTxt, c.tersimpan && s.btnSimpanTxtAktif]}>
            {c.tersimpan ? "Tersimpan" : "Simpan"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 3.5,
    borderBottomColor: '#d6d3d1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeKat: {
    backgroundColor: '#e8f3ee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeTxt: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1f654d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeSks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fffbeb',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  sksTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: '#b45309',
  },
  judul: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1c1917',
    lineHeight: 20,
    marginBottom: 8,
  },
  dosenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dosenAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#f5f0e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dosenAvatarTxt: {
    fontSize: 9,
    fontWeight: '800',
    color: '#78716c',
  },
  dosen: {
    fontSize: 12,
    color: '#78716c',
    fontWeight: '500',
  },
  progressSection: {
    marginBottom: 12,
    backgroundColor: '#faf7f2',
    padding: 8,
    borderRadius: 10,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLbl: {
    fontSize: 10,
    color: '#78716c',
    fontWeight: '600',
  },
  progressVal: {
    fontSize: 10,
    color: '#1f654d',
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 5,
    backgroundColor: '#e7e5e4',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#1f654d',
    borderRadius: 5,
  },
  botRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f5f0e8',
    paddingTop: 10,
  },
  kodeChip: {
    backgroundColor: '#f5f0e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  kodeTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: '#57534e',
    letterSpacing: 0.2,
  },
  btnSimpan: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
  },
  btnSimpanAktif: {
    backgroundColor: '#1f654d',
    borderColor: '#1f654d',
  },
  btnSimpanTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: '#78716c',
  },
  btnSimpanTxtAktif: {
    color: '#ffffff',
  },
});
