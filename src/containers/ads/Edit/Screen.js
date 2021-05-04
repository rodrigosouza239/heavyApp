import ActivityIndicator from '@components/ActivityIndicator';
import Box from '@components/Box';
import Button from '@components/Button';
import Container from '@components/Container';
import Dialog from '@components/Dialog';
import SuccessDialog from '@components/Dialog/SuccessDialog';
import Divider from '@components/Divider';
import Loading from '@components/Loading';
import Switch from '@components/Switch';
import Typography from '@components/Typography';
import {
  changeAdStatus,
  getAdByVehicleId,
  fetchActiveAds,
  fetchInactiveAds,
  changeAdStatusReset,
} from '@containers/ads/ducks';
import { normalizeAdEdit } from '@containers/ads/helper';
import useTranslation from '@i18n/';
import { useVehicleStatus } from '@utils/';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Item from './components/Item';
import { useEditAdItems } from './hooks';

const styles = StyleSheet.create({
  switch: {
    justifyContent: 'space-between',
  },
});

function Edit({ navigation, route }) {
  const $t = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isDialogStatusVisible, setDialogStatusVisible] = useState(false);
  const [showDialogSuccess, setShowDialogSuccess] = useState(false);
  const { ad, adLoading, changeStatusLoading, changeStatusSuccess } = useSelector(
    (state) => state.ads,
  );
  const { vehicleId, success } = route.params;
  const dispatch = useDispatch();

  const vehicleStatus = useVehicleStatus();
  const data = useEditAdItems(normalizeAdEdit(ad), $t);

  const getVehicleById = () => {
    dispatch(getAdByVehicleId(vehicleId));
  };

  const PAGINATION_LIMIT = 15;

  useEffect(() => {
    if (changeStatusSuccess) {
      dispatch(
        fetchActiveAds({
          data: {
            active: 1,
          },
          metadata: {
            pagination: {
              page: 1,
              limit: PAGINATION_LIMIT,
            },
          },
          restartPagination: true,
        }),
      );
      dispatch(
        fetchInactiveAds({
          data: {
            active: 0,
          },
          metadata: {
            pagination: {
              page: 1,
              limit: PAGINATION_LIMIT,
            },
          },
          restartPagination: true,
        }),
      );
      dispatch(changeAdStatusReset());
    }
  }, [changeStatusSuccess]);

  useEffect(() => {
    getVehicleById();
  }, [vehicleId, success]);

  useEffect(() => {
    setIsActive(ad?.status === 'active');
  }, [ad]);

  useEffect(() => {
    if (!adLoading) {
      setIsRefreshing(false);
    }
  }, [adLoading]);

  const toggleDialogSuccess = () => {
    setShowDialogSuccess((prevState) => !prevState);
  };

  const toggleDialogStatus = () => {
    setDialogStatusVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (success) {
      toggleDialogSuccess();
    }
  }, [route.params?.success]);

  if (adLoading && !success) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }

  const handlePressItem = (item) => {
    navigation.setParams({ success: false });
    navigation.navigate(item?.screen, { initialValues: normalizeAdEdit(ad) });
  };

  const changeByStatus = (active) => {
    dispatch(
      changeAdStatus({
        vehicle_id: vehicleId,
        status: active ? vehicleStatus['suspended-user'].status : vehicleStatus.active.status,
      }),
    );
  };

  const handleChangeStatus = () => {
    if (isActive) {
      return toggleDialogStatus();
    }

    changeByStatus(false);

    return setIsActive((previousState) => !previousState);
  };

  const handlePressToggleAdStatus = () => {
    changeByStatus(true);
    setIsActive(false);
    toggleDialogStatus();
  };

  const renderDialogStatusFooter = () => (
    <Button onPress={handlePressToggleAdStatus}>{$t('disableAd')}</Button>
  );

  const renderDialogStatusDescription = () => {
    return (
      <Typography align="center" color="textSecondary">
        {$t('desactiveAdDescription.0')}{' '}
        <Typography align="center" fontWeight="bold" color="textSecondary">
          {$t('desactiveAdDescription.1')}{' '}
        </Typography>{' '}
        {$t('desactiveAdDescription.2')}{' '}
        <Typography align="center" fontWeight="bold" color="textSecondary">
          {$t('desactiveAdDescription.3')}
        </Typography>
        .
      </Typography>
    );
  };

  const renderFooter = () => {
    const allowedStatus = [vehicleStatus.active.status, vehicleStatus['suspended-user'].status];

    return (
      allowedStatus.includes(ad?.status) && (
        <>
          <Divider />
          <Box p={2}>
            <Switch
              checked={isActive}
              label={$t('enableDisableAd')}
              onValueChange={handleChangeStatus}
              style={styles.switch}
              labelProps={{
                color: 'textSecondary',
                variant: 'subtitle',
              }}
            />
          </Box>
          <Dialog
            description={renderDialogStatusDescription}
            footer={renderDialogStatusFooter}
            icon="exclamation-triangle"
            isVisible={isDialogStatusVisible}
            onClose={toggleDialogStatus}
            title={$t('disableAd')}
          />
        </>
      )
    );
  };

  const renderItem = (row) => {
    const { item } = row;

    return <Item data={item} onPress={handlePressItem} />;
  };

  const renderItemSeparator = () => <Divider />;

  const keyExtractor = ({ title }) => String(title);

  const handleRefresh = () => {
    setIsRefreshing(true);
    getVehicleById();
  };

  return (
    <>
      <FlatList
        data={data}
        ItemSeparatorComponent={renderItemSeparator}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={false}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl size="large" refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
      <SuccessDialog isVisible={showDialogSuccess} onClose={toggleDialogSuccess} />
      <Loading loading={changeStatusLoading} />
    </>
  );
}

Edit.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      vehicleId: PropTypes.number,
      success: PropTypes.bool,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setParams: PropTypes.func,
  }).isRequired,
};

export default Edit;
