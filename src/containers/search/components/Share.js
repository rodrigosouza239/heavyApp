import Button from '@components/Button';
import Container from '@components/Container';
import getEnvVars from '@env/';
import PropTypes from 'prop-types';
import React from 'react';
import { Share as NativeShare } from 'react-native';
import useTranslation from '@i18n/';

function Share({ vehicleId }) {
  const $t = useTranslation();
  const handlePressShare = () => {
    const url = getEnvVars().webSiteUrl;
    NativeShare.share({ message: `${url}/detail/${vehicleId}` });
  };

  return (
    <Container py={0} pt={2}>
      <Button arrow={false} onPress={handlePressShare} leftIcon={{ name: 'share' }} variant="text">
        {$t('share')}
      </Button>
    </Container>
  );
}

Share.propTypes = {
  vehicleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Share;
