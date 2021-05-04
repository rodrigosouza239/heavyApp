import ActivityIndicator from '@components/ActivityIndicator';
import Box from '@components/Box';
import Container from '@components/Container';
import PaginationCount from '@components/PaginationCount';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Ducks from '../../ducks';
import { normalizeAd } from '../../helper';
import Item from '../components/Item';

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

const PAGINATION_LIMIT = 15;

const INITIAL_PARAMS = {
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
};

function Inactive() {
  const scroll = React.useRef(null);
  const $t = useTranslation();

  useScrollToTop(scroll);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  const {
    inactiveAds,
    inactiveAdsPagination,
    inactiveAdsLoading,
    vehicleSavingSuccess,
  } = useSelector((state) => state.ads);

  const navigation = useNavigation();

  const handlePress = (data) => {
    const { id: vehicleId } = data;

    navigation.navigate('ads-detail', { vehicleId });
  };

  const fetchInactiveAds = (params) => {
    dispatch(Ducks.fetchInactiveAds(params));
  };

  useEffect(() => {
    fetchInactiveAds(INITIAL_PARAMS);
  }, []);

  useEffect(() => {
    if (!inactiveAdsLoading) {
      setIsRefreshing(false);
    }
  }, [inactiveAdsLoading]);

  useEffect(() => {
    if (!vehicleSavingSuccess) {
      fetchInactiveAds(INITIAL_PARAMS);
    }
  }, [vehicleSavingSuccess]);

  const handlePressEdit = (data) => {
    const { id: vehicleId } = data;

    navigation.navigate('ads-edit', { vehicleId });
  };

  const canEditStatus = [
    'suspended-user',
    'active',
    'waiting-payment',
    'payment-reproved',
    'suspended-admin',
    'payment-canceled',
  ];

  const handleStatus = (status) => canEditStatus.findIndex((e) => e === status) !== -1;

  const renderItem = (row) => {
    const { item } = row;

    const data = normalizeAd(item);

    return (
      <Item
        canEdit={handleStatus(data?.status)}
        data={data}
        onPress={handlePress}
        onPressEdit={handlePressEdit}
      />
    );
  };

  const renderItemSeparator = () => <Box py={1} />;

  const renderFooter = () => {
    return inactiveAdsLoading ? (
      <Box py={1}>
        <ActivityIndicator />
      </Box>
    ) : (
      renderItemSeparator()
    );
  };

  const renderHeader = () => {
    return inactiveAds?.length ? (
      <Container>
        <PaginationCount total={inactiveAdsPagination?.count} data={inactiveAds} />
      </Container>
    ) : (
      renderItemSeparator()
    );
  };

  const keyExtractor = ({ id }) => String(id);

  const loadMoreResults = () => {
    const { page, pages } = inactiveAdsPagination;
    const nextPage = page + 1;

    if (nextPage <= pages) {
      const params = {
        data: {
          inactive: 1,
        },
        metadata: {
          pagination: {
            page: nextPage,
            limit: PAGINATION_LIMIT,
          },
        },
        restartPagination: false,
      };

      dispatch(Ducks.fetchInactiveAds(params));
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchInactiveAds(INITIAL_PARAMS);
  };

  const renderEmptyComponent = () =>
    !inactiveAdsLoading && (
      <Container>
        <Typography align="center">{$t('noItemsToDisplay')}</Typography>
      </Container>
    );

  return (
    <FlatList
      data={inactiveAds}
      ItemSeparatorComponent={renderItemSeparator}
      keyExtractor={keyExtractor}
      ListEmptyComponent={renderEmptyComponent}
      ListFooterComponent={renderFooter}
      ListHeaderComponent={renderHeader}
      onEndReached={loadMoreResults}
      onEndReachedThreshold={0.8}
      ref={scroll}
      removeClippedSubviews={false}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      viewabilityConfig={VIEWABILITY_CONFIG}
      refreshControl={
        <RefreshControl size="large" refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    />
  );
}

export default Inactive;
