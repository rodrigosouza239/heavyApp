import Container from '@components/Container';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../components/Progress';
import { updateInitialValues } from '../ducks';
import Form from './Form';

function TrailHours({ navigation }) {
  const $t = useTranslation();
  const dispatch = useDispatch();

  const { initialValues, productTypes } = useSelector((state) => state.ad);

  const isRequired =
    productTypes?.find((e) => e.id === initialValues?.product_id)?.has_trackhours ?? true;

  const handleSubmit = (values) => {
    dispatch(updateInitialValues(values));

    const { has_mileage } = initialValues;

    if (has_mileage) {
      return navigation.navigate('home-kilometers');
    }

    return navigation.navigate('home-price');
  };

  const progress = (
    <Container pb={0}>
      <Progress
        pageIndex={6}
        description={
          <>
            <Typography variant="body2" align="center" color="textSecondary">
              {$t('createAdTitles.howMany')}{' '}
              <Typography variant="body2" color="textSecondary" fontWeight="bold">
                {$t('createAdTitles.hours')}
              </Typography>{' '}
              {$t('createAdTitles.ofTrail')}?
            </Typography>
          </>
        }
      />
    </Container>
  );

  return (
    <Form
      initialValues={initialValues}
      progress={progress}
      isRequired={isRequired}
      onSubmit={handleSubmit}
    />
  );
}

TrailHours.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TrailHours;
