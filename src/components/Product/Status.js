import Box from '@components/Box';
import ProgressBar from '@components/ProgressBar';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { useVehicleStatus } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';

function Status({ status }) {
  const $t = useTranslation();

  if (!status) {
    return null;
  }

  const computedStatus = useVehicleStatus(status);

  return computedStatus ? (
    <Box>
      <Typography fontWeight="medium" color="textSecondary" gutterBottom>
        {$t('status')}
      </Typography>
      <Box mb={1}>
        <ProgressBar progress={1} color={computedStatus?.color} />
      </Box>
      <Typography color="textSecondary">{computedStatus?.description}</Typography>
    </Box>
  ) : null;
}

Status.defaultProps = {
  status: '',
};

Status.propTypes = {
  status: PropTypes.string,
};

export default Status;
