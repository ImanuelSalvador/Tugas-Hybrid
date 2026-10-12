import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import InputField from '../components/InputField';
import Logo from '../components/Logo';
import Icon from '../components/Icon';

export default function Login({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [u, setU] = useState("student");
  const [p, setP] = useState("12345");
  const [nama, setNama] = useState("Djie, Fernando S.V.W");
  const [nim, setNim] = useState("2802458592");
  const [email, setEmail] = useState("djie.wijaya@binus.ac.id");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  function submitAuth() {
    setErr("");
    if (mode === "login") {
      if (!u.trim() || !p.trim()) {
        setErr("NIM dan kata sandi wajib diisi!");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const valU = u.trim().toLowerCase();
        if ((valU === "student" || valU === "fernando" || valU === "2802458592") && p === "12345") {
          setLoading(false);
          if (onLoginSuccess) {
            onLoginSuccess({
              name: "Djie, Fernando S.V.W",
              studentId: "2802458592",
              username: u,
              email: "djie.wijaya@binus.ac.id",
              avatarUrl: "/assets/avatar.png"
            }, "home");
          }
        } else {
          setLoading(false);
          setErr("Kredensial tidak cocok (coba akun demo: student / 12345)");
        }
      }, 400);
    } else {
      if (!nama.trim() || !nim.trim() || !email.trim() || !p.trim()) {
        setErr("Seluruh data formulir wajib dilengkapi!");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess({
            name: nama,
            studentId: nim,
            username: nim,
            email: email,
            avatarUrl: "/assets/avatar.png"
          }, "home");
        }
      }, 400);
    }
  }

  function masukKuisCepat() {
    if (onLoginSuccess) {
      onLoginSuccess({
        name: "Djie, Fernando S.V.W",
        studentId: "2802458592",
        username: "student",
        email: "djie.wijaya@binus.ac.id",
        avatarUrl: "/assets/avatar.png"
      }, "quiz");
    }
  }

  function isiOtomatisDemo() {
    if (mode === "login") {
      setU("student");
      setP("12345");
      setErr("");
    } else {
      setNama("Djie, Fernando S.V.W");
      setNim("2802458592");
      setEmail("djie.wijaya@binus.ac.id");
      setP("12345");
      setErr("");
    }
  }

  return (
    <View style={s.container}>
      <View style={s.card}>
        <View style={s.logoWrap}>
          <Logo size="md" />
        </View>

        <View style={s.welcomeWrap}>
          <Text style={s.welcomeTitle}>
            {mode === "login" ? "Selamat Datang Kembali" : "Pendaftaran Akun Baru"}
          </Text>
          <Text style={s.welcomeSub}>
            {mode === "login" 
              ? "Masuk untuk mengakses materi perkuliahan & kuis" 
              : "Lengkapi data mahasiswa untuk membuat sesi baru"}
          </Text>
        </View>

        <View style={s.tabWrap}>
          <TouchableOpacity
            onPress={() => { setMode("login"); setErr(""); }}
            style={[s.tabBtn, mode === "login" && s.tabBtnActive]}
          >
            <Text style={[s.tabTxt, mode === "login" && s.tabTxtActive]}>Masuk (Login)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setMode("register"); setErr(""); }}
            style={[s.tabBtn, mode === "register" && s.tabBtnActive]}
          >
            <Text style={[s.tabTxt, mode === "register" && s.tabTxtActive]}>Daftar Akun</Text>
          </TouchableOpacity>
        </View>

        {err ? (
          <View style={s.errAlert}>
            <Icon name="close" size={14} color="#b91c1c" />
            <Text style={s.errAlertTxt}>{err}</Text>
          </View>
        ) : null}

        {mode === "login" ? (
          <View>
            <InputField
              label="NIM atau Username Mahasiswa"
              val={u}
              onChangeText={(txt) => { setU(txt); if (err) setErr(""); }}
              placeholder="Contoh: student atau 2802458592"
              iconName="id"
            />
            <InputField
              label="Kata Sandi Akun"
              val={p}
              onChangeText={(txt) => { setP(txt); if (err) setErr(""); }}
              placeholder="Masukkan kata sandi akun"
              secureTextEntry={!show}
              iconName="lock"
              rightBtn={
                <TouchableOpacity onPress={() => setShow(!show)} style={s.showBtn}>
                  <Text style={s.showTxt}>{show ? "Sembunyikan" : "Tampilkan"}</Text>
                </TouchableOpacity>
              }
            />
          </View>
        ) : (
          <View>
            <InputField
              label="Nama Lengkap Mahasiswa"
              val={nama}
              onChangeText={setNama}
              placeholder="Contoh: Djie, Fernando S.V.W"
              iconName="edit"
            />
            <InputField
              label="Nomor Induk Mahasiswa (NIM)"
              val={nim}
              onChangeText={setNim}
              placeholder="10 Digit NIM BINUS"
              iconName="id"
            />
            <InputField
              label="Alamat Email BINUS"
              val={email}
              onChangeText={setEmail}
              placeholder="nama@binus.ac.id"
              iconName="mail"
            />
            <InputField
              label="Buat Kata Sandi"
              val={p}
              onChangeText={setP}
              placeholder="Minimal 5 karakter aman"
              secureTextEntry={!show}
              iconName="lock"
              rightBtn={
                <TouchableOpacity onPress={() => setShow(!show)} style={s.showBtn}>
                  <Text style={s.showTxt}>{show ? "Sembunyikan" : "Tampilkan"}</Text>
                </TouchableOpacity>
              }
            />
          </View>
        )}

        <TouchableOpacity
          onPress={submitAuth}
          disabled={loading}
          activeOpacity={0.88}
          style={[s.btnSubmit, loading && { opacity: 0.75 }]}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <View style={s.btnContentRow}>
              <Text style={s.btnSubmitTxt}>
                {mode === "login" ? "Masuk ke Beranda" : "Daftarkan Akun"}
              </Text>
              <Icon name="arrowRight" size={16} color="#ffffff" />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={masukKuisCepat}
          activeOpacity={0.85}
          style={s.btnKuisLangsung}
        >
          <Icon name="quiz" size={16} color="#1f654d" />
          <Text style={s.btnKuisLangsungTxt}>
            ⚡ Buka & Kerjakan Kuis UTS Langsung (Akses Cepat)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={isiOtomatisDemo} activeOpacity={0.8} style={s.demoCard}>
          <View style={s.demoBadge}>
            <Text style={s.demoBadgeTxt}>DEMO CEPAT</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.demoTitle}>
              {mode === "login" ? "Gunakan Akun Mahasiswa Demo" : "Isi Formulir Pendaftaran Demo"}
            </Text>
            <Text style={s.demoSub}>
              {mode === "login" ? "User: student | Sandi: 12345" : "NIM: 2802458592 | Email BINUS"}
            </Text>
          </View>
          <Icon name="arrowRight" size={16} color="#b45309" />
        </TouchableOpacity>

        <View style={s.infoFoot}>
          <Text style={s.infoFootTxt}>Djie, Fernando S.V.W (NIM: 2802458592)</Text>
          <Text style={s.infoFootSub}>Kelas LA95 • Hybrid App Development COMP6923051</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100vh',
    backgroundColor: '#faf7f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 4,
    borderBottomColor: '#d6d3d1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 11,
    color: '#78716c',
    textAlign: 'center',
    lineHeight: 16,
  },
  tabWrap: {
    flexDirection: 'row',
    backgroundColor: '#f5f0e8',
    borderRadius: 14,
    padding: 4,
    marginBottom: 18,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tabTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716c',
  },
  tabTxtActive: {
    color: '#1f654d',
    fontWeight: '800',
  },
  errAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fca5a5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 14,
  },
  errAlertTxt: {
    fontSize: 11,
    color: '#b91c1c',
    fontWeight: '600',
    flex: 1,
  },
  showBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  showTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1f654d',
  },
  btnSubmit: {
    backgroundColor: '#1f654d',
    borderBottomWidth: 3,
    borderBottomColor: '#164e3b',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  btnContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnSubmitTxt: {
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
  },
  btnKuisLangsung: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#e8f3ee',
    borderWidth: 1.5,
    borderColor: '#a7f3d0',
    borderRadius: 14,
    paddingVertical: 11,
    marginBottom: 14,
  },
  btnKuisLangsungTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1f654d',
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#fde68a',
    gap: 10,
    marginBottom: 16,
  },
  demoBadge: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  demoBadgeTxt: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.4,
  },
  demoTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400e',
  },
  demoSub: {
    fontSize: 10,
    color: '#b45309',
    marginTop: 1,
  },
  infoFoot: {
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f5f0e8',
  },
  infoFootTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: '#78716c',
  },
  infoFootSub: {
    fontSize: 10,
    color: '#a8a29e',
    marginTop: 2,
  },
});
