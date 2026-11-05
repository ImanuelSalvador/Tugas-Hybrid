import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from '../components/Icon';
import { QUIZ_QUESTION_BANK } from '../data/coursesData';

/**
 * Formative self-evaluation interactive quiz screen with 300s countdown timer.
 * Implements React Hooks useEffect interval, interactive option selection, question jumper, and automated score calculation.
 * Styled using Google Stitch Design System tokens (LangEase Organic Play).
 * 
 * @author AI Assistant Collaboration
 */
export default function Quiz({ onNavigate }) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswersMap, setSelectedAnswersMap] = useState({});
  const [remainingTimerSeconds, setRemainingTimerSeconds] = useState(300);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [expandedExplanationMap, setExpandedExplanationMap] = useState({});

  useEffect(() => {
    if (isQuizSubmitted || remainingTimerSeconds <= 0) return;
    const intervalTimerId = setInterval(() => {
      setRemainingTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalTimerId);
          setIsQuizSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalTimerId);
  }, [isQuizSubmitted, remainingTimerSeconds]);

  function handleSelectOption(optionIndex) {
    if (isQuizSubmitted) return;
    setSelectedAnswersMap((prev) => ({
      ...prev,
      [activeQuestionIndex]: optionIndex,
    }));
  }

  function handleCalculateScore() {
    let correctTotal = 0;
    QUIZ_QUESTION_BANK.forEach((q, idx) => {
      const userAnswer = selectedAnswersMap[idx];
      const isCorrect = (
        userAnswer === q.correctIndex ||
        userAnswer === q.correctAnswerKey ||
        (typeof userAnswer === 'number' && String.fromCharCode(65 + userAnswer) === q.correctAnswerKey)
      );
      if (isCorrect) {
        correctTotal += 1;
      }
    });
    const percentage = Math.round((correctTotal / QUIZ_QUESTION_BANK.length) * 100);
    return { correctTotal, percentage };
  }

  function handleRestartQuiz() {
    setSelectedAnswersMap({});
    setActiveQuestionIndex(0);
    setRemainingTimerSeconds(300);
    setIsQuizSubmitted(false);
    setExpandedExplanationMap({});
  }

  function handleAutoFillDemo() {
    const demoAnswers = {};
    QUIZ_QUESTION_BANK.forEach((q, idx) => {
      demoAnswers[idx] = q.correctIndex !== undefined ? q.correctIndex : 0;
    });
    setSelectedAnswersMap(demoAnswers);
  }

  function handleResetAnswers() {
    setSelectedAnswersMap({});
  }

  function handleToggleExplanation(idx) {
    setExpandedExplanationMap((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  }

  const formatTimerDisplay = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestionItem = QUIZ_QUESTION_BANK[activeQuestionIndex] || QUIZ_QUESTION_BANK[0];
  const { correctTotal, percentage } = handleCalculateScore();
  const totalAnsweredCount = Object.keys(selectedAnswersMap).length;

  const getOptionDisplayText = (opt, oIdx) => {
    if (typeof opt === 'string') return opt;
    if (opt && typeof opt === 'object') return opt.text || opt.label || '';
    return `Pilihan ${String.fromCharCode(65 + oIdx)}`;
  };

  const getOptionKeyText = (opt, oIdx) => {
    if (opt && typeof opt === 'object' && opt.key) return opt.key;
    return String.fromCharCode(65 + oIdx);
  };

  const getFormattedAnswerLabel = (q, choiceIdx) => {
    if (choiceIdx === undefined || choiceIdx === null) return "Belum Dijawab";
    const index = typeof choiceIdx === 'number' ? choiceIdx : choiceIdx.charCodeAt(0) - 65;
    const opt = q.options[index];
    if (!opt) return "Belum Dijawab";
    const key = getOptionKeyText(opt, index);
    const text = getOptionDisplayText(opt, index);
    return `${key}. ${text}`;
  };

  return (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      {/* Quiz Screen Header */}
      <View style={styles.headerBar}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.headerTitle}>Kuis Formatif Mandiri</Text>
          <Text style={styles.headerSubtitle}>COMP6923051 • Hybrid Application Development</Text>
        </View>
        <View style={[styles.timerBadge, remainingTimerSeconds < 60 && styles.timerBadgeWarning]}>
          <Icon 
            name="timer" 
            size={16} 
            color={remainingTimerSeconds < 60 ? "#ef4444" : "#1f654d"} 
          />
          <Text style={[styles.timerText, remainingTimerSeconds < 60 && styles.timerTextWarning]}>
            {formatTimerDisplay(remainingTimerSeconds)}
          </Text>
        </View>
      </View>

      {!isQuizSubmitted ? (
        <View>
          {/* Question Fast Jumper Navigation Bar */}
          <View style={styles.jumperWrapper}>
            <View style={styles.jumperHeaderRow}>
              <Text style={styles.jumperTitle}>Navigasi Butir Pertanyaan:</Text>
              <Text style={styles.jumperHint}>Tap angka untuk melompat</Text>
            </View>
            <View style={styles.jumperPillsRow}>
              {QUIZ_QUESTION_BANK.map((_, qIdx) => {
                const isCurrent = activeQuestionIndex === qIdx;
                const isAnswered = selectedAnswersMap[qIdx] !== undefined;
                return (
                  <TouchableOpacity
                    key={qIdx}
                    onPress={() => setActiveQuestionIndex(qIdx)}
                    activeOpacity={0.8}
                    style={[
                      styles.jumperPill,
                      isCurrent && styles.jumperPillActive,
                      !isCurrent && isAnswered && styles.jumperPillAnswered
                    ]}
                  >
                    <Text
                      style={[
                        styles.jumperPillText,
                        isCurrent && styles.jumperPillTextActive,
                        !isCurrent && isAnswered && styles.jumperPillTextAnswered
                      ]}
                    >
                      {qIdx + 1}
                    </Text>
                    {isAnswered && !isCurrent && (
                      <View style={styles.jumperCheckDot} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Question Progress Tracker */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressText}>
                Butir Soal {activeQuestionIndex + 1} dari {QUIZ_QUESTION_BANK.length}
              </Text>
              <Text style={styles.progressCountBadge}>
                {totalAnsweredCount}/{QUIZ_QUESTION_BANK.length} Terjawab
              </Text>
            </View>
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${((activeQuestionIndex + 1) / QUIZ_QUESTION_BANK.length) * 100}%` }
                ]}
              />
            </View>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <View style={styles.competencyTag}>
              <Icon name="star" size={11} color="#1f654d" />
              <Text style={styles.competencyTagText}>
                {currentQuestionItem.lo || currentQuestionItem.topicTag || "Capaian Pembelajaran"}
              </Text>
            </View>
            
            <Text style={styles.questionPromptText}>
              {currentQuestionItem.question || currentQuestionItem.questionText}
            </Text>

            <View style={styles.optionsWrapper}>
              {currentQuestionItem.options.map((opt, oIdx) => {
                const isSelected = selectedAnswersMap[activeQuestionIndex] === oIdx;
                const optKey = getOptionKeyText(opt, oIdx);
                const optText = getOptionDisplayText(opt, oIdx);

                return (
                  <TouchableOpacity
                    key={oIdx}
                    onPress={() => handleSelectOption(oIdx)}
                    activeOpacity={0.85}
                    style={[
                      styles.optionItem,
                      isSelected && styles.optionItemSelected
                    ]}
                  >
                    <View style={[styles.optionKeyCircle, isSelected && styles.optionKeyCircleSelected]}>
                      <Text style={[styles.optionKeyText, isSelected && styles.optionKeyTextSelected]}>
                        {optKey}
                      </Text>
                    </View>
                    <Text style={[styles.optionContentText, isSelected && styles.optionContentTextSelected]}>
                      {optText}
                    </Text>
                    {isSelected && (
                      <View style={styles.optionCheckBadge}>
                        <Icon name="check" size={13} color="#ffffff" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Fast Demo Tools */}
          <View style={styles.demoToolsRow}>
            <TouchableOpacity
              onPress={handleAutoFillDemo}
              activeOpacity={0.8}
              style={styles.autoFillDemoButton}
            >
              <Text style={styles.autoFillDemoText}>Isi Cepat Seluruh Jawaban Demo (100% Benar)</Text>
            </TouchableOpacity>

            {totalAnsweredCount > 0 && (
              <TouchableOpacity
                onPress={handleResetAnswers}
                activeOpacity={0.8}
                style={styles.resetAnswersButton}
              >
                <Icon name="refresh" size={13} color="#78716c" />
                <Text style={styles.resetAnswersText}>Kosongkan</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Bottom Step Actions */}
          <View style={styles.actionButtonGroup}>
            <TouchableOpacity
              onPress={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeQuestionIndex === 0}
              activeOpacity={0.8}
              style={[styles.navigationButton, activeQuestionIndex === 0 && styles.buttonDisabled]}
            >
              <Icon name="arrowLeft" size={14} color="#78716c" />
              <Text style={styles.navigationButtonText}>Sebelumnya</Text>
            </TouchableOpacity>

            {activeQuestionIndex < QUIZ_QUESTION_BANK.length - 1 ? (
              <TouchableOpacity
                onPress={() => setActiveQuestionIndex((prev) => Math.min(QUIZ_QUESTION_BANK.length - 1, prev + 1))}
                activeOpacity={0.85}
                style={styles.primaryActionButton}
              >
                <Text style={styles.primaryActionButtonText}>Berikutnya</Text>
                <Icon name="arrowRight" size={14} color="#ffffff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setIsQuizSubmitted(true)}
                activeOpacity={0.85}
                style={styles.submitActionButton}
              >
                <Text style={styles.submitActionButtonText}>Selesai & Kumpulkan</Text>
                <Icon name="check" size={14} color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>

          {/* Shortcut Submit If Answers Available */}
          {activeQuestionIndex < QUIZ_QUESTION_BANK.length - 1 && totalAnsweredCount >= 1 && (
            <TouchableOpacity
              onPress={() => setIsQuizSubmitted(true)}
              activeOpacity={0.8}
              style={styles.quickSubmitShortcut}
            >
              <Text style={styles.quickSubmitShortcutText}>
                Sudah selesai? Klik di sini untuk Kumpulkan Langsung ({totalAnsweredCount}/{QUIZ_QUESTION_BANK.length} terjawab)
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        /* Result & Score Summary Screen */
        <View style={styles.resultSummaryCard}>
          <View style={styles.resultTrophyCircle}>
            <Icon name="star" size={32} color="#f59e0b" />
          </View>
          
          <Text style={styles.resultHeadingText}>
            {percentage >= 70 ? "Hasil Evaluasi: Sangat Memuaskan" : "Hasil Evaluasi: Remedial Mandiri"}
          </Text>
          <Text style={styles.resultSubText}>
            Evaluasi pemahaman kompetensi Hybrid Application Development (React Native)
          </Text>

          <View style={styles.scoreMetricBox}>
            <Text style={styles.scoreNumberDisplay}>{percentage}%</Text>
            <Text style={styles.scoreBreakdownText}>
              Jawaban Benar: {correctTotal} dari {QUIZ_QUESTION_BANK.length} Butir Soal
            </Text>
            <View style={[styles.competencyStatusPill, percentage < 70 && styles.competencyStatusPillRemedial]}>
              <Text style={styles.competencyStatusText}>
                {percentage >= 70 ? "STATUS: KOMPETEN (LULUS UTS)" : "STATUS: PERLU REMEDIAL MANDIRI"}
              </Text>
            </View>
          </View>

          <View style={styles.reviewHeaderRow}>
            <Text style={styles.reviewSectionTitle}>Audit Pembahasan Kunci Jawaban Resmi</Text>
            <Text style={styles.reviewSectionSub}>Tap butir di bawah untuk membuka/menutup rasional detail:</Text>
          </View>

          {QUIZ_QUESTION_BANK.map((q, idx) => {
            const userAnswer = selectedAnswersMap[idx];
            const isCorrect = (
              userAnswer === q.correctIndex ||
              userAnswer === q.correctAnswerKey ||
              (typeof userAnswer === 'number' && String.fromCharCode(65 + userAnswer) === q.correctAnswerKey)
            );
            const isExpanded = Boolean(expandedExplanationMap[idx]);

            return (
              <TouchableOpacity
                key={q.id || idx}
                onPress={() => handleToggleExplanation(idx)}
                activeOpacity={0.85}
                style={[styles.auditRowItem, isExpanded && styles.auditRowItemExpanded]}
              >
                <View style={styles.auditRowTop}>
                  <Text style={styles.auditQuestionTitle}>
                    Butir {idx + 1}: {q.lo || q.topicTag || "Kompetensi"}
                  </Text>
                  <View style={[styles.auditBadge, isCorrect ? styles.auditBadgeCorrect : styles.auditBadgeIncorrect]}>
                    <Text style={[styles.auditBadgeTxt, isCorrect ? styles.auditBadgeTxtCorrect : styles.auditBadgeTxtIncorrect]}>
                      {isCorrect ? "Status: Benar" : "Status: Perlu Evaluasi"}
                    </Text>
                  </View>
                </View>

                <Text style={styles.auditPrompt}>{q.question || q.questionText}</Text>
                
                <View style={styles.auditAnswerChoiceBox}>
                  <Text style={styles.auditAnswerChoiceTxt}>
                    Jawaban Anda: <Text style={{ fontWeight: 'bold' }}>{getFormattedAnswerLabel(q, userAnswer)}</Text>
                  </Text>
                  {!isCorrect && (
                    <Text style={styles.auditAnswerKeyTxt}>
                      Kunci Resmi: <Text style={{ fontWeight: 'bold' }}>{getFormattedAnswerLabel(q, q.correctIndex)}</Text>
                    </Text>
                  )}
                </View>

                {isExpanded ? (
                  <View style={styles.expandedExplanationContainer}>
                    <Text style={styles.auditExplanation}>
                      Rasional Kunci Jawaban: {q.explanation}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.tapToExpandHint}>
                    Klik untuk membuka penjelasan rasional mendalam
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}

          <View style={styles.resultFooterButtonGroup}>
            <TouchableOpacity onPress={handleRestartQuiz} activeOpacity={0.8} style={styles.retakeButton}>
              <Icon name="refresh" size={14} color="#78716c" />
              <Text style={styles.retakeButtonText}>Ulangi Pengerjaan Kuis</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onNavigate && onNavigate("home")} activeOpacity={0.85} style={styles.backHomeButton}>
              <Text style={styles.backHomeButtonText}>Kembali ke Beranda Utama</Text>
              <Icon name="arrowRight" size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#faf7f2',
    padding: 16,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1c1917',
  },
  headerSubtitle: {
    fontSize: 10,
    color: '#78716c',
    marginTop: 2,
    fontWeight: '600',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f3ee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#1f654d',
    gap: 6,
  },
  timerBadgeWarning: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
  },
  timerText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1f654d',
  },
  timerTextWarning: {
    color: '#ef4444',
  },
  jumperWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
  },
  jumperHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jumperTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#78716c',
  },
  jumperHint: {
    fontSize: 9,
    fontWeight: '600',
    color: '#a8a29e',
  },
  jumperPillsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  jumperPill: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f5f0e8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    position: 'relative',
  },
  jumperPillActive: {
    backgroundColor: '#1f654d',
    borderColor: '#1f654d',
  },
  jumperPillAnswered: {
    backgroundColor: '#e8f3ee',
    borderColor: '#a7f3d0',
  },
  jumperPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#78716c',
  },
  jumperPillTextActive: {
    color: '#ffffff',
  },
  jumperPillTextAnswered: {
    color: '#1f654d',
  },
  jumperCheckDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1f654d',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 11,
    color: '#78716c',
    fontWeight: '600',
  },
  progressCountBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1f654d',
    backgroundColor: '#e8f3ee',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  progressBarTrack: {
    height: 7,
    backgroundColor: '#e7e5e4',
    borderRadius: 7,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1f654d',
    borderRadius: 7,
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 4,
    borderBottomColor: '#d6d3d1',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  competencyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    backgroundColor: '#e8f3ee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  competencyTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1f654d',
    letterSpacing: 0.3,
  },
  questionPromptText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
    lineHeight: 22,
    marginBottom: 16,
  },
  optionsWrapper: {
    gap: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    backgroundColor: '#ffffff',
    gap: 12,
  },
  optionItemSelected: {
    borderColor: '#1f654d',
    backgroundColor: '#e8f3ee',
  },
  optionKeyCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f5f0e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionKeyCircleSelected: {
    backgroundColor: '#1f654d',
  },
  optionKeyText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#78716c',
  },
  optionKeyTextSelected: {
    color: '#ffffff',
  },
  optionContentText: {
    fontSize: 12,
    color: '#44403c',
    flex: 1,
    lineHeight: 17,
    fontWeight: '500',
  },
  optionContentTextSelected: {
    color: '#1f654d',
    fontWeight: '700',
  },
  optionCheckBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1f654d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  demoToolsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  autoFillDemoButton: {
    flex: 1,
    backgroundColor: '#fffbeb',
    borderWidth: 1.5,
    borderColor: '#fde68a',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFillDemoText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#b45309',
    textAlign: 'center',
  },
  resetAnswersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f5f0e8',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  resetAnswersText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#78716c',
  },
  actionButtonGroup: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  navigationButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    paddingVertical: 12,
    borderRadius: 14,
  },
  navigationButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716c',
  },
  primaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1f654d',
    borderBottomWidth: 3,
    borderBottomColor: '#164e3b',
    paddingVertical: 12,
    borderRadius: 14,
  },
  primaryActionButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
  submitActionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f59e0b',
    borderBottomWidth: 3,
    borderBottomColor: '#d97706',
    paddingVertical: 12,
    borderRadius: 14,
  },
  submitActionButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
  quickSubmitShortcut: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e7e5e4',
    marginBottom: 24,
  },
  quickSubmitShortcutText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1f654d',
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  resultSummaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 4,
    borderBottomColor: '#d6d3d1',
    marginBottom: 24,
    alignItems: 'center',
  },
  resultTrophyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fffbeb',
    borderWidth: 2,
    borderColor: '#fde68a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultHeadingText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1c1917',
    textAlign: 'center',
    marginBottom: 4,
  },
  resultSubText: {
    fontSize: 11,
    color: '#78716c',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 16,
  },
  scoreMetricBox: {
    width: '100%',
    backgroundColor: '#e8f3ee',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  scoreNumberDisplay: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1f654d',
    letterSpacing: -1,
  },
  scoreBreakdownText: {
    fontSize: 12,
    color: '#1f654d',
    marginTop: 2,
    fontWeight: '700',
  },
  competencyStatusPill: {
    backgroundColor: '#1f654d',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 10,
  },
  competencyStatusPillRemedial: {
    backgroundColor: '#dc2626',
  },
  competencyStatusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  reviewHeaderRow: {
    alignSelf: 'stretch',
    marginBottom: 12,
  },
  reviewSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1c1917',
    marginBottom: 4,
  },
  reviewSectionSub: {
    fontSize: 10,
    color: '#78716c',
  },
  auditRowItem: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    padding: 12,
    marginBottom: 10,
  },
  auditRowItemExpanded: {
    borderColor: '#1f654d',
    backgroundColor: '#fafaf9',
  },
  auditRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  auditQuestionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1c1917',
    flex: 1,
    marginRight: 6,
  },
  auditBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  auditBadgeCorrect: {
    backgroundColor: '#e8f3ee',
  },
  auditBadgeIncorrect: {
    backgroundColor: '#fef2f2',
  },
  auditBadgeTxt: {
    fontSize: 10,
    fontWeight: '800',
  },
  auditBadgeTxtCorrect: {
    color: '#1f654d',
  },
  auditBadgeTxtIncorrect: {
    color: '#ef4444',
  },
  auditPrompt: {
    fontSize: 11,
    color: '#44403c',
    marginBottom: 8,
    lineHeight: 16,
  },
  auditAnswerChoiceBox: {
    backgroundColor: '#f5f0e8',
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
    gap: 2,
  },
  auditAnswerChoiceTxt: {
    fontSize: 10,
    color: '#57534e',
  },
  auditAnswerKeyTxt: {
    fontSize: 10,
    color: '#1f654d',
  },
  expandedExplanationContainer: {
    backgroundColor: '#e8f3ee',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#1f654d',
    marginTop: 4,
  },
  auditExplanation: {
    fontSize: 10.5,
    color: '#164e3b',
    fontWeight: '600',
    lineHeight: 15,
  },
  tapToExpandHint: {
    fontSize: 10,
    color: '#1f654d',
    fontWeight: '700',
    marginTop: 4,
  },
  resultFooterButtonGroup: {
    width: '100%',
    marginTop: 18,
    gap: 10,
  },
  retakeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    paddingVertical: 12,
    borderRadius: 14,
  },
  retakeButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#78716c',
  },
  backHomeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1f654d',
    borderBottomWidth: 3,
    borderBottomColor: '#164e3b',
    paddingVertical: 12,
    borderRadius: 14,
  },
  backHomeButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
});
