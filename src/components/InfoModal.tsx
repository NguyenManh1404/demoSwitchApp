import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {APP_COLORS} from '../themes/colors';
import {APP_IMAGES} from '../themes/images';
import {SCREEN_WIDTH} from '../utils/constants';
import Text from './Text';

interface IInfoModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  closeModal: () => void;
}

const InfoModal: React.FC<IInfoModalProps> = ({
  isModalVisible,
  toggleModal,
  closeModal,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
        <View style={styles.modalView}>
          <Image source={APP_IMAGES.logoHaiChau} style={styles.logoHaiChau} />

          <Text
            color={APP_COLORS.white}
            textAlign="center"
            style={styles.modalMessage}>
            Ứng dụng này được triển khai bởi UBND Quận Hải Châu. Thông tin liên
            hệ về Phòng Y tế Quận Hải Châu
          </Text>

          <View style={styles.divider} />

          <Text
            color={APP_COLORS.white}
            textAlign="center"
            style={styles.modalMessage}>
            SĐT: 0236 3872523
          </Text>
          <Text
            color={APP_COLORS.white}
            textAlign="center"
            style={styles.modalMessage}>
            Email: yte-haichau@danang.gov.vn.
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: APP_COLORS.modalBackground,
    padding: 12,
    borderRadius: 10,
    width: SCREEN_WIDTH - 100,
    alignItems: 'center',
  },
  modalMessage: {
    width: SCREEN_WIDTH / 1.5,
    lineHeight: 22,
  },
  logoHaiChau: {
    marginBottom: 12,
  },
  divider: {
    height: 1,
    width: SCREEN_WIDTH - 120,
    backgroundColor: APP_COLORS.gray2,
    marginVertical: 12,
  },
});
