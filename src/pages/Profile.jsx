import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from '../components/Icon';
import { INITIAL_STUDENT_PROFILE } from '../data/coursesData';

/**
 * Academic student profile and session dossier view.
 * Displays formal academic metrics, Stitch Design System tokens, and account logout trigger.
 * All overview statistics and design tokens are interactive with click feedback.
 * Styled using Google Stitch Design System tokens (LangEase Organic Play).
 * 
 * @author AI Assistant Collaboration
 */
export default function Profile({ user, onLogout, onNavigate }) {
  const [activeMetricDetail, setActiveMetricDetail] = useState(null);
  const [isStitchExpanded, setIsStitchExpanded] = useState(false);

  const profileRecord = {
    ...INITIAL_STUDENT_PROFILE,
    ...(user || {}),
  };

  return (
    <ScrollView style={styles.profileContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>FD</Text>
        </View>
        <Text style={styles.studentNameText}>{profileRecord.name}</Text>
        <Text style={styles.studentNIMText}>NIM: {profileRecord.studentId} • Kelas: {profileRecord.classGroup || "LA95"}</Text>
        <View style={styles.emailPill}>
          <Icon name="mail" size={12} color="#1f654d" />
          <Text style={styles.studentEmailText}>{profileRecord.email}</Text>
        </View>
      </View>

      <View style={styles.statsOverviewGrid}>
        <TouchableOpacity
          onPress={() => setActiveMetricDetail("IPK 3.85: Total 18 SKS A dan 4 SKS A- pada semester berjalan.")}
          activeOpacity={0.8}
          style={[styles.statMetricCard, activeMetricDetail?.includes("IPK") && styles.statMetricCardActive]}
        >
          <Text style={styles.statMetricVal}>3.85</Text>
          <Text style={styles.statMetricLbl}>IPK Kumulatif</Text>
          <Text style={styles.clickHintText}>Tap rincian</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveMetricDetail("SKS Lulus 72: Prasyarat kelulusan sarjana (146 SKS) terpenuhi 49.3%.")}
          activeOpacity={0.8}
          style={[styles.statMetricCard, activeMetricDetail?.includes("SKS") && styles.statMetricCardActive]}
        >
          <Text style={styles.statMetricVal}>72</Text>
          <Text style={styles.statMetricLbl}>SKS Lulus</Text>
          <Text style={styles.clickHintText}>Tap rincian</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveMetricDetail("Semester 4: Tahun Akademik 2026/2027 Ganjil, status mahasiswa aktif penuh.")}
          activeOpacity={0.8}
          style={[styles.statMetricCard, activeMetricDetail?.includes("Semester") && styles.statMetricCardActive]}
        >
          <Text style={styles.statMetricVal}>Sem 4</Text>
          <Text style={styles.statMetricLbl}>Tahun 2026</Text>
          <Text style={styles.clickHintText}>Tap rincian</Text>
        </TouchableOpacity>
      </View>

      {activeMetricDetail ? (
        <View style={styles.metricDetailBanner}>
          <Text style={styles.metricDetailText}>📊 {activeMetricDetail}</Text>
          <TouchableOpacity onPress={() => setActiveMetricDetail(null)} style={{ padding: 2 }}>
            <Icon name="close" size={12} color="#1f654d" />
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.dossierSection}>
        <Text style={styles.sectionHeaderTitle}>Informasi Akademik Resmi Mahasiswa</Text>
        
        <View style={styles.dossierRow}>
          <Text style={styles.dossierLabel}>Program Studi</Text>
          <Text style={styles.dossierValue}>Computer Science (Teknik Informatika)</Text>
        </View>

        <View style={styles.dossierRow}>
          <Text style={styles.dossierLabel}>Mata Kuliah Ujian</Text>
          <Text style={styles.dossierValue}>Hybrid App Dev (COMP6923051)</Text>
        </View>

        <View style={styles.dossierRow}>
          <Text style={styles.dossierLabel}>Kampus Institusi</Text>
          <Text style={styles.dossierValue}>BINUS University Semarang</Text>
        </View>

        <View style={styles.dossierRow}>
          <Text style={styles.dossierLabel}>Dosen Pengampu</Text>
          <Text style={styles.dossierValue}>Anang Prasetyo (D6672)</Text>
        </View>

        <View style={styles.dossierRow}>
          <Text style={styles.dossierLabel}>Status Mahasiswa</Text>
          <View style={styles.activeStatusBadge}>
            <Text style={styles.activeStatusText}>Aktif Perkuliahan</Text>
          </View>
        </View>
      </View>

      {/* Google Stitch Design System Interactive Card */}
      <TouchableOpacity
        onPress={() => setIsStitchExpanded(!isStitchExpanded)}
        activeOpacity={0.88}
        style={styles.stitchCard}
      >
        <View style={styles.stitchHeaderRow}>
          <View style={styles.stitchBadge}>
            <Icon name="star" size={12} color="#f59e0b" />
            <Text style={styles.stitchBadgeText}>GOOGLE STITCH MCP</Text>
          </View>
          <Text style={styles.stitchStatusText}>
            {isStitchExpanded ? "Tutup Detail ▲" : "Tap Rincian Tokens ▼"}
          </Text>
        </View>
        <Text style={styles.stitchTitle}>LangEase Organic Play Design System</Text>
        <Text style={styles.stitchDesc}>
          Antarmuka HappyLearn mengadopsi token desain Google Stitch: Forest Emerald (#1F654D), Golden Honey (#F59E0B), Sunlit Linen (#FAF7F2), serta micro-elevation 3D press sesuai izin resmi dosen pengampu.
        </Text>

        {isStitchExpanded && (
          <View style={styles.tokenSpecBox}>
            <Text style={styles.tokenSpecHeader}>Spesifikasi Token Desain Google Stitch:</Text>
            <Text style={styles.tokenSpecItem}>• Primary: Forest Emerald #1F654D (Depth #164E3B)</Text>
            <Text style={styles.tokenSpecItem}>• Secondary: Golden Honey #F59E0B (Depth #D97706)</Text>
            <Text style={styles.tokenSpecItem}>• Canvas: Sunlit Linen #FAF7F2 & Surface #FFFFFF</Text>
            <Text style={styles.tokenSpecItem}>• Tipografi: Plus Jakarta Sans (Geometry Sans)</Text>
            <Text style={styles.tokenSpecItem}>• Border Radius: 14px - 24px (Modern Rounded)</Text>
            <Text style={styles.tokenSpecItem}>• Status: Dideklarasikan pada AI_DECLARATION_FORM.pdf</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogout} activeOpacity={0.85} style={styles.logoutButton}>
        <Icon name="close" size={14} color="#b91c1c" />
        <Text style={styles.logoutButtonText}>Keluar dari Akun (Logout)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#faf7f2',
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 4,
    borderBottomColor: '#d6d3d1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#1f654d',
    borderBottomWidth: 4,
    borderBottomColor: '#164e3b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#1f654d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarInitials: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  studentNameText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 2,
  },
  studentNIMText: {
    fontSize: 12,
    color: '#78716c',
    marginBottom: 8,
    fontWeight: '600',
  },
  emailPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e8f3ee',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  studentEmailText: {
    fontSize: 11,
    color: '#1f654d',
    fontWeight: '700',
  },
  statsOverviewGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  statMetricCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 3.5,
    borderBottomColor: '#d6d3d1',
  },
  statMetricCardActive: {
    borderColor: '#1f654d',
    backgroundColor: '#e8f3ee',
  },
  statMetricVal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f654d',
  },
  statMetricLbl: {
    fontSize: 10,
    color: '#78716c',
    fontWeight: '600',
    marginTop: 2,
  },
  clickHintText: {
    fontSize: 8,
    color: '#a8a29e',
    marginTop: 4,
    fontWeight: '600',
  },
  metricDetailBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8f3ee',
    borderWidth: 1.5,
    borderColor: '#1f654d',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  metricDetailText: {
    fontSize: 11,
    color: '#1f654d',
    fontWeight: '700',
    flex: 1,
    lineHeight: 16,
  },
  dossierSection: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 4,
    borderBottomColor: '#d6d3d1',
  },
  sectionHeaderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 14,
  },
  dossierRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f0e8',
  },
  dossierLabel: {
    fontSize: 11,
    color: '#78716c',
    fontWeight: '500',
  },
  dossierValue: {
    fontSize: 11,
    color: '#1c1917',
    fontWeight: '700',
  },
  activeStatusBadge: {
    backgroundColor: '#e8f3ee',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  activeStatusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1f654d',
  },
  stitchCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 3.5,
    borderBottomColor: '#d6d3d1',
  },
  stitchHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stitchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fffbeb',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  stitchBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#b45309',
    letterSpacing: 0.5,
  },
  stitchStatusText: {
    fontSize: 10,
    color: '#1f654d',
    fontWeight: '700',
  },
  stitchTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 4,
  },
  stitchDesc: {
    fontSize: 11,
    color: '#78716c',
    lineHeight: 16,
  },
  tokenSpecBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f5f0e8',
    backgroundColor: '#faf7f2',
    padding: 10,
    borderRadius: 10,
    gap: 4,
  },
  tokenSpecHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 4,
  },
  tokenSpecItem: {
    fontSize: 10,
    color: '#57534e',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fef2f2',
    borderWidth: 1.5,
    borderColor: '#fca5a5',
    paddingVertical: 13,
    borderRadius: 16,
    marginBottom: 28,
  },
  logoutButtonText: {
    color: '#b91c1c',
    fontWeight: '800',
    fontSize: 12,
  },
});
