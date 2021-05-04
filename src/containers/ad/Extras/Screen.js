import Container from '@components/Container';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../components/Progress';
import * as Ducks from '../ducks';
import Form from './Form';

function Extras({ navigation }) {
  const $t = useTranslation();
  const dispatch = useDispatch();

  const { extras, initialValues, extrasLoading } = useSelector((state) => state.ad);

  useEffect(() => {
    const fetchExtras = () => {
      const params = {
        orderby: [['description', 'asc']],
      };

      dispatch(Ducks.fetchExtras(params));
    };

    fetchExtras();
  }, []);

  const handleSubmit = (values) => {
    dispatch(Ducks.updateInitialValues(values));

    const { has_mileage, has_motorhours, has_trackhours } = initialValues;

    if (has_motorhours) {
      return navigation.navigate('home-engine-hours');
    }

    if (has_trackhours) {
      return navigation.navigate('home-trail-hours');
    }

    if (has_mileage) {
      return navigation.navigate('home-kilometers');
    }

    return navigation.navigate('home-price');
  };

  const progress = (
    <Container pb={0}>
      <Progress
        pageIndex={4}
        description={
          <>
            <Typography variant="body2" align="center" color="textSecondary">
              {$t('createAdTitles.something')}{' '}
              <Typography variant="body2" color="textSecondary" fontWeight="bold">
                {$t('createAdTitles.more')}{' '}
              </Typography>
              {$t('createAdTitles.toHighlight')}
            </Typography>
          </>
        }
      />
    </Container>
  );

  return (
    <Form
      extras={extras}
      extrasLoading={extrasLoading}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      progress={progress}
    />
  );
}

Extras.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Extras;
