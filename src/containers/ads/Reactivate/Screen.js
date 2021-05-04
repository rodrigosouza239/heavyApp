import useTranslation from '@i18n/';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@components/Container';
import Typography from '@components/Typography';
import Box from '@components/Box';
import Button from '@components/Button';
import Loading from '@components/Loading';
import Modal from '@components/Modal';
import Icon from '@components/Icon';
import { sendReactivate, resetReactivate } from '@containers/ads/ducks';

function Reactivate({ route, navigation }) {
  const { vehicleId: vehicle_id } = route.params;
  const theme = useTheme();
  const {
    palette: {
      text: { primary },
    },
  } = theme;
  const $t = useTranslation();
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const { reactivateLoading, reactivateSuccess, reactivateError } = useSelector(
    (state) => state.ads,
  );

  const renderModal = () => {
    if (reactivateSuccess) {
      return (
        <Modal isVisible>
          <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box mb={2} mt={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="check" size={100} />
            </Box>
            <Box mb={1} mt={2} pl={5} pr={5}>
              <Typography color="textSecondary" variant="h6" align="center" fontWeight="bold">
                {$t('sendRequestSuccess')}
              </Typography>
            </Box>
            <Box mb={2} mt={2} pl={5} pr={5}>
              <Typography color="textSecondary" align="center">
                {$t('sendRequestDescription')}
              </Typography>
            </Box>
            <Box mb={2} mt={2} pl={5} pr={5} style={{ width: '100%' }}>
              <Button
                style={{ alignSelf: 'stretch' }}
                arrow={false}
                onPress={() => {
                  dispatch(resetReactivate());
                  navigation.goBack();
                }}
              >
                Ok
              </Button>
            </Box>
          </Box>
        </Modal>
      );
    }
    if (reactivateError) {
      return (
        <Modal isVisible>
          <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Box mb={2} mt={2} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="exclamation-triangle" size={100} />
            </Box>
            <Box mb={1} mt={2} pl={5} pr={5}>
              <Typography color="textSecondary" variant="h6" align="center" fontWeight="bold">
                {$t('sendRequestFail')}
              </Typography>
            </Box>
            <Box mb={2} mt={2} pl={5} pr={5}>
              <Typography color="textSecondary" align="center">
                {$t('sendRequestDescription1')}
              </Typography>
            </Box>
            <Box mb={2} mt={2} pl={5} pr={5} style={{ width: '100%' }}>
              <Button
                style={{ alignSelf: 'stretch' }}
                arrow={false}
                onPress={() => dispatch(resetReactivate())}
              >
                Ok
              </Button>
            </Box>
          </Box>
        </Modal>
      );
    }
    return <></>;
  };

  return (
    <ScrollView>
      <Container style={{ flex: 1 }}>
        <Box pt={2}>
          <Typography align="center" fontWeight="bold" color="textSecondary">
            {$t('reactivate')?.toUpperCase()}
          </Typography>
        </Box>
        <Box py={2}>
          <Typography align="center" color="textPrimary">
            {$t('reactivateDescription')}
          </Typography>
        </Box>
        <Typography align="left" fontWeight="bold" color="textPrimary">
          {$t('message')?.toUpperCase()}
        </Typography>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          icon="pencil"
          value={description}
          placeholder={$t('reactivatePlaceholder')}
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={10}
          style={{
            height: 200,
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: primary,
            textAlignVertical: 'top',
          }}
        />
        <Box py={2}>
          <Typography align="center" color="textPrimary">
            {$t('reactivateDescription1')}
          </Typography>
        </Box>
        <Box py={2}>
          <Button onPress={() => dispatch(sendReactivate({ data: { vehicle_id, description } }))}>
            {$t('sendRequest')}
          </Button>
        </Box>
      </Container>
      <Loading loading={reactivateLoading} text={$t('wait')} />
      {renderModal()}
    </ScrollView>
  );
}

Reactivate.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      vehicleId: PropTypes.number,
    }),
  }).isRequired,
};

export default Reactivate;
