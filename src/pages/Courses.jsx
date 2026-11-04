import { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CourseCard from '../components/CourseCard';
import ModalDialog from '../components/ModalDialog';
import Icon from '../components/Icon';
import { COURSES_DATABASE, CATEGORIES_CATALOG } from '../data/coursesData';

/**
 * Course catalog and syllabus inspector screen.
 * Implements declarative search filter and detailed interactive RPS modal dialog.
 * Styled using Google Stitch Design System tokens (LangEase Organic Play).
 * 
 * @author AI Assistant Collaboration
 */
export default function Courses({ onNavigate, courseAwal }) {
  const [coursesCollection, setCoursesCollection] = useState(COURSES_DATABASE);
  const [searchTermQuery, setSearchTermQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("Semua");
  const [activeCourseDetailRecord, setActiveCourseDetailRecord] = useState(courseAwal || null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(Boolean(courseAwal));
  const [checkedWeeksMap, setCheckedWeeksMap] = useState({ 1: true, 2: true, 3: true, 4: true });
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  const memoizedFilteredCourseList = useMemo(() => {
    return coursesCollection.filter((record) => {
      const q = searchTermQuery.toLowerCase();
      const matchesSearch = (record.title || "").toLowerCase().includes(q) ||
                            (record.judul || "").toLowerCase().includes(q) ||
                            (record.dosen || "").toLowerCase().includes(q) ||
                            (record.code || "").toLowerCase().includes(q) ||
                            (record.kode || "").toLowerCase().includes(q);
      const categoryValue = record.category || record.kategori || "";
      const matchesCategory = selectedCategoryFilter === "Semua" || 
                              categoryValue.toLowerCase() === selectedCategoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [coursesCollection, searchTermQuery, selectedCategoryFilter]);

  function handleSelectCourseItem(courseRecord) {
    setActiveCourseDetailRecord(courseRecord);
    setIsDetailModalVisible(true);
    setDownloadSuccessToast(false);
  }

  function handleToggleBookmark(targetId) {
    setCoursesCollection((prev) =>
      prev.map((c) => (c.id === targetId ? { ...c, tersimpan: !c.tersimpan } : c))
    );
  }

  function handleToggleWeekCheck(weekNum) {
    setCheckedWeeksMap((prev) => ({
      ...prev,
      [weekNum]: !prev[weekNum]
    }));
  }

  function handleTriggerDownload() {
    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 3000);
  }

  return (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Katalog & Silabus Perkuliahan</Text>
        <Text style={styles.screenSubtitle}>Rencana Pembelajaran Semester (RPS) Program Studi Teknik Informatika</Text>
      </View>

      <View style={styles.searchBar}>
        <Icon name="search" size={18} color="#78716c" />
        <TextInput
          value={searchTermQuery}
          onChangeText={setSearchTermQuery}
          placeholder="Cari kode mata kuliah, topik, atau nama dosen..."
          placeholderTextColor="#a8a29e"
          style={styles.searchInputField}
        />
        {searchTermQuery ? (
          <TouchableOpacity onPress={() => setSearchTermQuery("")} style={{ padding: 4 }}>
            <Icon name="close" size={14} color="#78716c" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={{ marginBottom: 16 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 8 }}>
          {["Semua", "Pemrograman", "Desain", "Basis Data", "Jaringan"].map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategoryFilter(cat)}
              activeOpacity={0.8}
              style={[
                styles.categoryChip,
                selectedCategoryFilter === cat && styles.categoryChipActive
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategoryFilter === cat && styles.categoryChipTextActive
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.catalogListWrapper}>
        {memoizedFilteredCourseList.map((item) => (
          <CourseCard
            key={item.id}
            c={item}
            onPilih={handleSelectCourseItem}
            onSimpan={handleToggleBookmark}
          />
        ))}
      </View>

      {/* Modal Dialog Component for Syllabus & RPS Inspection */}
      <ModalDialog
        isOpen={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
        title={activeCourseDetailRecord ? `${activeCourseDetailRecord.code || activeCourseDetailRecord.kode} • ${activeCourseDetailRecord.title || activeCourseDetailRecord.judul}` : "Detail Silabus"}
        footer={
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              onPress={() => setIsDetailModalVisible(false)}
              activeOpacity={0.8}
              style={styles.modalCancelButton}
            >
              <Text style={styles.modalCancelButtonText}>Tutup Dialog</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsDetailModalVisible(false);
                if (onNavigate) onNavigate("quiz");
              }}
              activeOpacity={0.85}
              style={styles.modalConfirmButton}
            >
              <Text style={styles.modalConfirmButtonText}>Uji Kuis Materi Ini</Text>
              <Icon name="arrowRight" size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>
        }
      >
        {activeCourseDetailRecord && (
          <View>
            <View style={styles.detailMetaGrid}>
              <View style={styles.detailMetaBox}>
                <Text style={styles.detailMetaLabel}>Bobot Perkuliahan</Text>
                <Text style={styles.detailMetaValue}>
                  {typeof activeCourseDetailRecord.sks === 'number' ? `${activeCourseDetailRecord.sks} SKS` : activeCourseDetailRecord.sks} Akademik
                </Text>
              </View>
              <View style={styles.detailMetaBox}>
                <Text style={styles.detailMetaLabel}>Dosen Pengampu</Text>
                <Text style={styles.detailMetaValue}>{activeCourseDetailRecord.dosen}</Text>
              </View>
            </View>

            <Text style={styles.detailSectionHeader}>Deskripsi Mata Kuliah</Text>
            <Text style={styles.detailSectionParagraph}>
              {activeCourseDetailRecord.description || activeCourseDetailRecord.deskripsi}
            </Text>

            <TouchableOpacity
              onPress={handleTriggerDownload}
              activeOpacity={0.8}
              style={styles.downloadSlideButton}
            >
              <Icon name="courses" size={16} color="#1f654d" />
              <Text style={styles.downloadSlideButtonText}>
                {downloadSuccessToast ? "✓ Dokumen RPS Berhasil Diunduh!" : "Unduh Dokumen RPS Lengkap (PDF Demo)"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.detailSectionHeader}>Rencana Pertemuan Mingguan (RPS)</Text>
            <Text style={styles.detailSectionSub}>Klik butir pertemuan untuk menandai materi telah dipelajari:</Text>

            {activeCourseDetailRecord.rps && activeCourseDetailRecord.rps.map((meeting) => {
              const isChecked = Boolean(checkedWeeksMap[meeting.minggu]);
              return (
                <TouchableOpacity
                  key={meeting.minggu}
                  onPress={() => handleToggleWeekCheck(meeting.minggu)}
                  activeOpacity={0.8}
                  style={[styles.rpsRowItem, isChecked && styles.rpsRowItemChecked]}
                >
                  <View style={[styles.rpsWeekBadge, isChecked && styles.rpsWeekBadgeChecked]}>
                    <Text style={[styles.rpsWeekText, isChecked && styles.rpsWeekTextChecked]}>
                      W{meeting.minggu}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.rpsTopicText, isChecked && styles.rpsTopicTextChecked]}>
                      {meeting.topik}
                    </Text>
                    <Text style={styles.rpsOutcomeText}>Capaian: {meeting.capaian}</Text>
                  </View>
                  <View style={[styles.checkCircle, isChecked && styles.checkCircleChecked]}>
                    {isChecked ? (
                      <Icon name="check" size={12} color="#ffffff" />
                    ) : (
                      <Text style={{ fontSize: 9, color: '#a8a29e' }}>—</Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ModalDialog>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#faf7f2',
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1c1917',
  },
  screenSubtitle: {
    fontSize: 11,
    color: '#78716c',
    marginTop: 2,
    lineHeight: 16,
  },
  searchBar: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInputField: {
    flex: 1,
    fontSize: 12,
    color: '#1c1917',
    fontWeight: '600',
    paddingVertical: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
  },
  categoryChipActive: {
    backgroundColor: '#1f654d',
    borderColor: '#1f654d',
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#78716c',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  catalogListWrapper: {
    marginBottom: 20,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716c',
  },
  modalConfirmButton: {
    flex: 1.2,
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#1f654d',
    borderBottomWidth: 3,
    borderBottomColor: '#164e3b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
  detailMetaGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  detailMetaBox: {
    flex: 1,
    backgroundColor: '#f5f0e8',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e7e5e4',
  },
  detailMetaLabel: {
    fontSize: 10,
    color: '#78716c',
    fontWeight: '600',
    marginBottom: 2,
  },
  detailMetaValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
  },
  detailSectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 4,
    marginTop: 6,
  },
  detailSectionSub: {
    fontSize: 10,
    color: '#78716c',
    marginBottom: 10,
  },
  detailSectionParagraph: {
    fontSize: 11,
    lineHeight: 17,
    color: '#57534e',
    marginBottom: 14,
  },
  downloadSlideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#e8f3ee',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#a7f3d0',
    paddingVertical: 10,
    marginBottom: 16,
  },
  downloadSlideButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1f654d',
  },
  rpsRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    marginBottom: 8,
    gap: 10,
  },
  rpsRowItemChecked: {
    borderColor: '#a7f3d0',
    backgroundColor: '#fafaf9',
  },
  rpsWeekBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f5f0e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rpsWeekBadgeChecked: {
    backgroundColor: '#e8f3ee',
  },
  rpsWeekText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#78716c',
  },
  rpsWeekTextChecked: {
    color: '#1f654d',
  },
  rpsTopicText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1c1917',
  },
  rpsTopicTextChecked: {
    color: '#1f654d',
  },
  rpsOutcomeText: {
    fontSize: 9.5,
    color: '#78716c',
    marginTop: 2,
    lineHeight: 13,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#d6d3d1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  checkCircleChecked: {
    backgroundColor: '#1f654d',
    borderColor: '#1f654d',
  },
});
