import Box from '@components/Box';
import Typography from '@components/Typography';
import { safeRender } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';
import useTranslation from '@i18n/';

function Description({ data }) {
  const $t = useTranslation();

  return (
    <>
      <Box mb={1}>
        <Typography variant="subtitle" fontWeight="bold" color="textSecondary">
          {$t('productDescription')}
        </Typography>
      </Box>
      {safeRender(
        data,
        <Typography color="textSecondary" fontWeight="medium">
          {data}
        </Typography>,
      )}
    </>
  );
}

Description.defaultProps = {
  data: '',
};

Description.propTypes = {
  data: PropTypes.string,
};

export default Description;
