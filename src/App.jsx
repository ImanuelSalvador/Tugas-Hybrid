import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Login from './pages/Login';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import Icon from './components/Icon';

/**
 * Root Application Container and View Router.
 * Configured as a high-fidelity mobile canvas viewport for cross-platform hybrid execution.
 * Styled using Google Stitch Design System tokens (LangEase Organic Play).
 * 
 * @author AI Assistant Collaboration
 */
function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    name: "Djie, Fernando S.V.W",
    studentId: "2802458592",
    username: "student",
    email: "djie.wijaya@binus.ac.id",
    avatarUrl: "/assets/avatar.png"
  });
  const [tabAktif, setTabAktif] = useState("home");
  const [pilihanMatkul, setPilihanMatkul] = useState(null);

  function handleLoginBerhasil(dataUser, targetTab = "home") {
    if (dataUser) setUser(dataUser);
    setIsLogin(true);
    setTabAktif(targetTab || "home");
  }

  function handleLogout() {
    setIsLogin(false);
    setTabAktif("home");
  }

  return (
    <SafeAreaView style={styles.outerViewport}>
      <View style={styles.mobileFrame}>
        {/* Sleek Mobile Device Top Bar */}
        <View style={styles.mobileStatusBar}>
          <Text style={styles.statusTimeText}>09:41</Text>
          <View style={styles.statusIconsRow}>
            <View style={styles.cellularBars}>
              <View style={[styles.bar, { height: 4 }]} />
              <View style={[styles.bar, { height: 6 }]} />
              <View style={[styles.bar, { height: 8 }]} />
              <View style={[styles.bar, { height: 10 }]} />
            </View>
            <Text style={styles.wifiIcon}>5G</Text>
            <View style={styles.batteryPill}>
              <View style={styles.batteryFill} />
            </View>
          </View>
        </View>

        <View style={styles.screenContentArea}>
          {!isLogin ? (
            <Login onLoginSuccess={handleLoginBerhasil} />
          ) : (
            <>
              <View style={styles.pageBody}>
                {tabAktif === "home" && (
                  <Home 
                    user={user} 
                    onNavigate={setTabAktif} 
                    onPilihMatkul={setPilihanMatkul} 
                  />
                )}

                {tabAktif === "courses" && (
                  <Courses 
                    onNavigate={setTabAktif} 
                    courseAwal={pilihanMatkul} 
                  />
                )}

                {tabAktif === "quiz" && (
                  <Quiz onNavigate={setTabAktif} />
                )}

                {tabAktif === "profile" && (
                  <Profile 
                    user={user} 
                    onLogout={handleLogout} 
                    onNavigate={setTabAktif} 
                  />
                )}
              </View>

              {/* High-Fidelity Bottom Tab Navigation Bar */}
              <View style={styles.bottomTabBar}>
                <TouchableOpacity
                  onPress={() => setTabAktif("home")}
                  activeOpacity={0.8}
                  style={styles.tabBarItem}
                >
                  <View style={[styles.tabIconContainer, tabAktif === "home" && styles.tabIconContainerActive]}>
                    <Icon
                      name="home"
                      size={20}
                      color={tabAktif === "home" ? "#1f654d" : "#78716c"}
                    />
                  </View>
                  <Text style={[styles.tabBarLabel, tabAktif === "home" && styles.tabBarLabelActive]}>
                    Beranda
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setTabAktif("courses")}
                  activeOpacity={0.8}
                  style={styles.tabBarItem}
                >
                  <View style={[styles.tabIconContainer, tabAktif === "courses" && styles.tabIconContainerActive]}>
                    <Icon
                      name="courses"
                      size={20}
                      color={tabAktif === "courses" ? "#1f654d" : "#78716c"}
                    />
                  </View>
                  <Text style={[styles.tabBarLabel, tabAktif === "courses" && styles.tabBarLabelActive]}>
                    Silabus
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setTabAktif("quiz")}
                  activeOpacity={0.8}
                  style={styles.tabBarItem}
                >
                  <View style={[styles.tabIconContainer, tabAktif === "quiz" && styles.tabIconContainerActive]}>
                    <Icon
                      name="quiz"
                      size={20}
                      color={tabAktif === "quiz" ? "#1f654d" : "#78716c"}
                    />
                  </View>
                  <Text style={[styles.tabBarLabel, tabAktif === "quiz" && styles.tabBarLabelActive]}>
                    Kuis
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setTabAktif("profile")}
                  activeOpacity={0.8}
                  style={styles.tabBarItem}
                >
                  <View style={[styles.tabIconContainer, tabAktif === "profile" && styles.tabIconContainerActive]}>
                    <Icon
                      name="profile"
                      size={20}
                      color={tabAktif === "profile" ? "#1f654d" : "#78716c"}
                    />
                  </View>
                  <Text style={[styles.tabBarLabel, tabAktif === "profile" && styles.tabBarLabelActive]}>
                    Profil
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerViewport: {
    flex: 1,
    minHeight: '100vh',
    backgroundColor: '#ede8e1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  mobileFrame: {
    width: '100%',
    maxWidth: 430,
    height: 840,
    maxHeight: '96vh',
    backgroundColor: '#ffffff',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#e7e5e4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 28,
    elevation: 8,
    overflow: 'hidden',
  },
  mobileStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#faf7f2',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f0e8',
  },
  statusTimeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
    letterSpacing: -0.2,
  },
  statusIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cellularBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1.5,
    height: 10,
  },
  bar: {
    width: 2.5,
    backgroundColor: '#1c1917',
    borderRadius: 1,
  },
  wifiIcon: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1c1917',
  },
  batteryPill: {
    width: 18,
    height: 9,
    borderRadius: 3,
    borderWidth: 1.2,
    borderColor: '#1c1917',
    padding: 1,
    justifyContent: 'center',
  },
  batteryFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#1c1917',
    borderRadius: 1.5,
  },
  screenContentArea: {
    flex: 1,
    minHeight: 0,
    backgroundColor: '#faf7f2',
  },
  pageBody: {
    flex: 1,
    minHeight: 0,
  },
  bottomTabBar: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#ffffff',
    borderTopWidth: 1.5,
    borderTopColor: '#e7e5e4',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  tabIconContainer: {
    width: 38,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  tabIconContainerActive: {
    backgroundColor: '#e8f3ee',
  },
  tabBarLabel: {
    fontSize: 10,
    color: '#78716c',
    fontWeight: '700',
  },
  tabBarLabelActive: {
    color: '#1f654d',
    fontWeight: '800',
  },
});

export default App;
