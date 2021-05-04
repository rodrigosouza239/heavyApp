/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import Dialog from '@components/Dialog';
import Container from '@components/Container';
import Box from '@components/Box';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Modal from 'react-native-modal';
import { useTheme } from '@theme/';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import useTranslation from '@i18n/';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import IconButton from '@components/Button/IconButton';

const MessageModal = ({ showModal, setShowModal, userVehicle, userPhone, productDetails }) => {
  const $t = useTranslation();
  const navigation = useNavigation();

  const [showModalError, setShowModalError] = useState(false);

  const {
    palette: { common, primary },
    shape: { borderRadius },
  } = useTheme();

  const redenWhatsError = () => {
    return (
      <Dialog
        enablePressBackdrop
        enableRequestClose
        isVisible={showModalError}
        title={$t('whatsAppError')}
        onClose={() => setShowModalError(false)}
      />
    );
  };

  const renderModal = () => {
    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        useNativeDriver={false}
      >
        <Container
          style={{
            backgroundColor: common.white,
            borderRadius: 5,
          }}
        >
          <Box
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ width: '100%', alignItems: 'flex-end' }}>
              <IconButton onPress={() => setShowModal(false)} name="times" size={18} />
            </View>
            <Box>
              <Typography
                color="black"
                style={{ textAlign: 'center' }}
                variant="h2"
                fontWeight="bold"
              >
                {$t('chooseChatType')}
              </Typography>
            </Box>
            <Box mt={2} mb={3}>
              <SimpleLineIcons name="bubbles" size={50} color="black" />
            </Box>
          </Box>
          <Box>
            <TouchableOpacity
              style={{
                backgroundColor: primary.main,
                borderRadius,
              }}
              onPress={() => {
                setShowModal(false);
                if (productDetails) {
                  navigation.navigate('search-product-chat');
                } else {
                  navigation.navigate('chat', {
                    item: { vehicle_id: userVehicle, firstMessage: true },
                  });
                }
              }}
            >
              <Box
                p={1.2}
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <AntDesign name="wechat" size={24} color="white" />
                <Box ml={2}>
                  <Typography color="white">{$t('chatHeavy')}</Typography>
                </Box>
              </Box>
            </TouchableOpacity>
          </Box>
          <Box mt={2}>
            <TouchableOpacity
              style={{
                backgroundColor: primary.main,
                borderRadius,
              }}
              onPress={() => {
                // eslint-disable-next-line consistent-return
                Linking.canOpenURL('whatsapp://send').then((supported) => {
                  if (supported) {
                    Linking.openURL(`whatsapp://send?phone=${userPhone}`);
                  } else {
                    setShowModalError(true);
                  }
                });
              }}
            >
              <Box
                p={1.2}
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <Ionicons name="logo-whatsapp" size={24} color="white" />
                <Box ml={2}>
                  <Typography color="white">{$t('whatsApp')}</Typography>
                </Box>
              </Box>
            </TouchableOpacity>
          </Box>
          <Box mt={2}>
            <Button onPress={() => setShowModal(false)}>{$t('close')}</Button>
          </Box>
        </Container>
      </Modal>
    );
  };

  return (
    <>
      {renderModal()}
      {redenWhatsError()}
    </>
  );
};

MessageModal.defaultProps = {
  showModal: false,
  setShowModal: null,
  userVehicle: '',
  userPhone: '',
};

MessageModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  userVehicle: PropTypes.string,
  userPhone: PropTypes.string,
};

export default MessageModal;
