import Box from '@components/Box';
import Button from '@components/Button';
import Container from '@components/Container';
import Dialog from '@components/Dialog';
import FormGroup from '@components/FormGroup';
import Loading from '@components/Loading';
import Tab from '@components/Tab';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { removeAllNonNumeric } from '@utils/';
import { Linking } from 'expo';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../components/Progress';
import {
  checkPostalCode,
  fetchCountries,
  resetPostalCodeValidation,
  resetValues,
  saveVehicle,
  savePlan,
  vehicleSaveLoading,
} from '../ducks';
import BilletScreen from './tabs/Billet';
import CreditCard from './tabs/CreditCard';

const { width: viewportWidth } = Dimensions.get('window');

const initialLayout = { width: viewportWidth };

function Payment({ navigation, route }) {
  const $t = useTranslation();
  const [vehicleId, setVehicleId] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [billetUrl, setBilletUrl] = useState('');
  const [index, setIndex] = useState(0);
  const [error, setError] = useState();
  const [routes] = useState([
    { key: 'creditCard', title: $t('card') },
    { key: 'billet', title: $t('billet') },
  ]);

  const dispatch = useDispatch();
  const {
    countries,
    countriesLoading,
    initialValues,
    isPostalCodeChecked,
    isValidPostalCode,
    isValidPostalCodeLoading,
    postalCodeData,
    vehicleLoading,
    vehicleError,
  } = useSelector((state) => state.ad);

  useEffect(() => {
    return function clean() {
      resetPostalCodeValidation();
    };
  }, []);

  useEffect(() => {
    dispatch(vehicleSaveLoading(false));
  }, [dialogVisible]);

  const errors = {
    error_require_full_name: $t('cardFullName'),
    invalid_document_number: $t('invalidHolderCPForCNPJ'),
    invalid_creditcard_number: $t('invalidCardNumber'),
    invalid_verification_value: $t('invalidCVV'),
    invalid_expiration_date: $t('invalidCardExpirationDate'),
  };

  const profile = useSelector((state) => state.profile.user);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  useEffect(() => {
    if (!vehicleLoading && error) {
      setTimeout(() => {
        Alert.alert($t('ops'), error);
        setError(null);
      }, 1000);
    }
  }, [vehicleLoading, error]);

  const handleSubmit = async (values) => {
    const modalSuccessVisible = true;
    const sellTypes = ['creditcard', 'billet'];
    const sell_type = sellTypes[index];
    if (route?.params?.ad) {
      const {
        current_payment: { vehicle_id, plan_id, sell_installment },
        user: {
          name,
          email,
          user_info: {
            document_type,
            document_number,
            street_name,
            street_number,
            neighborhood,
            city,
            state,
            postal_code,
          },
        },
      } = route?.params?.ad;
      const { card_cvv, card_expiration, card_number, address_complement, address_number } = values;
      try {
        const data = await new Promise((resolve) => {
          dispatch(
            savePlan({
              values: {
                metadata: {},
                data: {
                  vehicle_id,
                  plan_id,
                  sell_type,
                  sell_installment,
                  card_cvv,
                  card_expiration,
                  card_number,
                  user_name: name,
                  user_email: email,
                  document_type,
                  document_number,
                  address_street: street_name,
                  address_number: address_number || street_number,
                  address_district: neighborhood,
                  address_city: city,
                  address_state: state,
                  address_complement,
                  address_zipcode: postal_code,
                },
              },
              resolve,
            }),
          );
        });

        if (!data.success) {
          const hasValidationErrors = data?.validation_errors;

          setError(
            errors[data?.error?.message] ||
              (hasValidationErrors ? $t('fillAllFieldsAd') : $t('unexpectedErrorTryAgain')),
          );
        } else {
          if (sell_type === 'billet') {
            setBilletUrl(data?.data?.pdf);
          }

          setVehicleId(route?.params?.ad?.id);
          setDialogVisible(modalSuccessVisible);
        }
      } catch (er) {
        // no feedback
      }
    } else {
      try {
        const data = await new Promise((resolve) => {
          dispatch(
            saveVehicle({
              values: {
                ...values,
                sell_type,
                document_number: values?.document_number
                  ? removeAllNonNumeric(values.document_number)
                  : '',
              },
              resolve,
            }),
          );
        });

        if (!data.success) {
          const hasValidationErrors = data?.validation_errors;

          setError(
            errors[data?.error?.message] ||
              (hasValidationErrors ? $t('fillAllFieldsAd') : $t('unexpectedErrorTryAgain')),
          );
        } else {
          if (sell_type === 'billet') {
            setBilletUrl(data?.data?.plan?.data?.pdf);
          }

          setVehicleId(data?.data?.vehicle?.id);
          setDialogVisible(modalSuccessVisible);
        }
      } catch (er) {
        // no feedback
      }
    }
  };

  const checkPostalCodeDebounced = useRef(
    debounce(async (values) => {
      const { postal_code, setFieldValue } = values;
      const POSTAL_CODE_LENGTH = 9;

      if (postal_code && postal_code?.length === POSTAL_CODE_LENGTH) {
        const data = await new Promise((resolve) => {
          dispatch(checkPostalCode({ values, resolve }));
        });

        if (data?.success) {
          const {
            data: { city, neighborhood, state, street_name },
          } = data;

          setFieldValue('address_city', city);
          setFieldValue('address_district', neighborhood);
          setFieldValue('address_state', state);
          setFieldValue('address_street', street_name);
        }
      }
    }, 500),
  ).current;

  const handleChangePostalCode = (values) => {
    checkPostalCodeDebounced(values);
  };

  const normalizedUser = {
    email: profile?.email ?? '',
    name: profile?.name ?? '',
    user_phone: profile?.user_info?.phone ?? '',
    address_country: profile?.user_info?.country_id,
    address_zipcode: profile?.user_info?.postal_code,
    address_street: profile?.user_info?.street_name,
    document_type: profile?.user_info?.document_type
      ? profile?.user_info?.document_type.toUpperCase()
      : '',
    document_number: profile?.user_info?.document_number ?? '',
    street_number: profile?.user_info?.street_number ?? '',
    address_district: profile?.user_info?.neighborhood ?? '',
    address_city: profile?.user_info?.city ?? '',
    address_state: profile?.user_info?.state ?? '',
  };

  const renderScene = (tab) => {
    const router = tab.route;

    switch (router?.key) {
      case 'creditCard':
        return (
          <CreditCard user={normalizedUser} initialValues={initialValues} onSubmit={handleSubmit} />
        );
      case 'billet':
        return (
          <BilletScreen
            countries={countries}
            countriesLoading={countriesLoading}
            user={normalizedUser}
            isPostalCodeChecked={isPostalCodeChecked}
            isValidPostalCode={isValidPostalCode}
            isValidPostalCodeLoading={isValidPostalCodeLoading}
            onChangeZipCode={handleChangePostalCode}
            onSubmit={handleSubmit}
            postalCodeData={postalCodeData}
          />
        );
      default:
        return null;
    }
  };

  const reset = () => {
    setDialogVisible(false);
    dispatch(resetValues());
    navigation.navigate('home-initial', { vehicleId });
  };

  const handlePressConfirm = () => reset();

  const handlePressDownloadPdf = async () => {
    try {
      await Linking.openURL(billetUrl);
    } catch (er) {
      Alert.alert($t('inconpatibleDeviceToDownloadFile'));
    }
  };

  const renderFooter = () => {
    const isBillet = typeof billetUrl === 'string' && billetUrl.length > 0;

    return (
      <>
        <FormGroup disableGutter={!isBillet}>
          <Button onPress={handlePressConfirm}>{$t('continue')}</Button>
        </FormGroup>
        {isBillet && (
          <FormGroup disableGutter>
            <Button onPress={handlePressDownloadPdf}>{$t('downloadBillet')}</Button>
          </FormGroup>
        )}
      </>
    );
  };

  const renderDialogDescription = () => (
    <>
      <Box mb={2}>
        <Typography color="textSecondary" fontWeight="medium" align="center">
          {$t('paymentWaitingApproval.payment')}{' '}
          <Typography color="textSecondary" fontWeight="bold">
            {$t('paymentWaitingApproval.waiting')}
          </Typography>{' '}
          {$t('paymentWaitingApproval.approval')}
        </Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" align="center">
        {$t('trackPlan.track')}{' '}
        <Typography color="textSecondary" variant="body2" fontWeight="bold" align="center">
          {$t('trackPlan.summary')}
        </Typography>{' '}
        {$t('trackPlan.theOrder')}
      </Typography>
    </>
  );

  return (
    <>
      <Container pb={0}>
        <Progress pageIndex={11} currentStep="third" />
      </Container>
      <TabView
        initialLayout={initialLayout}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={(props) => <Tab {...props} />}
      />
      <Loading
        loading={vehicleLoading || isValidPostalCodeLoading}
        text={vehicleLoading ? $t('wait') : $t('checkingZipCode')}
      />
      <Dialog
        description={renderDialogDescription}
        enablePressBackdrop={false}
        enableRequestClose={false}
        footer={renderFooter}
        icon="check"
        isVisible={vehicleLoading === false && vehicleError === false}
        title={$t('ready')}
      />
    </>
  );
}

Payment.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      ad: PropTypes.object,
    }),
  }).isRequired,
};

export default Payment;
