import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import Icon from './Icon';

/**
 * Reusable accessible modal dialog component constructed with React Native Modal API.
 * Developed via Assistant Collaboration for LO2 assessment criteria.
 * Styled using Google Stitch Design System tokens (LangEase Organic Play).
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility state.
 * @param {Function} props.onClose - Dismiss callback triggered by user actions.
 * @param {string} props.title - Modal title text.
 * @param {React.ReactNode} props.children - Modal content payload.
 * @param {React.ReactNode} [props.footer] - Optional bottom action bar.
 * @author AI Assistant Collaboration
 */
export default function ModalDialog({ isOpen, onClose, title, children, footer }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <Modal
      visible={Boolean(isOpen)}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdropOverlay}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.dialogContainer}>
          <View style={styles.dialogHeader}>
            <Text style={styles.dialogTitleText}>{title}</Text>
            <TouchableOpacity
              onPress={onClose}
              accessibilityLabel="Tutup Dialog"
              style={styles.closeButton}
            >
              <Icon name="close" size={16} color="#78716c" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.dialogBody} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>

          {footer && (
            <View style={styles.dialogFooter}>
              {footer}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdropOverlay: {
    flex: 1,
    backgroundColor: 'rgba(28, 25, 23, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dialogContainer: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#e7e5e4',
    borderBottomWidth: 4,
    borderBottomColor: '#d6d3d1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f0e8',
  },
  dialogTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1c1917',
    flex: 1,
    marginRight: 8,
  },
  closeButton: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#f5f0e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBody: {
    padding: 18,
  },
  dialogFooter: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#faf7f2',
    borderTopWidth: 1,
    borderTopColor: '#f5f0e8',
  },
});
