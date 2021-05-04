import Container from '@components/Container';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../components/Progress';
import { getOptionalsByProductId, updateInitialValues } from '../ducks';
import Form from './Form';

function Optionals({ navigation }) {
  const dispatch = useDispatch();
  const $t = useTranslation();

  const { optionals, initialValues, optionalsLoading } = useSelector((state) => state.ad);

  const handleSubmit = (values) => {
    dispatch(updateInitialValues(values));
    navigation.navigate('home-extras');
  };

  useEffect(() => {
    const getOptionals = () => {
      const { product_id } = initialValues;

      const params = {
        orderby: [['description', 'asc']],
        where: [['product_id', '=', product_id]],
      };

      dispatch(getOptionalsByProductId(params));
    };

    getOptionals();
  }, []);

  const progress = (
    <Container pb={0}>
      <Progress
        pageIndex={3}
        description={
          <>
            <Typography variant="body2" align="center" color="textSecondary">
              {$t('createAdTitles.whatAre')}{' '}
              <Typography variant="body2" color="textSecondary" fontWeight="bold">
                {$t('createAdTitles.yourProduct')}
              </Typography>
              {'\n'}
              {$t('createAdTitles.options')}
            </Typography>
          </>
        }
      />
    </Container>
  );

  return (
    <Form
      onSubmit={handleSubmit}
      optionals={optionals}
      optionalsLoading={optionalsLoading}
      progress={progress}
      initialValues={initialValues}
    />
  );
}

Optionals.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Optionals;
