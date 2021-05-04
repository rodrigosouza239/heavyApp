import React, { useState, useEffect } from 'react';
import Button from '@components/Button';
import Box from '@components/Box';
import Loading from '@components/Loading';
import Modal from '@components/Modal';
import Icon from '@components/Icon';
import TextInput from '@components/TextInput';
import Typography from '@components/Typography';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import useTranslation from '@i18n/';
import { sendChatEvent, sendChatEventReset } from '../ducks';

function Chat() {
  const $t = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { ad } = useSelector((state) => state.search);
  const { chatLoading, chatSuccess, chatError } = useSelector((state) => state.search);

  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fixedContainerHeight = useFixedContainerHeight();

  const dataTest = {
    to: {
      name: ad?.user?.name,
      email: ad?.user?.email,
      secure_id: ad?.user?.secure_id,
    },
    vehicle_id: ad?.id,
    event: {
      type: 'text-message',
      text: message,
    },
  };

  useEffect(() => {
    if (chatSuccess) {
      setShowModal(true);
    } else if (chatError) {
      setShowModal(true);
    }
  }, [chatSuccess, chatError]);

  const renderModal = () => {
    if (chatSuccess)
      return (
        <Modal isVisible>
          <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box mb={2} mt={2}>
              <Typography variant="h1" color="textSecondary" align="center">
                {$t('ready')}
              </Typography>
            </Box>
            <Box mb={2} mt={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="check" size={100} />
            </Box>
            <Box mb={1} mt={2} pl={5} pr={5}>
              <Typography color="textSecondary" variant="body1" align="center" fontWeight="medium">
                {$t('sendSuccess')}
              </Typography>
            </Box>
            <Box mb={4}>
              <Box style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Typography color="textSecondary" variant="body1" align="center">
                  {$t('followThe')}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  align="center"
                  fontWeight="medium"
                >
                  {' '}
                  {$t('negotiation')}
                </Typography>
              </Box>
              <Box style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Typography color="textSecondary" variant="body1" align="center">
                  {$t('modalChat')}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button
            onPress={() => {
              dispatch(sendChatEventReset());
              setShowModal(false);
              navigation.goBack();
            }}
          >
            {$t('ready')}
          </Button>
        </Modal>
      );
    if (chatError)
      return (
        <Modal isVisible={showModal}>
          <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box mb={2} mt={2}>
              <Typography variant="h1" color="textSecondary" align="center">
                {$t('error')}
              </Typography>
            </Box>
            <Box mb={2} mt={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h1" color="textSecondary" align="center">
                X
              </Typography>
            </Box>
            <Box mb={4} mt={2} pl={5} pr={5}>
              <Typography color="textSecondary" variant="body1" align="center" fontWeight="medium">
                {$t('sendMessageError')}
              </Typography>
            </Box>
          </Box>
          <Button
            onPress={() => {
              setShowModal(false);
            }}
          >
            {$t('close')}
          </Button>
        </Modal>
      );
    return <></>;
  };

  return (
    <>
      <ScrollView>
        <Container style={{ paddingBottom: fixedContainerHeight }}>
          <Box mb={2}>
            <Typography variant="h6" color="textSecondary">
              {$t('message')}
            </Typography>
          </Box>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            icon="pencil"
            value={message}
            placeholder={$t('sendToSeller')}
            onChangeText={(text) => setMessage(text)}
            multiline
            numberOfLines={10}
            style={{ height: 300, paddingTop: 15 }}
          />
        </Container>
      </ScrollView>
      <FixedContainer>
        <Button onPress={() => dispatch(sendChatEvent(dataTest))}>{$t('sendMessage')}</Button>
      </FixedContainer>
      <Loading loading={chatLoading} />
      {renderModal()}
    </>
  );
}

export default Chat;
