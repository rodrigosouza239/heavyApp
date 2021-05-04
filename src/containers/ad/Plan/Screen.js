import Container from '@components/Container';
import Typography from '@components/Typography';
import { DELAY_TIME } from '@constants/';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../components/Progress';
import * as Ducks from '../ducks';
import Plans from './Plans';

function Plan({ navigation, route }) {
  const $t = useTranslation();
  const dispatch = useDispatch();

  const { initialValues, plans, plansLoading } = useSelector((state) => state.ad);

  const handleSelectPlan = (plan) => {
    if (plan) {
      if (route?.params?.ad) {
        const newAd = { ...route?.params?.ad };
        if (!newAd?.current_payment) {
          newAd.current_payment = {
            vehicle_id: route?.params?.ad?.id,
            plan_id: plan?.id,
            sell_installment: null,
          };
        } else {
          newAd.current_payment.plan_id = plan?.id;
        }
        navigation.navigate('home-payment', { ad: newAd });
      } else {
        dispatch(Ducks.updateInitialValues({ plan }));
        navigation.navigate('home-payment');
      }
    }
  };

  useEffect(() => {
    const fetchPlans = () => {
      const params = {
        includes: [],
        orderby: [['price', 'asc']],
        where: [['status', '=', ['active']]],
        delay: DELAY_TIME.slow2x,
      };

      dispatch(Ducks.fetchPlans(params));
    };

    fetchPlans();
  }, []);

  const progress = (
    <Container pb={0}>
      <Progress
        pageIndex={10}
        currentStep="third"
        description={
          <>
            <Typography variant="body2" align="center" color="textSecondary">
              {$t('createAdTitles.chooseOneOfOur')}{' '}
              <Typography variant="body2" color="textSecondary" fontWeight="bold">
                {$t('createAdTitles.plans')}
                {'\n'}
              </Typography>{' '}
              {$t('createAdTitles.toPublishYourAd')}
            </Typography>
          </>
        }
      />
    </Container>
  );

  return (
    <Plans
      initialValues={initialValues}
      onSelectPlan={handleSelectPlan}
      plans={plans}
      plansLoading={plansLoading}
      progress={progress}
    />
  );
}

Plan.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      ad: PropTypes.object,
    }),
  }).isRequired,
};

export default Plan;
