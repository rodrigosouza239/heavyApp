import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React from 'react';

function PaginationCount({ total, data }) {
  const $t = useTranslation();
  const dataLength = data?.length || 0;

  return dataLength > 0 ? (
    <Typography variant="body2">{`${$t('showing')} ${dataLength} ${$t('of')} ${total}`}</Typography>
  ) : null;
}

PaginationCount.defaultProps = {
  data: [],
  total: 0,
};

PaginationCount.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number,
};

export default PaginationCount;
