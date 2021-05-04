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
    active: 1,
  },
  metadata: {
    pagination: {
      page: 1,
      limit: PAGINATION_LIMIT,
    },
  },
  restartPagination: true,
};

function Active() {
  const $t = useTranslation();
  const scroll = React.useRef(null);

  useScrollToTop(scroll);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { activeAds, activeAdsPagination, activeAdsLoading, vehicleSavingSuccess } = useSelector(
    (state) => state.ads,
  );

  const navigation = useNavigation();

  const handlePress = (data) => {
    const { id: vehicleId } = data;

    navigation.navigate('ads-detail', { vehicleId });
  };

  const handlePressEdit = (data) => {
    const { id: vehicleId } = data;

    navigation.navigate('ads-edit', { vehicleId });
  };

  const fetchActiveAds = (params) => {
    dispatch(Ducks.fetchActiveAds(params));
  };

  useEffect(() => {
    fetchActiveAds(INITIAL_PARAMS);
  }, []);

  useEffect(() => {
    if (!activeAdsLoading) {
      setIsRefreshing(false);
    }
  }, [activeAdsLoading]);

  useEffect(() => {
    if (!vehicleSavingSuccess) {
      fetchActiveAds(INITIAL_PARAMS);
    }
  }, [vehicleSavingSuccess]);

  const renderItem = (row) => {
    const { item } = row;

    const data = normalizeAd(item);

    return <Item canEdit data={data} onPress={handlePress} onPressEdit={handlePressEdit} />;
  };

  const renderItemSeparator = () => <Box py={1} />;

  const renderFooter = () => {
    return activeAdsLoading ? (
      <Box py={1}>
        <ActivityIndicator />
      </Box>
    ) : (
      renderItemSeparator()
    );
  };

  const renderHeader = () => {
    return activeAds?.length ? (
      <Container>
        <PaginationCount total={activeAdsPagination?.count} data={activeAds} />
      </Container>
    ) : (
      renderItemSeparator()
    );
  };

  const keyExtractor = ({ id }) => String(id);

  const loadMoreResults = () => {
    const { page, pages } = activeAdsPagination;
    const nextPage = page + 1;

    if (nextPage <= pages) {
      const params = {
        data: {
          active: 1,
        },
        metadata: {
          pagination: {
            page: nextPage,
            limit: PAGINATION_LIMIT,
          },
        },
        restartPagination: false,
      };

      dispatch(Ducks.fetchActiveAds(params));
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchActiveAds(INITIAL_PARAMS);
  };

  const renderEmptyComponent = () =>
    !activeAdsLoading && (
      <Container>
        <Typography align="center">{$t('noItemsToDisplay')}</Typography>
      </Container>
    );

  return (
    <FlatList
      data={activeAds}
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

export default Active;
