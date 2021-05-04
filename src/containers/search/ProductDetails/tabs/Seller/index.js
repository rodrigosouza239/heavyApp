import ActivityIndicator from '@components/ActivityIndicator';
import Box from '@components/Box';
import ActionButton from '@components/Button/ActionButton';
import Container from '@components/Container';
import ErrorDialog from '@components/Dialog/ErrorDialog';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { removeAllNonNumeric, safeRender } from '@utils/';
import * as Linking from 'expo-linking';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { MaskService } from 'react-native-masked-text';

const styles = StyleSheet.create({
  contactHolder: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  actionButton: {
    position: 'absolute',
    right: 0,
  },
});

function Seller({ data, loading }) {
  const $t = useTranslation();
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const toggleModalErrorVisible = () => setModalErrorVisible((visible) => !visible);

  const renderPhone = () => {
    if (data?.location?.includes('Brazil')) {
      if (data?.phone?.length > 12) {
        return MaskService.toMask('custom', data?.phone, {
          mask: '+99 (99) 99999-9999',
        });
      }
      return MaskService.toMask('custom', data?.phone, {
        mask: '+99 (99) 9999-9999',
      });
    }
    return MaskService.toMask('custom', data?.phone, {
      mask: '+9 (999) 999-9999',
    });
  };

  const onPressPhone = async () => {
    try {
      await Linking.openURL(`tel:${removeAllNonNumeric(data?.phone)}`);
    } catch (error) {
      toggleModalErrorVisible();
    }
  };

  if (loading) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }

  return (
    <Container>
      {safeRender(
        data?.name,
        <Box mb={2}>
          <Typography variant="h6" color="textSecondary">
            {data?.name}
          </Typography>
        </Box>,
      )}
      {safeRender(
        data?.location,
        <Box mb={4}>
          <Typography gutterBottom variant="subtitle" color="textSecondary">
            {$t('location')}
          </Typography>
          <Typography color="textSecondary">{data?.location}</Typography>
        </Box>,
      )}
      {safeRender(
        data?.phone,
        <Box style={styles.contactHolder}>
          <Typography gutterBottom variant="subtitle" color="textSecondary">
            {$t('contact')}
          </Typography>
          <Typography color="textSecondary">{renderPhone()}</Typography>
          <ActionButton onPress={onPressPhone} style={styles.actionButton} name="phone" />
        </Box>,
      )}
      <ErrorDialog isVisible={modalErrorVisible} onClose={toggleModalErrorVisible} />
    </Container>
  );
}

Seller.defaultProps = {
  data: null,
};

Seller.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default Seller;
