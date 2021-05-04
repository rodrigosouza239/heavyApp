import Container from '@components/Container';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../components/Progress';
import { updateInitialValues } from '../ducks';
import Form from './Form';

function Price({ navigation }) {
  const $t = useTranslation();
  const dispatch = useDispatch();

  const { initialValues } = useSelector((state) => state.ad);

  const handleSubmit = async (values) => {
    dispatch(updateInitialValues(values));
    navigation.navigate('home-photos');
  };

  const progress = (
    <Container pb={0}>
      <Progress
        pageIndex={8}
        description={
          <>
            <Typography variant="body2" align="center" color="textSecondary">
              {$t('createAdTitles.how')}{' '}
              <Typography variant="body2" color="textSecondary" fontWeight="bold">
                {$t('createAdTitles.much')}
                {'\n'}
              </Typography>{' '}
              {$t('createAdTitles.doYouWantAdvertise')}
            </Typography>
          </>
        }
      />
    </Container>
  );

  return <Form initialValues={initialValues} progress={progress} onSubmit={handleSubmit} />;
}

Price.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Price;
