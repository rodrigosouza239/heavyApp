import useTranslation from '@i18n/';
import { safeRender } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';
import Definition from './components/Definition';

function Accounting({ data }) {
  const $t = useTranslation();

  return (
    <>
      {safeRender(
        data?.price,
        <Definition value={data?.price} label={`${$t('advertisedPrice')}:`} />,
      )}
      {safeRender(
        data?.location,
        <Definition value={data?.location} label={`${$t('announcedOn')}:`} />,
      )}
      {safeRender(
        data?.createdAt,
        <Definition value={data?.createdAt} label={`${$t('announcementDate')}:`} />,
      )}
      {data?.expiresIn === '' ? (
        <Definition isLast value={`${$t('expirationPaused')}`} label={`${$t('expirationDate')}:`} />
      ) : (
        <Definition isLast value={data?.expiresIn} label={`${$t('expirationDate')}:`} />
      )}
    </>
  );
}

Accounting.defaultProps = {
  data: null,
};

Accounting.propTypes = {
  data: PropTypes.shape({
    price: PropTypes.string,
    location: PropTypes.string,
    createdAt: PropTypes.string,
    expiresIn: PropTypes.string,
  }),
};

export default Accounting;
