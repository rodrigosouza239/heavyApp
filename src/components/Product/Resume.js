import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { safeRender } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';
import Definition from './components/Definition';

function Resume({ data }) {
  const $t = useTranslation();

  return (
    <>
      <Typography gutterBottom variant="subtitle" fontWeight="bold" color="textSecondary">
        {$t('orderSummary')}
      </Typography>
      <Typography color="textSecondary" fontWeight="bold">
        {$t('modality')}
      </Typography>
      {safeRender(data?.planName, <Definition label={data?.planName} value={data?.planPrice} />)}
      {safeRender(
        data?.planPrice,
        <Definition isLast label={`${$t('totalAmountToBePaid')}:`} value={data?.planPrice} />,
      )}
    </>
  );
}

Resume.defaultProps = {
  data: null,
};

Resume.propTypes = {
  data: PropTypes.shape({
    planName: PropTypes.string,
    planPrice: PropTypes.string,
  }),
};

export default Resume;
