import Box from '@components/Box';
import Container from '@components/Container';
import Typography from '@components/Typography';
import useTranslation from '@i18n';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@theme/';
import SquareButton from './SquareButton';

function SellOrBuy({ onPressBuy, onPressSell }) {
  const $t = useTranslation();

  const {
    shape: { borderRadius },
  } = useTheme();

  const styles = StyleSheet.create({
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    flex: {
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
      borderRadius,
    },
  });

  return (
    <Container py={0}>
      <Box mb={1}>
        <Typography fontWeight="bold">{$t('whatDo')}</Typography>
      </Box>
      <Box mb={1} style={styles.row}>
        <SquareButton onPress={onPressBuy} containerProps={{ mr: 1, style: styles.flex }}>
          {$t('wantToBuy')}
        </SquareButton>
        <SquareButton
          icon="hand-holding-usd"
          onPress={onPressSell}
          containerProps={{ ml: 1, style: styles.flex }}
        >
          {$t('wantToSell')}
        </SquareButton>
      </Box>
    </Container>
  );
}

SellOrBuy.propTypes = {
  onPressBuy: PropTypes.func.isRequired,
  onPressSell: PropTypes.func.isRequired,
};

export default SellOrBuy;
