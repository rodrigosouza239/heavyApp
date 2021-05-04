import ActivityIndicator from '@components/ActivityIndicator';
import Box from '@components/Box';
import Dialog from '@components/Dialog';
import Button from '@components/Button';
import Container from '@components/Container';
import Icon from '@components/Icon';
import PaginationCount from '@components/PaginationCount';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Image as NativeImage,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@theme/';
import { MaterialCommunityIcons, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import Product from '../components/Product';
import * as Ducks from '../ducks';
import { normalizeAdDetail } from '../helper';

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

const PAGINATION_LIMIT = 15;

const INITIAL_PARAMS = {
  metadata: {
    pagination: {
      page: 1,
      limit: PAGINATION_LIMIT,
    },
  },
  restartPagination: true,
};

const styles = StyleSheet.create({
  filter: {
    display: 'flex',
  },
  buttons: {
    flex: 1,
    maxWidth: 200,
  },
});

function Results({ route }) {
  const $t = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRow, setIsRow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { results, resultsLoading, resultsPagination } = useSelector((state) => state.search);
  const navigation = useNavigation();

  const {
    palette: { common },
  } = useTheme();

  const getProductsByFilter = (params) => {
    const {
      params: { filter },
    } = route;
    dispatch(Ducks.getProductsByFilter({ ...params, data: filter }));
  };

  useEffect(() => {
    getProductsByFilter(INITIAL_PARAMS);
  }, []);

  useEffect(() => {
    dispatch(Ducks.resetResults());
    getProductsByFilter(INITIAL_PARAMS);
  }, [route?.params?.filter]);

  useEffect(() => {
    if (!resultsLoading) {
      setIsRefreshing(false);
    }
  }, [resultsLoading]);

  const renderItemSeparator = () => <Box py={1} />;

  const keyExtractor = ({ id }) => String(id);

  const renderEmptyComponent = () =>
    !resultsLoading && (
      <Container>
        <Typography align="center">{$t('noItemsToDisplay')}</Typography>
      </Container>
    );

  const handlePressFilter = () => {
    const {
      params: {
        filter: { product_id },
      },
    } = route;
    if (product_id) {
      navigation.navigate('search-home', { product_id });
    }
    navigation.navigate('search-home');
  };

  const handlePressOrderBy = () => {
    navigation.navigate('search-order');
  };

  const renderHeader = () => {
    return results?.length ? (
      <Container style={styles.filter}>
        <View style={{ flexDirection: 'row' }}>
          <Box mr={2} style={styles.buttons}>
            <Button
              onPress={handlePressFilter}
              arrow={false}
              size="dense"
              vectorIcon={<FontAwesome name="sliders" size={17} color="white" />}
            >
              {$t('filters')}
            </Button>
          </Box>
          <Box mr={2} style={styles.buttons}>
            <Button
              onPress={handlePressOrderBy}
              arrow={false}
              size="dense"
              vectorIcon={<Entypo name="select-arrows" size={17} color="white" />}
            >
              {$t('orderBy')}
            </Button>
          </Box>
          <Box style={styles.buttons}>
            <Button
              onPress={() => setIsRow(!isRow)}
              arrow={false}
              size="dense"
              vectorIcon={<AntDesign name="indent-right" size={20} color="white" />}
            >
              {$t('display')}
            </Button>
          </Box>
        </View>
        <Box mt={2}>
          <PaginationCount total={resultsPagination?.count} data={results} />
        </Box>
      </Container>
    ) : (
      renderItemSeparator()
    );
  };

  const renderFooter = () => {
    return resultsLoading ? (
      <Box py={1}>
        <ActivityIndicator />
      </Box>
    ) : (
      renderItemSeparator()
    );
  };

  const loadMoreResults = () => {
    const { page, pages } = resultsPagination;
    const nextPage = page + 1;

    if (nextPage <= pages) {
      const params = {
        metadata: {
          pagination: {
            page: nextPage,
            limit: PAGINATION_LIMIT,
          },
        },
        restartPagination: false,
      };

      getProductsByFilter(params);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    getProductsByFilter(INITIAL_PARAMS);
  };

  const handlePress = (id) => {
    dispatch(Ducks.resetAd());
    navigation.navigate('search-product-details', { vehicle_id: id });
  };

  const handleSelected = (id) => {
    if (!selected.find((item) => item?.id === id?.id)) {
      if (selected.length < 3) {
        setSelected([...selected, id]);
      } else {
        setShowModal(true);
      }
    } else {
      setSelected(
        selected.filter((item) => {
          return item?.id !== id?.id;
        }),
      );
    }
  };

  const renderItem = (row) => {
    const { item } = row;
    const singleImage = true;
    const product = normalizeAdDetail(item, singleImage);

    const newSelected = selected?.find((dados) => dados?.id === item?.id);

    return (
      <Product
        data={product}
        onPress={() => handlePress(item?.id)}
        isRow={isRow}
        handleSelected={handleSelected}
        selected={!!newSelected}
        list
      />
    );
  };

  return (
    <>
      <Dialog
        enablePressBackdrop
        enableRequestClose
        isVisible={showModal}
        title={$t('compareLimit')}
        onClose={() => setShowModal(false)}
      />
      <FlatList
        data={results}
        ItemSeparatorComponent={renderItemSeparator}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
        onEndReached={loadMoreResults}
        onEndReachedThreshold={0.8}
        removeClippedSubviews={false}
        renderItem={renderItem}
        stickyHeaderIndices={[0]}
        viewabilityConfig={VIEWABILITY_CONFIG}
        refreshControl={
          <RefreshControl size="large" refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
      {selected?.length > 0 && (
        <>
          <Box style={{ height: 100 }} />
          <Box
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: 100,
              flexDirection: 'row',
              padding: 20,
              backgroundColor: common.white,
              borderTopWidth: 1,
            }}
          >
            <Box style={{ flex: 1 }}>
              {selected?.[0] && (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={30}
                  color="red"
                  style={{ position: 'absolute', zIndex: 10, top: -16, right: -14 }}
                  onPress={() => handleSelected(selected?.[0])}
                />
              )}
              <Box style={{ position: 'absolute', alignSelf: 'center' }}>
                <Icon disabled name="tractor" size={56} />
              </Box>
              {selected?.[0] && (
                <NativeImage source={selected?.[0]?.images} style={{ flex: 1, zIndex: 9 }} />
              )}
            </Box>
            <Box style={{ flex: 1 }} ml={2} mr={2}>
              {selected?.[1] && (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={30}
                  color="red"
                  style={{ position: 'absolute', zIndex: 10, top: -16, right: -14 }}
                  onPress={() => handleSelected(selected?.[1])}
                />
              )}
              <Box style={{ position: 'absolute', alignSelf: 'center' }}>
                <Icon disabled name="tractor" size={56} />
              </Box>
              {selected?.[1] && (
                <NativeImage source={selected?.[1]?.images} style={{ flex: 1, zIndex: 9 }} />
              )}
            </Box>
            <Box style={{ flex: 1 }} mr={2}>
              {selected?.[2] && (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={30}
                  color="red"
                  style={{ position: 'absolute', zIndex: 10, top: -16, right: -14 }}
                  onPress={() => handleSelected(selected?.[2])}
                />
              )}
              <Box
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                }}
              >
                <Icon disabled name="tractor" size={56} />
              </Box>
              {selected?.[2] && (
                <NativeImage source={selected?.[2]?.images} style={{ flex: 1, zIndex: 9 }} />
              )}
            </Box>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: common.black,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('search-product-comparation', { selected })}
            >
              <Icon name="angle-right" color="white" size={50} />
            </TouchableOpacity>
          </Box>
        </>
      )}
    </>
  );
}

Results.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      filter: PropTypes.shape({
        brand_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        city_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        document_type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        fabrication_year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        model_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        price_end: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        price_start: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        product_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        state_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    }),
  }).isRequired,
};

export default Results;
