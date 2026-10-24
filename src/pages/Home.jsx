import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CourseCard from '../components/CourseCard';
import Icon from '../components/Icon';
import { COURSES_DATABASE } from '../data/coursesData';

export default function Home({ user, onNavigate, onPilihMatkul }) {
  const [courses, setCourses] = useState(COURSES_DATABASE);
  const [q, setQ] = useState("");
  const [kat, setKat] = useState("Semua");
  const [notif, setNotif] = useState(false);
  const [pesan, setPesan] = useState("");

  function toggleSimpan(id) {
    setCourses(courses.map(c => c.id === id ? { ...c, tersimpan: !c.tersimpan } : c));
  }

  function handlePilih(item) {
    if (onPilihMatkul) onPilihMatkul(item);
    if (onNavigate) onNavigate("courses");
  }

  const listFiltered = courses.filter(item => {
    const qLower = q.toLowerCase();
    const qCocok = (item.title || item.judul || "").toLowerCase().includes(qLower) || 
                   (item.dosen || "").toLowerCase().includes(qLower) ||
                   (item.code || item.kode || "").toLowerCase().includes(qLower);
    const katVal = item.category || item.kategori || "";
    const kCocok = kat === "Semua" || true;
    return qCocok && kCocok;
  });

  const matkulUtama = courses[0];

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      <View style={s.appBar}>
        <TouchableOpacity
          onPress={() => onNavigate && onNavigate("profile")}
          activeOpacity={0.8}
          style={s.userRow}
        >
          <View style={s.avatarWrap}>
            <View style={s.avatarBox}>
              <Text style={s.avatarTxt}>FD</Text>
            </View>
            <View style={s.onlineDot} />
          </View>
          <View>
            <Text style={s.salamTxt}>Halo, {user?.name?.split(",")[0] || "Fernando"}</Text>
            <Text style={s.nimTxt}>NIM: {user?.studentId || "2802458592"} • Kelas LA95</Text>
          </View>
        </TouchableOpacity>

        <View style={s.topActionsRow}>
          <TouchableOpacity
            onPress={() => onNavigate && onNavigate("quiz")}
            activeOpacity={0.8}
            style={s.quizTopBtn}
          >
            <Icon name="quiz" size={15} color="#1f654d" />
            <Text style={s.quizTopBtnTxt}>Kuis UTS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setNotif(!notif)}
            style={[s.bellBtn, notif && s.bellBtnActive]}
            activeOpacity={0.75}
          >
            <Icon name="bell" size={18} color={notif ? "#1f654d" : "#1c1917"} />
            {!notif && <View style={s.bellDot} />}
          </TouchableOpacity>
        </View>
      </View>

      {notif ? (
        <View style={s.notifCard}>
          <View style={s.notifHeader}>
            <View style={s.notifBadge}>
              <Text style={s.notifBadgeTxt}>NOTIFIKASI AKADEMIK</Text>
            </View>
            <TouchableOpacity onPress={() => setNotif(false)} style={s.notifClose}>
              <Icon name="close" size={14} color="#78716c" />
            </TouchableOpacity>
          </View>
          <Text style={s.notifTitle}>Jadwal Ujian Tengah Semester (UTS) Aktif</Text>
          <Text style={s.notifSub}>
            Mata kuliah Hybrid App Dev COMP6923051 sedang berlangsung. Silabus RPS dan 5 butir kuis interaktif siap diuji.
          </Text>
        </View>
      ) : null}

      {pesan ? (
        <View style={s.toastAlert}>
          <Text style={s.toastTxt}>{pesan}</Text>
          <TouchableOpacity onPress={() => setPesan("")}>
            <Icon name="close" size={12} color="#1f654d" />
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={s.searchBox}>
        <Icon name="search" size={18} color="#78716c" />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Cari mata kuliah, topik silabus, atau dosen..."
          placeholderTextColor="#a8a29e"
          style={s.searchInput}
        />
        {q ? (
          <TouchableOpacity onPress={() => setQ("")} style={s.clearBtn}>
            <Icon name="close" size={14} color="#78716c" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={s.statGrid}>
        <TouchableOpacity
          onPress={() => onNavigate && onNavigate("courses")}
          activeOpacity={0.8}
          style={s.statCard}
        >
          <View style={s.statTopRow}>
            <Icon name="courses" size={16} color="#1f654d" />
            <Text style={s.statVal}>4</Text>
          </View>
          <Text style={s.statLbl}>Matkul Aktif</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPesan("1 Mata Kuliah Prasyarat telah diselesaikan dengan predikat A (Bobot 4 SKS).")}
          activeOpacity={0.8}
          style={s.statCard}
        >
          <View style={s.statTopRow}>
            <Icon name="check" size={16} color="#1f654d" />
            <Text style={s.statVal}>1</Text>
          </View>
          <Text style={s.statLbl}>Kuliah Selesai</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate && onNavigate("profile")}
          activeOpacity={0.8}
          style={s.statCard}
        >
          <View style={s.statTopRow}>
            <Icon name="star" size={16} color="#f59e0b" />
            <Text style={s.statVal}>3.85</Text>
          </View>
          <Text style={s.statLbl}>IPK Rata-Rata</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => handlePilih(matkulUtama)}
        activeOpacity={0.9}
        style={s.featuredCard}
      >
        <View style={s.featuredHeaderRow}>
          <View style={s.featuredBadge}>
            <Icon name="star" size={12} color="#f59e0b" />
            <Text style={s.featuredBadgeTxt}>MATKUL UTS UTAMA</Text>
          </View>
          <Text style={s.featuredSks}>
            {typeof matkulUtama.sks === 'number' ? `${matkulUtama.sks} SKS` : matkulUtama.sks}
          </Text>
        </View>

        <Text style={s.featuredTitle}>{matkulUtama.title || matkulUtama.judul}</Text>
        <Text style={s.featuredDesc}>{matkulUtama.subtitle}</Text>

        <View style={s.featuredProgressBox}>
          <View style={s.featuredProgressRow}>
            <Text style={s.featuredProgressLbl}>Progres Pembelajaran Semester</Text>
            <Text style={s.featuredProgressVal}>50% Selesai</Text>
          </View>
          <View style={s.featuredTrack}>
            <View style={s.featuredFill} />
          </View>
        </View>

        <View style={s.featuredFoot}>
          <View style={s.featuredDosenRow}>
            <Icon name="cap" size={14} color="#e8f3ee" />
            <Text style={s.featuredDosen}>{matkulUtama.dosen}</Text>
          </View>
          
          <View style={s.featuredBtn}>
            <Text style={s.featuredBtnTxt}>Buka Silabus RPS</Text>
            <Icon name="arrowRight" size={14} color="#ffffff" />
          </View>
        </View>
      </TouchableOpacity>

      <View style={s.katSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.katList}>
          {["Semua", "Pemrograman", "Desain", "Basis Data", "Jaringan"].map(k => (
            <TouchableOpacity
              key={k}
              onPress={() => setKat(k)}
              activeOpacity={0.8}
              style={[s.katChip, kat === k && s.katChipActive]}
            >
              <Text style={[s.katChipTxt, kat === k && s.katChipTxtActive]}>{k}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={s.secHeader}>
        <View style={s.secHeaderLeft}>
          <Text style={s.secTitle}>Daftar Perkuliahan</Text>
          <View style={s.countBadge}>
            <Text style={s.countBadgeTxt}>{listFiltered.length}</Text>
          </View>
        </View>
        <Text style={s.secSub}>Semester 4 Ganjil</Text>
      </View>

      <View style={s.courseListWrap}>
        {listFiltered.map(c => (
          <CourseCard
            key={c.id}
            c={c}
            onPilih={handlePilih}
            onSimpan={toggleSimpan}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => onNavigate && onNavigate("quiz")}
        activeOpacity={0.88}
        style={s.bannerQuiz}
      >
        <View style={s.bannerQuizIconWrap}>
          <Icon name="quiz" size={24} color="#1f654d" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.bannerQuizTitle}>Uji Pemahaman Kuis</Text>
          <Text style={s.bannerQuizSub}>5 Soal Formatif • Batas Waktu 300 Detik</Text>
        </View>
        <View style={s.bannerQuizBtn}>
          <Text style={s.bannerQuizBtnTxt}>Mulai Kuis</Text>
          <Icon name="arrowRight" size={12} color="#ffffff" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf7f2',
    padding: 16,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatarBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1f654d',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  avatarTxt: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  salamTxt: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
  },
  nimTxt: {
    fontSize: 10,
    color: '#78716c',
    marginTop: 1,
    fontWeight: '600',
  },
  topActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quizTopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#e8f3ee',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#a7f3d0',
  },
  quizTopBtnTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1f654d',
  },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bellBtnActive: {
    borderColor: '#1f654d',
    backgroundColor: '#e8f3ee',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#ef4444',
  },
  notifCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#1f654d',
    marginBottom: 14,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  notifBadge: {
    backgroundColor: '#e8f3ee',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  notifBadgeTxt: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1f654d',
    letterSpacing: 0.5,
  },
  notifClose: {
    padding: 2,
  },
  notifTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 4,
  },
  notifSub: {
    fontSize: 11,
    color: '#57534e',
    lineHeight: 16,
  },
  toastAlert: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8f3ee',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    marginBottom: 12,
  },
  toastTxt: {
    fontSize: 11,
    color: '#1f654d',
    fontWeight: '600',
    flex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 14,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#1c1917',
    fontWeight: '600',
    paddingVertical: 8,
  },
  clearBtn: {
    padding: 4,
  },
  statGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 3.5,
    borderBottomColor: '#d6d3d1',
  },
  statTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1c1917',
  },
  statLbl: {
    fontSize: 10,
    fontWeight: '700',
    color: '#78716c',
  },
  featuredCard: {
    backgroundColor: '#1f654d',
    borderRadius: 22,
    padding: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#164e3b',
    marginBottom: 18,
  },
  featuredHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#164e3b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredBadgeTxt: {
    fontSize: 10,
    fontWeight: '800',
    color: '#f59e0b',
    letterSpacing: 0.5,
  },
  featuredSks: {
    fontSize: 11,
    fontWeight: '800',
    color: '#a7f3d0',
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  featuredDesc: {
    fontSize: 11,
    color: '#e8f3ee',
    lineHeight: 16,
    marginBottom: 14,
  },
  featuredProgressBox: {
    backgroundColor: '#164e3b',
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
  },
  featuredProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  featuredProgressLbl: {
    fontSize: 10,
    color: '#a7f3d0',
    fontWeight: '600',
  },
  featuredProgressVal: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '800',
  },
  featuredTrack: {
    height: 6,
    backgroundColor: '#0f382a',
    borderRadius: 6,
    overflow: 'hidden',
  },
  featuredFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 6,
  },
  featuredFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredDosenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredDosen: {
    fontSize: 11,
    color: '#e8f3ee',
    fontWeight: '600',
  },
  featuredBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#d97706',
  },
  featuredBtnTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  katSection: {
    marginBottom: 16,
  },
  katList: {
    flexDirection: 'row',
    gap: 8,
  },
  katChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
  },
  katChipActive: {
    backgroundColor: '#1f654d',
    borderColor: '#1f654d',
  },
  katChipTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: '#78716c',
  },
  katChipTxtActive: {
    color: '#ffffff',
  },
  secHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  secHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  secTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
  },
  countBadge: {
    backgroundColor: '#e8f3ee',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  countBadgeTxt: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1f654d',
  },
  secSub: {
    fontSize: 10,
    color: '#78716c',
    fontWeight: '600',
  },
  courseListWrap: {
    marginBottom: 16,
  },
  bannerQuiz: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 3.5,
    borderBottomColor: '#d6d3d1',
    gap: 12,
    marginBottom: 24,
  },
  bannerQuizIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#e8f3ee',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#a7f3d0',
  },
  bannerQuizTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1c1917',
  },
  bannerQuizSub: {
    fontSize: 10,
    color: '#78716c',
    marginTop: 2,
    fontWeight: '500',
  },
  bannerQuizBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1f654d',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#164e3b',
  },
  bannerQuizBtnTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
});
