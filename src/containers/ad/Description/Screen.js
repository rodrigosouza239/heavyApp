import Container from '@components/Container';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../components/Progress';
import { getOptionalsByProductId, updateInitialValues } from '../ducks';
import Form from './Form';

function Description({ navigation }) {
  const $t = useTranslation();
  const dispatch = useDispatch();
  const { initialValues, has_optionals } = useSelector((state) => state.ad);

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

  const handleSubmit = (values) => {
    dispatch(updateInitialValues(values));
    if (has_optionals) {
      return navigation.navigate('home-optionals');
    }
    return navigation.navigate('home-extras');
  };

  const progress = (
    <Container pb={0}>
      <Progress
        pageIndex={2}
        description={
          <>
            <Typography variant="body2" align="center" color="textSecondary">
              {$t('adProductDescription.enterA')}{' '}
              <Typography variant="body2" color="textSecondary" fontWeight="bold">
                {$t('adProductDescription.description')}
              </Typography>{' '}
              {$t('adProductDescription.aboutTheProduct')}
            </Typography>
          </>
        }
      />
    </Container>
  );

  return <Form initialValues={initialValues} progress={progress} onSubmit={handleSubmit} />;
}

Description.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Description;
